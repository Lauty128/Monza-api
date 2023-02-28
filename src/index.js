//----- Dependencies
    import express from "express";
    import 'dotenv/config';
    import cors from 'cors';
    import morgan from 'morgan'

//----- Config
    morgan('dev')
    const app = express()
    const PORT = process.env.PORT || 4000
    //const cors_in_production = { origin:"http://localhost:5173/" }

//----- Middlewares
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())

//----- Routes
    import { vehiclesRouter } from './routes/vehicles.routes.js'
    import { clientsRouter } from './routes/clients.routes.js'
    app.use('/api/vehicles', vehiclesRouter)
    app.use('/api/clients', clientsRouter)

//----- Listen
    app.listen(PORT, ()=>{
        console.log("servidor corriendo pai en el puerto " + PORT);
    })