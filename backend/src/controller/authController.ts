import { AuthService } from "../services/authService";
import { Request , Response } from "express";

export class AuthController {
    constructor(private authService : AuthService){}

    register = async(req : Request , res : Response) => {
        try {

            const {username , email , password} = req.body

            if(!username || !email || !password){
                throw new Error("All fields required !");
            }

            if(!email.includes("@")){
                throw new Error("Enter valid email !");
            }

            if(password.length < 6){
                throw new Error("Password must be 6 letters !");
            }

            let user = await this.authService.registerService(username , email , password);

            res.status(201).json({
                success : true ,
                message : "user resgistered successfully",
                user : {
                    id : user.id,
                    email : user.email
                }
            })

            
        } catch (error : any) {
            res.status(400).json({success : false , message : error.message})
        }
    }


    login = async(req : Request, res : Response) => {
        try {

            const {email , password} = req.body

            if(!email || !password){
                throw new Error("credentials must be filled !");
            }

            let { user , token } = await this.authService.loginService(email , password);

            res.cookie("token" , token , {
                httpOnly : true,
                secure : false,
                sameSite : "strict",
                maxAge : 24 * 60 * 60 * 1000
            })

            res.status(200).json({
                success : true,
                message : "login successfully",
                user : {
                    id : user.id,
                    email : user.email
                }
            })
            
        } catch (error : any) {
            res.status(400).json({success : false , message : error.message})
        }
    }

    logout = async(req : Request, res : Response) => {
        try {

            res.clearCookie("token" , {
                httpOnly : true,
                secure : false,
                sameSite : "strict"
            })

            res.status(200).json({
                success : true,
                message : "logout success"
            })
            
        } catch (error : any) {
            res.status(500).json({success : false , message : error.message})
        }
    }

}
