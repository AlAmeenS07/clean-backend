import { VehicleEntiry, VehicleTypes } from "../entity/vehicleEntity";
import { VehicleRepository } from "../repository/vehicleRepository";


export class VehicleService {
    constructor(private _vehicleRepo : VehicleRepository) {}

    async addVehicleService(title : string , type : VehicleTypes , pricePerDay : number , ownerId : string) : Promise<VehicleEntiry> {

        const newVehicle = new VehicleEntiry(null , title , type , pricePerDay , ownerId , true)

        return this._vehicleRepo.create(newVehicle)
    }

    async getAvailableVehiclesService() : Promise<VehicleEntiry[]>{
        return this._vehicleRepo.findAvailables()
    }

}