const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product')
   .then(() => {
      console.log("COnnection oopen");
   })
   .catch(err => {
      console.log("ohh no error");
      console.log(err);
   });
   const PersonSchema=new mongoose.Schema({
    first:String,
    last:String
   })
   PersonSchema.virtual('fullName').get(function(){
        return `${this.first}  ${this.last}`
   })
   const Person=mongoose.model('Person',PersonSchema);