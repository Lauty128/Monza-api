//---- Config
    import cloudinary from '../config/cloudinary.js'

//---- Services
    import vehicles from '../services/vehicles.service.js'

//---- Utils
    import { sortTypes, handlerFilters } from '../tools/filters.js';

//---- Controllers

//- GET
    const getAll = async (req,res) => {
        const sort = sortTypes[req.query.sort] || {}
        // const limit = req.query.limit ? parseInt(req.query.limit) : 9
        const limit = req.query.limit || 6
        const page = req.query.page || 1
       
        const find = handlerFilters(req.query)

        const data = await vehicles.getData(find, sort, limit, page)
        res.json(data)
    }

    const getOne = async (req,res) => {
        const id = req.params.id

        const data = await vehicles.getOne(id)
        res.json(data)
    }

    //- POST
    const newVehicle = async (req,res) => {
        const image = await cloudinary.upload(req.files.image[0].path)

        let images = []
        for (let index = 0; index < req.files.images.length; index++) {
            const data = await cloudinary.upload(req.files.images[index].path)
            images.push(data.secure_url)
        }
        
        req.body.traction = req.body.traction || 'Normal'
        const body = {...req.body, 
            image : image.secure_url, 
            images}
        const submit = await vehicles.newVehicle(body)
        
        res.json(submit)
    }

    //- DELETE
    const deleteVehicle = async (req,res) => {
        const id = req.params.id
        const data = await vehicles.deleteVehicle(id)
        res.json(data)
    }

    const vehicleSold = async(req,res) => {
        const id = req.params.id
        const data = await vehicles.modifyVehicle(id, { available:false, sale_date: new Date() })

        res.json(data)
    }

    //- PUT
    const modifyVehicle = async (req,res) => {
        console.log(req.body);
        res.json({message:"En proceso"})
    }


export default {
    getAll,
    getOne,
    newVehicle,
    deleteVehicle,
    modifyVehicle,
    vehicleSold
}