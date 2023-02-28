import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2';

//---- Variables
const date = new Date()

const vehicleSchema = new Schema({
    version: { required:true, type:String },
    mark: { required:true, type:String },
    engine:{ required:true, type:String },
    fuel:{ required:true, type:String },
    model: { required:true, type:Number },
    available: { required:true, type:Boolean },
    image: { required:true, type:String },
    images: { required:true, type:[String] },
    owner: { required:false, type:String },
    price: { required:false, type:Number, default:null },
    type: { required:true, type:String },
    traction:{ required:false, type:String },
    extra:{ required:false, type:Array },
    km: { required:false, type:Number, default:null },
    color: { required:true, type:String },
    transmission: { required:true, type:String },
    date:{ required:true, type:Schema.Types.Date, default: date },
    sale_date:{ required:false, type:Schema.Types.Date, default: undefined },
    offer_price: { required:false, type:Number }
}) 

vehicleSchema.plugin(paginate)

const vehicleModel = model('vehicle', vehicleSchema)

export default vehicleModel;