

export enum VehicleTypes {
    CAR = "car",
    BIKE = "bike"
}

export class VehicleEntiry{
    constructor(
        public id : string | null,
        public title : string,
        public type : VehicleTypes,
        public pricePerDay : number,
        public ownerId : string,
        public isAvailable : boolean
    ){}
}