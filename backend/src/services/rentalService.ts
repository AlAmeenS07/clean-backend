import { RentalEntity } from "../entity/rentalEntity";
import { RentalRepository } from "../repository/rentalRepository";
import { VehicleRepository } from "../repository/vehicleRepository";


export class RentalService{
    constructor(
        private vehicleRepository : VehicleRepository,
        private rentalRepository : RentalRepository
    ){}

    async rentVehicleService(vehicleId : string , renterId : string){

        const vehicle = await this.vehicleRepository.findById(vehicleId)

        if(vehicle?.ownerId === renterId){
            throw new Error("Owner can't rent itself !");
        }

        if(!vehicle){
            throw new Error("Vehicle not found !");
        }

        if(!vehicle.isAvailable){
            throw new Error("Vehicle already rented !");
        }

        await this.vehicleRepository.updateAvailability(vehicleId , false)

        const rental = new RentalEntity(
            null ,
            vehicleId ,
            renterId,
            new Date(),
            1
        )

        return this.rentalRepository.create(rental)

    }
}