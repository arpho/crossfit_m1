import { ItemInterface, Value } from '../modules/item-module/models/itemInterface';
export class ResultModel implements ItemInterface {
    public id: Number;
    public date: Date;
    public data: string;
    public prestazione: number;
    constructor(
        Id?: Number,
        date?: Date,
        Prestazione?: number,
    ) {
        this.id = Id;
        this.date = date || new Date();
        this.prestazione = Prestazione;
    }

    getValue0() {
        const v = new Value();
        v.label = '';
        v.value = this.prestazione;
        return v;
    }

    getValue1() {
        const v = new Value();
        v.label = 'Data';
        v.value = this.prestazione;
        return v;
    }

    getValue2() {
        const v = new Value();
        v.label = 'Data';
        v.value = this.prestazione;
        return v;
    }

    getValue3() {
        const v = new Value();
        v.label = 'Data';
        v.value = this.prestazione;
        return v;
    }

    getValue4() {
        const v = new Value();
        v.label = 'Data';
        v.value = this.prestazione;
        return v;
    }

    getAggregate() {
        const v = new Value();
        v.label = '%';
        return v;
    }

    aggregateAction() {
    }

    showDetail() { }

    getFilterParams() {
        return [{ label: 'data', key: 'date' }];
    }


}
type Unity = 'Kg' | 'sec';
type PrType = 'hero' | 'girl' | 'generic';

export class PrModel {
    public id: string;
    public descrizione: String;
    public unity: Unity;
    public prList: ResultModel[];
    public typePr: PrType;
    public girl: boolean;
    public hero: boolean;

    cloneOtherModel(): PrModel {
        return this;
    }

    getLastPr() {
        return this.prList.reduce((max, p) => p.date > max.date ? p : max);
    }

    constructor(
        Descrizione?: String,
        unity?: Unity,
        PrList?: ResultModel[],
        TypePr?: PrType
    ) {
        this.descrizione = Descrizione || 'nuovo Pr';
        this.unity = unity || 'Kg';
        this.hero = false;
        this.girl = false;
        this.prList = PrList || [];
        this.typePr = TypePr || 'generic';
    }

    pushPr(pr: ResultModel) {
        pr.id = this.prList.length;
        this.prList.push(pr);
        this.prList = [...this.prList]; // aggiorna il puntatore all'oggetto, così da rilevare il cambio

    }

    updatePr(pr: ResultModel) {
        this.prList.map((value: ResultModel) => value.id === pr.id ? pr : value);
    }

    removePr(pr: ResultModel) {
        this.prList.filter((value: ResultModel) => (value.id !== pr.id));
    }

    getLast(): ResultModel {
        return this.prList.reduce((prev: ResultModel, current: ResultModel) =>
            (prev.date.getTime() > current.date.getTime()) ? prev : current);
    }
}
interface BestInterface {
    getBest(): ResultModel;
}
export class PrTime extends PrModel implements BestInterface {
    constructor(
        Descrizione?: string,
        PrList?: ResultModel[],
        TypePr?: PrType
    ) {
        super(Descrizione, 'sec', PrList, TypePr);
    }

    cloneOtherModel(): PrModel {
        const sec = new PrKg();
        sec.descrizione = this.descrizione;
        sec.prList = this.prList;
        sec.typePr = this.typePr;
        sec.hero = this.hero;
        sec.girl = this.girl;
        return sec;
    }


    getBest() {
        return this.prList.reduce((prev: ResultModel, current: ResultModel) => (prev.prestazione < current.prestazione) ? prev : current);
    }
}
export class PrKg extends PrModel implements BestInterface {
    constructor(
        Descrizione?: string,
        PrList?: ResultModel[],
        TypePr?: PrType
    ) {
        super(Descrizione, 'Kg', PrList, TypePr);
    }

    cloneOtherModel(): PrModel {
        const sec = new PrTime();
        sec.descrizione = this.descrizione;
        sec.prList = this.prList;
        sec.typePr = this.typePr;
        sec.hero = this.hero;
        sec.girl = this.girl;
        return sec;
    }

    getBest() {
        return this.prList.reduce((prev: ResultModel, current: ResultModel) => (prev.prestazione > current.prestazione) ? prev : current);
    }
}
