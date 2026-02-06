import { RentalService } from "../services/rentalService";
import {Request , Response} from "express"


export class RentalController{
    constructor(
        private rentalService : RentalService
    ){}

    rentVehicle =  async(req : Request , res : Response) => {
        try {

            const vehicleId = req.params?.id
            const userId = (req as any).userId

            const rental = await this.rentalService.rentVehicleService(String(vehicleId) , userId)

            res.status(200).json({
                success : 200 ,
                message : "vehicle rented successfully",
                rental
            })
            
        } catch (error : any) {
            res.status(400).json({success : false , message : error.message})
        }
    }
}