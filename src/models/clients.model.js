import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2';

//---- Variables
const date = new Date()

const clientSchema = new Schema({
    name: { required:true, type:String },
    contact: { required:true, type:Schema.Types.Mixed },
    isOfMonza: { required:true, type:Boolean },
    city: { required:true, type:String },
    date: { required:true, type:Schema.Types.Date, default: date },
    vehicles : { required:true, type:Number, default: 0 }
})

// contact : {
//     phone : { required:true, type:Number },
//     email : { required:false, type:String },
//     facebook : { required:false, type:String }
//}

clientSchema.plugin(paginate)

const clientModel = model('client', clientSchema)

export default clientModel