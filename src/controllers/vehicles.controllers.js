//---- Dependencies
    import xl from 'excel4node';
    import path from 'path-browserify';
    import fs from 'fs';
    import * as url from 'url';

//---- Config
    import cloudinary from '../config/cloudinary.js';

//---- Services
    import vehicles from '../services/vehicles.service.js';

//---- Utils
    import { sortTypes, handlerFilters } from '../tools/filters.js';
    import { firstColumnGenerate , contentGenerate } from '../tools/xlsx_create.js';

//---- Controllers

//- GET
    const getAll = async (req,res) => {
        const sort = sortTypes[req.query.sort]
        const limit = req.query.limit 
        const page = req.query.page
       
        const find = handlerFilters(req.query)

        const data = await vehicles.getData(find, sort, limit, page)
        res.json(data)
    }

    const getOne = async (req,res) => {
        const id = req.params.id

        const data = await vehicles.getOne(id)
        res.json(data)
    }

    //----------------- GENERATE EXCEL FILE
    const generateXlsx = async (req,res) => {
        //----- config
        const pathFolderExcel = url.fileURLToPath(new URL('../../excel', import.meta.url))
        const workBook = new xl.Workbook()
        const workSheetName = `Lista-vehiculos.xlsx`
        const pathExcel = path.join(pathFolderExcel, workSheetName)

        const workSheet = workBook.addWorksheet(workSheetName)
        
        //----- Styles
        const firstColumnStyle = workBook.createStyle({
            font:{ size: 16 , color: '#000000' , bold:true }
        })
        const contentStyle = workBook.createStyle({
            font:{ size: 14 , color: '#3D3D3D' , bold:false }
        })

        //----- Generate titles
        firstColumnGenerate(workSheet, firstColumnStyle)

        //----- Generate Content
        const vehiclesData = await vehicles.getData({},{},30)
        let data = vehiclesData.docs
        let column_of_excel = 2
        for (let column = 1; column <= vehiclesData.totalPages; column++) {
            if(column > 1){
                // If there are more of one page then read the other page in the data base
                const newVehiclesData = await vehicles.getData({},{},30,column)
                data = newVehiclesData.docs
            }

            data.forEach(vehicle=>{
                // Generate the rows in the excel
                contentGenerate(workSheet, contentStyle, vehicle, column_of_excel)
                column_of_excel++
            })
            
        }

        //----- Create file
        workBook.write(pathExcel, (err,stats)=>{
            if(err) console.log(err);

            //-- Download file
            function downloadFile(){ res.download(pathExcel) }
            downloadFile()
            
            //-- Delete file
            fs.rm(pathExcel)

            // res.json({msg:"Archivo descargado correctamente", status:200})
        })


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
        req.body.extra = req.body.extra.split('\r\n') || []
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
        const id = req.params.id;
        const body = req.body;
        if(body.extra) body.extra = body.extra.split('\n')
        const data =  await vehicles.modifyVehicle(id, body)

        res.json(data)
    }


export default {
    getAll,
    getOne,
    generateXlsx,
    newVehicle,
    deleteVehicle,
    modifyVehicle,
    vehicleSold,
}