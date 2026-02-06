import { RentalEntity } from "../entity/rentalEntity";

 

export interface IRentalRepository{
    create(rental : RentalEntity) : Promise<RentalEntity>,
    findExpiredRental(checkDate : Date) : Promise<RentalEntity[]>
    markReturned(rentalId : string) : Promise<void> 
}

