

import mongoose, { Schema } from "mongoose";


export interface RentalDocument extends Document{
    vehicleId : string,
    renterId : string,
    rentedAt : Date,
    duration : number,
    isReturned : boolean
}


const rentalSchema = new Schema<RentalDocument>({
    vehicleId : {type : String , required : true},
    renterId : {type : String , required : true},
    rentedAt : {type : Date , required : true},
    duration : {type : Number , default : 1},
    isReturned : {type : Boolean , default : false}
},
{
    timestamps : true
})


export const rentalModel = mongoose.model<RentalDocument>("rentals" , rentalSchema)