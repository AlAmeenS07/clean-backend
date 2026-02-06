import { UserEntity } from "../entity/userEntity";
import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export class AuthService{
    constructor(private userRepository : IUserRepository){}

    registerService = async(username : string , email : string , password : string) : Promise<UserEntity> => {

        const existingUser = await this.userRepository.findByEmail(email)

        if(existingUser){
            throw new Error("user already exist !");
        }

        let hashPassword = await bcrypt.hash(password , 10)

        let user = new UserEntity(
            null , 
            username ,
            email , 
            hashPassword
        )

        return await this.userRepository.create(user)
    }

    loginService = async (email : string , password : string) => {

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new Error("User not found in this email !");
        }

        let checkPassword = await bcrypt.compare(password , user.password)

        if(!checkPassword){
            throw new Error("Invalid Password !");
        }

        let token = jwt.sign({userId : user.id , email : user.email} , "secret" , {expiresIn  : "1d"})

        return {user , token}
    }

}