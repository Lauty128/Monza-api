import express from "express";
import multer from '../config/multer.js'

//---- Config
const router = express.Router()
const filesMulter = [
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 6 }
]

//--- Controllers
import vehiclesControllers from "../controllers/vehicles.controllers.js"; // this call to the controllers


//--- Routes
//- GET
router.get("/", vehiclesControllers.getAll)
router.get('/xlsx', vehiclesControllers.generateXlsx)
router.get("/:id", vehiclesControllers.getOne)

//- POST
router.post("/", multer.fields(filesMulter) ,vehiclesControllers.newVehicle)

//- DELETE
router.delete("/:id", vehiclesControllers.deleteVehicle)

//- PUT
router.put("/:id", vehiclesControllers.modifyVehicle)
router.put("/sold/:id", vehiclesControllers.vehicleSold)

export { router as vehiclesRouter }
