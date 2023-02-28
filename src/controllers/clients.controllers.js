//---- Services
import clients from '../services/clients.service.js'

//---- Utils
import { handlerFilters, sortTypes } from '../tools/filters.js';


//- GET
const getAll = async (req,res) => {
    const sort = sortTypes[req.query.sort] || {}
    const limit = req.query.limit || 5
    const page = req.query.page || 1
   
    const find = handlerFilters(req.query)

    const data = await clients.getData(find, limit, sort, page)
    res.json(data)
}

//- POST
const newClient = async (req,res) => {
    const body = {
        name:req.body.name,
        city:req.body.city,
        isOfMonza:req.body.isOfMonza ? true : false,
        contact:{
            phone:req.body.phone,
            email:req.body.email,
            facebook:req.body.facebook
        }
    }
    const submit = await clients.newClient(body)

    res.json(submit)
}

//- PUT
const addVehicle = async (req,res) => {
    const { id , number_of_cars } = req.params

    const update = await clients.addVehicle(id, number_of_cars)

    res.json(update)

}

export default {
    getAll,
    newClient,
    addVehicle
}