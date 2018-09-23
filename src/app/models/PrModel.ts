export class PrDetail {
    public id: Number;
    public date: Date;
    public prestazione: Number;
    constructor(
        Id?: Number,
        Date?: Date,
        Prestazione?: Number
    ) {
        this.id = Id;
        this.date = Date;
        this.prestazione = Prestazione
    }

}
type Unity = 'Kg' | 'sec';
type PrType = 'hero' | 'girl' | 'generic';

export class PrModel {
    public descrizione: String;
    public unity: Unity;
    public prList: PrDetail[];
    public typePr: PrType;


    constructor(
        Descrizione?: String,
        Unity?: Unity,
        PrList?: PrDetail[],
        TypePr?: PrType
    ) {
        this.descrizione = Descrizione || 'nuovo Pr';
        this.unity = Unity || 'Kg';
        this.prList = PrList || [];
        this.typePr = TypePr || 'generic';
    }

    pushPr(pr: PrDetail) {
        pr.id = this.prList.length;
        this.prList.push(pr);
        this.prList = [...this.prList] //aggiorna il puntatore all'oggetto, così da rilevare il cambio

    }

    updatePr(pr: PrDetail) {
        this.prList.map((value: PrDetail) => value.id == pr.id ? pr : value);
    }

    deletePr(pr: PrDetail) {
        this.prList.filter((value: PrDetail) => (value.id != pr.id))
    }

    getLast(): PrDetail {
        return this.prList.reduce((prev: PrDetail, current: PrDetail) =>
            (prev.date.getTime() > current.date.getTime()) ? prev : current);
    }
}
interface BestInterface{
    getBest():PrDetail;
}
export class PrTime extends PrModel implements BestInterface {
    constructor(
        Descrizione: string,
        Unity?: Unity,
        PrList?: PrDetail[],
        TypePr?: PrType
    ) {
        super(Descrizione, Unity, PrList, TypePr);
    }
    getBest(){
        return this.prList.reduce((prev: PrDetail, current: PrDetail) => (prev.prestazione < current.prestazione) ? prev : current);
    }
}
export class PrKg extends PrModel implements BestInterface {
    constructor(
        Descrizione: string,
        Unity?: Unity,
        PrList?: PrDetail[],
        TypePr?: PrType
    ) {
        super(Descrizione, Unity, PrList, TypePr);
    }
    getBest(){
        return this.prList.reduce((prev: PrDetail, current: PrDetail) => (prev.prestazione > current.prestazione) ? prev : current);
    }
}