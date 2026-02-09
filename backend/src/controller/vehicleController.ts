import { VehicleEntiry, VehicleTypes } from "../entity/vehicleEntity";
import { VehicleService } from "../services/vehicleService";
import { Request, Response } from "express"
import { VEHICLE_ADDED_SUCCESSFULLY, VEHICLE_FETCHED_SUCCESSFULLY } from "../utils/constants";
import { Status } from "../utils/enums";


export class VehicleController {
    constructor(private vehcileService: VehicleService) { }

    addVehicle = async (req: Request, res: Response) => {
        try {

            const { title, type, pricePerDay } = req.body

            let ownerId: string = (req as any).userId

            if (!title || !type || !pricePerDay) {
                throw new Error("All fields is required !");
            }

            if (!Object.values(VehicleTypes).includes(type)) {
                throw new Error("Invalid vehicle type !");
            }

            if (Number(pricePerDay) <= 0) {
                throw new Error("Price must be greater than 0 !");
            }

            const vehicle = await this.vehcileService.addVehicleService(title, type, Number(pricePerDay), ownerId)

            res.status(Status.CREATED).json({
                success: true,
                message: VEHICLE_ADDED_SUCCESSFULLY,
                vehicle: {
                    id: vehicle.id,
                    title: vehicle.title,
                    type: vehicle.type,
                    pricePerDay: vehicle.pricePerDay,
                    isAvailable: vehicle.isAvailable,
                    ownerId: vehicle.ownerId
                }
            })


        } catch (error: any) {
            res.status(Status.NOT_FOUND).json({ success: false, message: error.message })
        }
    }

    getAllVehicles = async (req: Request, res: Response) => {
        try {

            const vehicles = await this.vehcileService.getAvailableVehiclesService()

            res.status(Status.SUCCESS).json({
                success: true,
                messages: VEHICLE_FETCHED_SUCCESSFULLY,
                vehicles: vehicles.map((vehicle) => {
                    return {
                        id: vehicle.id,
                        title: vehicle.title,
                        type: vehicle.type,
                        pricePerDay: vehicle.pricePerDay,
                        isAvailable: vehicle.isAvailable,
                        ownerId: vehicle.ownerId
                    }
                })
            })

        } catch (error : any) {
            res.status(Status.SERVER_ERROR).json({success : false , message : error.message})
        }
    }
}