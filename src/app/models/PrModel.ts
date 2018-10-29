import { ItemInterface, Value } from '../modules/item-module/models/itemInterface';
export class ResultModel implements ItemInterface {
    public id: Number;
    public date: Date;
    public stringifiedDate: string;
    public prestazione: number;
    constructor(
        Id?: Number,
        Prestazione?: number,
        StringifiedDate?: string
    ) {
        this.id = Id;
        this.date = new Date();
        this.stringifiedDate = StringifiedDate;
        this.prestazione = Prestazione;

    }
    load(item: any) {
        this.id = item.id;
        this.prestazione = item.prestazione;
        this.stringifiedDate = item.stringifiedDate;
        return this;
    }

    getSeconds() {
        const sec = this.prestazione % 60;
        return sec < 10 ? '0' + String(sec) : String(sec);
    }

    getMinutes() {
        const minutes = Math.floor(this.prestazione / 60);
        return minutes < 10 ? '0' + String(minutes) : String(minutes);
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
type Unity = ' Kg ' | ' sec ';
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
    convertSeconds(sec: number): string {
        const hrs = Math.floor(sec / 3600);
        const min = Math.floor((sec - (hrs * 3600)) / 60);
        let seconds = sec - (hrs * 3600) - (min * 60);
        seconds = Math.round(seconds * 100) / 100;
        let result = (hrs < 10 ? '0' + String(hrs) : String(hrs));
        result += ':' + (min < 10 ? '0' + String(min) : String(min));
        result += ':' + (seconds < 10 ? '0' + String(seconds) : String(seconds));
        return result;
    }

    loadPr(pr: any) {
        this.descrizione = pr.descrizione;
        this.unity = pr.unity;
        this.girl = pr.girl;
        this.hero = pr.hero;
        this.id = pr.id;
        this.prList = pr.prList.map(value => {
            const i = new ResultModel().load(value);
            return i;
        });
    }

    getLastPrNew() {
        console.log('getting last pr');
        if (this.prList && this.prList.length > 0) {
            const last = Math.max.apply(null, this.prList.map((item: ResultModel) => {
                console.log(item.stringifiedDate, item, new Date(item.stringifiedDate), last);
                return new Date(item.stringifiedDate);
            }));
            return last;

        }
    }


    getLastPr() {
        if (this.prList && this.prList.length > 0) {
            return this.prList.reduce((max, p) => {
                console.log('max', max);
                console.log('p', p);
                return new Date(p.date) > new Date(max.date) ? p : max;
            });
        }
    }


    constructor(
        Descrizione?: String,
        unity?: Unity,
        PrList?: ResultModel[],
        TypePr?: PrType
    ) {
        this.descrizione = Descrizione || 'nuovo Pr';
        this.unity = unity || ' Kg ';
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
        if (this.prList && this.prList.length > 0) {
            return this.prList.reduce((prev: ResultModel, current: ResultModel) =>
                (prev.date.getTime() > current.date.getTime()) ? prev : current);
        }
    }
}
export interface BestInterface {
    id: String;
    getBestPr(): ResultModel;
    loadPr(any);
    getLastPr(): ResultModel;
    formatResult(pr: ResultModel): string | number;
}
export class PrTime extends PrModel implements BestInterface {
    constructor(
        Descrizione?: string,
        PrList?: ResultModel[],
        TypePr?: PrType
    ) {
        super(Descrizione, ' sec ', PrList, TypePr);
    }

    formatResult(pr: ResultModel) {


       return  pr.getMinutes() + ':' + pr.getSeconds();
       // return this.convertSeconds(pr.prestazione);
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


    getBestPr() {
        return this.prList.reduce((prev: ResultModel, current: ResultModel) => (prev.prestazione < current.prestazione) ? prev : current);
    }
}
export class PrKg extends PrModel implements BestInterface {
    constructor(
        Descrizione?: string,
        PrList?: ResultModel[],
        TypePr?: PrType
    ) {
        super(Descrizione, ' Kg ', PrList, TypePr);
    }
    formatResult(pr: ResultModel) {
        return String(pr.prestazione) + this.unity;
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

    getBestPr() {
        return this.prList.reduce((prev: ResultModel, current: ResultModel) => (prev.prestazione > current.prestazione) ? prev : current);
    }
}
