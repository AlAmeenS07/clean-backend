import { AuthService } from "../services/authService";
import { Request , Response } from "express";
import dotenv from "dotenv"
import { ALL_FIELDS_REQUIRED, ENTER_VALID_EMAIL, LOGIN_SUCCESSFULLY, LOGOUT_SUCCESSFULLY, PASSWORD_MUST_6_LETTER, USER_REGISTERED_SUCCESSFULLY } from "../utils/constants";
import { Status } from "../utils/enums";
dotenv.config()

export class AuthController {
    constructor(private _authService : AuthService){}

    register = async(req : Request , res : Response) => {
        try {

            const {username , email , password} = req.body

            if(!username || !email || !password){
                throw new Error(ALL_FIELDS_REQUIRED);
            }

            if(!email.includes("@")){
                throw new Error(ENTER_VALID_EMAIL);
            }

            if(password.length < 6){
                throw new Error(PASSWORD_MUST_6_LETTER);
            }

            let user = await this._authService.registerService(username , email , password);

            res.status(Status.CREATED).json({
                success : true ,
                message : USER_REGISTERED_SUCCESSFULLY,
                user : {
                    id : user.id,
                    email : user.email
                }
            })

            
        } catch (error : any) {
            res.status(Status.BAD_REQUEST).json({success : false , message : error.message})
        }
    }


    login = async(req : Request, res : Response) => {
        try {

            const {email , password} = req.body

            if(!email || !password){
                throw new Error("credentials must be filled !");
            }

            let { user , token } = await this._authService.loginService(email , password);

            res.cookie("token" , token , {
                httpOnly : true,
                secure : false,
                sameSite : "strict",
                maxAge : Number(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000
            })

            res.status(Status.SUCCESS).json({
                success : true,
                message : LOGIN_SUCCESSFULLY,
                user : {
                    id : user.id,
                    email : user.email
                }
            })
            
        } catch (error : any) {
            res.status(Status.BAD_REQUEST).json({success : false , message : error.message})
        }
    }

    logout = async(req : Request, res : Response) => {
        try {

            res.clearCookie("token" , {
                httpOnly : true,
                secure : false,
                sameSite : "strict"
            })

            res.status(Status.SUCCESS).json({
                success : true,
                message : LOGOUT_SUCCESSFULLY
            })
            
        } catch (error : any) {
            res.status(Status.SERVER_ERROR).json({success : false , message : error.message})
        }
    }

}
