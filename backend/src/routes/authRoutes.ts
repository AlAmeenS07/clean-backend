
import { Router } from "express";
import { AuthController } from "../controller/authController";
import { UserRepository } from "../repository/userRepository";
import { AuthService } from "../services/authService";


const router = Router()

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)

router.post("/register" , authController.register)
router.post("/login" , authController.login)
router.post("/logout" , authController.logout)


export default router