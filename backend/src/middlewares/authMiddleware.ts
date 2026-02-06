import { NextFunction , Request , Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    userId : string,
    email : string
}

export const authMiddleware = async(req : Request, res : Response , next : NextFunction)=>{
    try {

        const token = req.cookies?.token

        if(!token){
            throw new Error("unauthorized !");
        }

        let decoded = jwt.verify(token , "secret") as JwtPayload

        (req as any).userId = decoded.userId

        next()
        
    } catch (error) {
        res.status(401).json({success : false , message : "Invalid token !"})
    }
}