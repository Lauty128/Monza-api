import mongoose from "mongoose";

mongoose.set('strictQuery', false);

try{
    await mongoose.connect(process.env.DB_URL)

    console.log("Conexion exitosa");
}
catch(err){ console.log("Error papasito=  " + err) }

