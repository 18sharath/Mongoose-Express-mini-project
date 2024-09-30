const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product')
   .then(() => {
      console.log("COnnection oopen");
   })
   .catch(err => {
      console.log("ohh no error");
      console.log(err);
   });

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: false,
      min:[0,'price must be greater than Zero']
   },
   categories: {
      type: [String]
   },
   size:{
      type:String,
      enum: ['M','L','S']
   }
})
const product = mongoose.model('product', productSchema);
const bike = product({
    name: 'sharath' ,
    price: 300 ,
    categories: ['hello', 'i am sharath'] ,
    size:'L' // you have to give what ever is there in enum that one only 


});
bike.save()
   .then(data => {
      console.log("it worked");
      console.log(data);
   })
   .catch(err => {
      console.log("eroor");
      console.log(err);
   })
