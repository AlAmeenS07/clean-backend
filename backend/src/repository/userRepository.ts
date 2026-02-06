import { UserEntity } from "../entity/userEntity";
import { IUserRepository } from "../interfaces/IUserRepository";
import userModel from "../models/userModel";



export class UserRepository implements IUserRepository{

    async findByEmail(email: string): Promise<UserEntity | null> {

        let userData = await userModel.findOne({email})

        if(!userData) return null

        return new UserEntity(
            userData._id.toString(),
            userData.username,
            userData.email,
            userData.password
        )
    }

    async create(data : UserEntity) : Promise<UserEntity> {
        
        let userData = await userModel.create({
            username : data.username,
            email : data.email,
            password : data.password
        })

        return new UserEntity(
            userData._id.toString(),
            userData.username,
            userData.email,
            userData.password
        )
    }
}