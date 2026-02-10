import { RentalEntity } from "../entity/rentalEntity";
import { RentalRepository } from "../repository/rentalRepository";
import { VehicleRepository } from "../repository/vehicleRepository";
import { OWNER_CANT_RENT_ITSELF, VEHICLE_ALREADY_RENTED, VEHICLE_NOT_FOUND } from "../utils/constants";


export class RentalService{
    constructor(
        private _vehicleRepository : VehicleRepository,
        private _rentalRepository : RentalRepository
    ){}

    async rentVehicleService(vehicleId : string , renterId : string){

        const vehicle = await this._vehicleRepository.findById(vehicleId)

        if(vehicle?.ownerId === renterId){
            throw new Error(OWNER_CANT_RENT_ITSELF);
        }

        if(!vehicle){
            throw new Error(VEHICLE_NOT_FOUND);
        }

        if(!vehicle.isAvailable){
            throw new Error(VEHICLE_ALREADY_RENTED);
        }

        await this._vehicleRepository.updateAvailability(vehicleId , false)

        const rental = new RentalEntity(
            null ,
            vehicleId ,
            renterId,
            new Date(),
            1
        )

        return this._rentalRepository.create(rental)

    }
}