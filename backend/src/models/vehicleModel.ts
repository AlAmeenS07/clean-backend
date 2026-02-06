
import mongoose, { Schema } from "mongoose";
import { VehicleTypes } from "../entity/vehicleEntity";

export interface VehicleDocument extends Document {
    title : string
    type : VehicleTypes
    pricePerDay : number
    ownerId : string
    isAvailable : boolean
}

const vehicleSchema = new Schema<VehicleDocument>({
    title : {type : String , required : true},
    type : {type : String , enum : Object.values(VehicleTypes) , required : true},
    pricePerDay : {type : Number , required : true},
    ownerId : {type : String , required : true},
    isAvailable : {type : Boolean , default : true}
},
{
    timestamps : true
})


export const vehicleModel = mongoose.model<VehicleDocument>("vehicles" , vehicleSchema)
