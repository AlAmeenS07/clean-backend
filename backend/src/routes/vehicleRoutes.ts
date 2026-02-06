
import { Router } from "express";
import { VehicleRepository } from "../repository/vehicleRepository";
import { VehicleService } from "../services/vehicleService";
import { VehicleController } from "../controller/vehicleController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { RentalController } from "../controller/rentalController";
import { RentalService } from "../services/rentalService";
import { RentalRepository } from "../repository/rentalRepository";

const router = Router()

const vehicleRepository = new VehicleRepository()
const vehicleService = new VehicleService(vehicleRepository)
const vehicleController = new VehicleController(vehicleService)

const rentalRepository = new RentalRepository()
const rentalService = new RentalService(vehicleRepository , rentalRepository)
const rentalController = new RentalController(rentalService)

router.get("/" , vehicleController.getAllVehicles)
router.post("/add-vehicle" , authMiddleware , vehicleController.addVehicle)
router.post("/:id/rent" , authMiddleware , rentalController.rentVehicle)


export default router