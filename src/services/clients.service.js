//--- Config
import '../config/mongodb.js';                  // Connect with the database
import clientsModel from '../models/clients.model.js';   // Get vehicles model

class clientsClass{
    constructor(){
        this.clients = clientsModel;
    }

    getData = async(find, sort, limit, page) => {
        // Get all the vehicles
        const data = await this.clients.paginate( find, 
        { sort , limit , page })

        return data
    }

    newClient = async(body) => {
        // Create a new vehicle with the received data
        try{
            const client = await new this.clients(body)
            await client.save()
            return { 
                msg:"Datos almacenados correctamente",
                status:200
            }
        }
        catch(err){
            console.log(err);
            return { 
                msg:"Ocurrio un error mientras se subian los datos del clientes",
                err,
                status:404
            }
        }
    }

    addVehicle = async(id, number_of_cars) => {
        const newNumber = number_of_cars + 1;
        try{
            const update = await this.clients.updateOne({_id:id}, { vehicles:newNumber })
            return {
                data:update, 
                message:"Cantidad actualizada con exito"
                }
        }
        catch(err){
            return {
                err,
                message:"Ocurrio un error mientras se actualizaba"
                }
        }
    }
}


//--- Instance
const clients = new clientsClass();

export default clients
