import { RentalService } from "../services/rentalService";
import {Request , Response} from "express"
import { VEHICLE_RENTED_SUCCESSFULLY } from "../utils/constants";
import { Status } from "../utils/enums";


export class RentalController{
    constructor(
        private _rentalService : RentalService
    ){}

    rentVehicle =  async(req : Request , res : Response) => {
        try {

            const vehicleId = req.params?.id
            const userId = (req as any).userId

            const rental = await this._rentalService.rentVehicleService(String(vehicleId) , userId)

            res.status(Status.SUCCESS).json({
                success : 200 ,
                message : VEHICLE_RENTED_SUCCESSFULLY,
                rental
            })
            
        } catch (error : any) {
            res.status(Status.BAD_REQUEST).json({success : false , message : error.message})
        }
    }
}