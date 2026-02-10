import { UserEntity } from "../entity/userEntity";
import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { INVALID_PASSWORD, USER_ALREADY_EXISTS, USER_NOT_FOUND_IN_EMAIL } from "../utils/constants";


export class AuthService{
    constructor(private _userRepository : IUserRepository){}

    registerService = async(username : string , email : string , password : string) : Promise<UserEntity> => {

        const existingUser = await this._userRepository.findByEmail(email)

        if(existingUser){
            throw new Error(USER_ALREADY_EXISTS);
        }

        let hashPassword = await bcrypt.hash(password , 10)

        let user = new UserEntity(
            null , 
            username ,
            email , 
            hashPassword
        )

        return await this._userRepository.create(user)
    }

    loginService = async (email : string , password : string) => {

        const user = await this._userRepository.findByEmail(email)

        if(!user){
            throw new Error(USER_NOT_FOUND_IN_EMAIL);
        }

        let checkPassword = await bcrypt.compare(password , user.password)

        if(!checkPassword){
            throw new Error(INVALID_PASSWORD);
        }

        let token = jwt.sign({userId : user.id , email : user.email} , process.env.JWT_SECRET || "secret" , {expiresIn  : "1d"})

        return {user , token}
    }

}