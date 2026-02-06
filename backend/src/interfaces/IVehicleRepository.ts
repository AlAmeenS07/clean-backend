import { VehicleEntiry } from "../entity/vehicleEntity";


export interface IVehicleRepository{
    findById(id : string) : Promise<VehicleEntiry | null>
    create(vehicle : VehicleEntiry) : Promise<VehicleEntiry>
    findAvailables() : Promise<VehicleEntiry[]>
    updateAvailability(vehicleId : string , isAvailable : boolean) : Promise<void>
}   