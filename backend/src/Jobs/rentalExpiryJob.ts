
import cron from "node-cron"
import { RentalRepository } from "../repository/rentalRepository"
import { VehicleRepository } from "../repository/vehicleRepository"

const rentalRepository = new RentalRepository()
const vehicleRepository = new VehicleRepository()

export const startRentalExpiryJob = () => {
    cron.schedule("*/10 * * * *" , async()=> {

        const checkDate = new Date(Date.now() - 24 * 60 *  60 * 1000)

        const expiredRental = await rentalRepository.findExpiredRental(checkDate)

        for(let rental of expiredRental){
            await vehicleRepository.updateAvailability(rental.vehicleId , true)

            await rentalRepository.markReturned(rental.id!)
        }

    })
}