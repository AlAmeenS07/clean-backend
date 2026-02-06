import { VehicleEntiry } from "../entity/vehicleEntity";
import { IVehicleRepository } from "../interfaces/IVehicleRepository";
import { vehicleModel } from "../models/vehicleModel";


export class VehicleRepository implements IVehicleRepository{

    async create(vehicle : VehicleEntiry) : Promise<VehicleEntiry> {
        
        let data = await vehicleModel.create({
            title : vehicle.title,
            type : vehicle.type,
            pricePerDay : vehicle.pricePerDay,
            ownerId : vehicle.ownerId,
        })

        return new VehicleEntiry(
            data._id.toString(),
            data.title,
            data.type,
            data.pricePerDay,
            data.ownerId,
            data.isAvailable
        )
    }   

    async findById(id: string): Promise<VehicleEntiry | null> {

        const data = await vehicleModel.findById(id)

        if(!data) return null

        return new VehicleEntiry(
            data._id.toString(),
            data.title,
            data.type,
            data.pricePerDay,
            data.ownerId,
            data.isAvailable
        )
    }

    async findAvailables(): Promise<VehicleEntiry[]> {

        const datas = await vehicleModel.find({ isAvailable : true })

        return datas.map((data)=> {
            return new VehicleEntiry(
                data._id.toString(),
                data.title,
                data.type,
                data.pricePerDay,
                data.ownerId,
                data.isAvailable
            )
        })
    }


}