const express=require('express')
const app=express()
const path=require('path')
const mongoose=require('mongoose')
const Product = require('./models/product')
const Farm=require('./models/farm'); // we are going to do for one to many relationship
const methodOverride=require('method-override')
app.use(methodOverride('_method')); // because we usinf post method hence in form submission post not put hence we should use this
mongoose.connect('mongodb://localhost:27017/farmStandTakeTwo')
   .then(() => {
      console.log("COnnection open connected to mongo");
   })
   .catch(err => {
      console.log("ohh no error");
      console.log(err);
   });
app.use(express.urlencoded({extended:true})) // this is basically needs for post method
app.set('views',path.join(__dirname,'views'));
// This line sets the directory where your template files (views) are stored.
app.set('view engine','ejs');
/*Look in the views directory (set by app.set('views', ...)) for a file named index.ejs.
Use the EJS engine (set by app.set('view engine', 'ejs')) to render the file.
Send the rendered HTML back as the response.*/

// farm
app.get('/farms',async(req,res)=>{
    const farm=await Farm.find({});
    res.render('farms/index',{farm})
})

app.get('/farms/new',(req,res)=>{
    res.render('farms/new');
})

app.get('/farms/:id',async(req,res)=>{
    const {id}=req.params;
    const farm=await Farm.findById(id).populate('products')
    console.log(farm);
    res.render('farms/show',{farm});
})

app.post('/farms',async(req,res)=>{
    // res.send(req.body);
    const farm=new Farm(req.body);
    await farm.save();
})

// now linkig farm to product

app.get('/farms/:id/products/New',(req,res)=>{
    const {id}=req.params;
    res.render('products/New',{id})
})

app.post('/farms/:id/products',async(req,res)=>{//The : defines a route parameter, and id is the name of that parameter.
    const {id}=req.params;
    const farm=await Farm.findById(id);
    const {name,price,category}=req.body;
    const product=new Product({name,price,category});
    farm.products.push(product);
    product.farm=farm;
    await farm.save();
    await product.save();
    // res.send(farm);
    res.redirect(`/farms/${farm._id}`);

})


// product
app.get('/products',async(req,res)=>{
    const products=await Product.find({})
    // console.log(products);
    res.render('products/index',{products});
})
app.get('/products/New',(req,res)=>{
    res.render('products/New');

})
app.post('/products', async(req,res)=>{
    // console.log(req.body);
    const newproduct=new Product(req.body);
    console.log(newproduct);
    await newproduct.save();
    res.redirect('products');
})
app.get('/products/:id',async(req,res)=>{
    const {id}=req.params;
     const product =await Product.findById(id);
    //  console.log(product);
    //  res.send("details of the page is in the console");
    res.render('products/show',{product});
})

app.get('/products/:id/edit',async(req,res)=>{
    const {id}=req.params;
    const product= await Product.findById(id);
    // why await and async becuase mongoose is returning promises and it is asynchronous that'y ,
    //  without this will not wait until fecthing the from database it will render views as earlier than fetching the data
    res.render('products/edit',{product});

})
// put http request used to edit the existing resource
//the PATCH method is used when only partial updates are needed for a resource.
app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.put('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product= await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    console.log(req.body);
    // res.send('PUT!!!!!')
    res.redirect(`/products/${product._id}`)
})

app.listen(3000,()=>{
    console.log("App is listening on port 3000!");
})