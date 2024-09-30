const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/moviesApp')
 .then(()=>{
    console.log("COnnection oopen");
 })
 .catch(err=>{
    console.log("ohh no error");
    console.log(err);
 });

const Movieschema=new mongoose.Schema({
    title:String,
    year:Number,
    score:Number,
    rating:String
});

const Movie=mongoose.model('Movie',Movieschema);

// const obj= new Movie({tit  le:"bevara",year:2024,score:7.8,rating:3.5});

// const blah=new Movie();
// blah.save();
Movie.insertMany([
   {title:'tiger',year:2020,score:10,rating:2},
   {title:'lion',year:2021,score:7,rating:2},
   {title:'elephant',year:2022,score:8,rating:2},
   {title:'monkey',year:2023,score:9,rating:2},
])
.then(data=>{
   console.log('It Worked');
   console.log(data);
})
