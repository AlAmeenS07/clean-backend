import { RentalEntity } from "../entity/rentalEntity";
import { IRentalRepository } from "../interfaces/IRentalRepository";
import { rentalModel } from "../models/rentalMode";


export class RentalRepository implements IRentalRepository {
    async create(rental: RentalEntity): Promise<RentalEntity> {

        let data = await rentalModel.create({
            vehicleId: rental.vehicleId,
            renterId: rental.renterId,
            rentedAt: rental.rentedAt,
            duration: rental.duration,
            isReturned: rental.isReturned
        })

        return new RentalEntity(
            data._id.toString(),
            data.vehicleId,
            data.renterId,
            data.rentedAt,
            data.duration,
            data.isReturned
        )
    }

    async findExpiredRental(checkDate: Date): Promise<RentalEntity[]> {
        let datas = await rentalModel.find({
            rentedAt: { $lte: checkDate },
            isReturned: false
        })

        return datas.map((data) => {
            return new RentalEntity(
                data._id.toString(),
                data.vehicleId,
                data.renterId,
                data.rentedAt,
                data.duration,
                data.isReturned
            )
        })
    }

    async markReturned(rentalId: string): Promise<void> {
        await rentalModel.findByIdAndUpdate(rentalId , {isReturned : true})
    }

}