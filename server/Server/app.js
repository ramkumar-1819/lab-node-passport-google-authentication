const express=require('express');
const bodyParser=require('body-parser');
const routes=require('../Routes/Route');
const cors=require('cors');
const mongoose=require('mongoose');
//connection to DBCompass
mongoose.connect('mongodb://127.0.0.1:27017/Google',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(ok=>console.log("Connected to DB"))
.catch(err=>console.log(err))
//passport middleware
require('../auth');
//creating express app
const app=express();
app.use(cors({origin:'*'}));
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: true
}))
//Routes
app.use('/auth',routes)
app.listen(5000,()=>console.log("Server started at port 5000"))