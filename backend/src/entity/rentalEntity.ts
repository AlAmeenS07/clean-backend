

export class RentalEntity{
    constructor(
        public id : string | null,
        public vehicleId : string,
        public renterId : string,
        public rentedAt : Date,
        public duration : number = 1,
        public isReturned : boolean = false
    ){

    }

    markReturned(){
        this.isReturned = true
    }
}