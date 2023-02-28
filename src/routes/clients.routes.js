import express from "express";

//---- Config
const router = express.Router()

//--- Controllers
import clientsControllers from "../controllers/clients.controllers.js"; // this call to the controllers


//--- Routes
//- GET
router.get("/", clientsControllers.getAll)

//- POST
router.post("/", clientsControllers.newClient)

//- DELETE
//router.delete("/clients/:id", clientsControllers.deleteVehicle)

//- POST
router.put("/:id/:number_of_cars", clientsControllers.addVehicle)

export { router as clientsRouter }