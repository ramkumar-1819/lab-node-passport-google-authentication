const mongoose=require('mongoose'),Schema=mongoose.Schema;
const bcrypt=require('bcrypt');
//Defining the schema 
const user=new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
//create a model
const userModel=mongoose.model("Authentication",user);
module.exports={userModel}