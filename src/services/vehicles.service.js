//--- Config
import '../config/mongodb.js';                  // Connect with the database
import vehiclesModel from '../models/vehicles.model.js';   // Get vehicles model

//--- Class
class vehiclesClass{
    constructor(){
        this.vehicles = vehiclesModel;
    }

    getData = async(find, sort, limit, page) => {
        // Get all the vehicles
        const data = await this.vehicles.paginate( find, 
        { sort , limit , page })

        return data
    }

    getOne = async(id) => {
        // Get all the vehicles
        const data = await this.vehicles.findById(id)

        return data
    }

    newVehicle = async(body) => {
        // Create a new vehicle with the received data
        try{
            const vehicle = await new this.vehicles({
                ...body,
                available:true
            })
            await vehicle.save()
            return { 
                msg:"Se subio el vehiculo correctamente",
                status:200
            }
        }
        catch(err){
            return { 
                msg:"Ocurrio un error mientras se subia el vehiculo",
                err,
                status:404
            }
        }
    }

    deleteVehicle = async(id) => {
        // Create a new vehicle with the received data
        try{
            const vehicle = await this.vehicles.deleteOne({_id:id})
            await vehicle.save()
            return { 
                msg:"Se elimino el vehiculo correctamente",
                status:200
            }
        }
        catch(err){
            return { 
                msg:"Ocurrio un error mientras se eliminaba el vehiculo",
                err,
                status:404
            }
        }
    }

    modifyVehicle = async(id, data) => {
        console.log(id);
        console.log(data);
        try{
            const vehicle = await this.vehicles.updateOne({_id:id}, data)
            await vehicle.save()
            return { 
                msg:"Se actualizo el vehiculo correctamente",
                status:200
            }
        }
        catch(err){
            return { 
                msg:"Ocurrio un error mientras se actualizaba el vehiculo",
                err,
                status:404
            }
        }
    }
}

//--- Instance
const vehicles = new vehiclesClass();


export default vehicles
