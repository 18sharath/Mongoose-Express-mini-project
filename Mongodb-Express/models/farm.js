const mongoose =require('mongoose');
const Product = require('./product');
const {Schema}=mongoose;
const farmschema=Schema({
    name:{
        type:String,
        required:[true,'farm must have a name']
    },
    city:String,
    emial:{
        type:String,
        required:[true,'email requird']
    },
    products:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }

})
const Farm=mongoose.model('Farm',farmschema);
module.exports=Farm;