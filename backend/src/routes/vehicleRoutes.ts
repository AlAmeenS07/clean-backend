
import { Router } from "express";
import { VehicleRepository } from "../repository/vehicleRepository";
import { VehicleService } from "../services/vehicleService";
import { VehicleController } from "../controller/vehicleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()

const vehicleRepository = new VehicleRepository()
const vehicleService = new VehicleService(vehicleRepository)
const vehicleController = new VehicleController(vehicleService)

router.get("/" , vehicleController.getAllVehicles)
router.post("/add-vehicle" , authMiddleware , vehicleController.addVehicle)


export default router