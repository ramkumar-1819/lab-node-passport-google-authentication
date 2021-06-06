const passport=require('passport');
const express=require('express');
const router=express.Router();
const {userModel}=require('../Model/model');

//Route for signuping
//If useralready exist return false else return true as json msg
router.post('/signup',(req,res)=>{
    userModel.findOne({username:req.body.username},(err,data)=>{
        if(err){
            res.status(500)
        }
        else{
            if(data===null){
                const newuser=new userModel({username:req.body.username,password:req.body.password})
                   newuser.save((err,docs)=>{
                     if(err){
                       res.status(500)
                     }
                     else{
                        return res.send({message:true})
                     }
                   })
            }
            else{
                return res.send({message:false})
            }
            
        }
    })
})
//Route for Login
//Used Passport Local Stratergy to Login
router.post('/login',
    async(req,res,next)=>{
        passport.authenticate('login',
        async(err,user,info)=>{
            try{
                if(err){
                    res.status(500)
                }
                else if(!user){
                    res.json({message:info.message})
                }
                else{
                    res.json({message:info.message})
                }
            }
            catch(err){
                return next(error)
            }
        }
    )(req,res,next)
    }
)
//Signin through google account using passport google stratergy for getting user info
router.get('/google',
           passport.authenticate('google',{scope:['profile']})
);
//If google crendials are valid then it will redirect to this route and pass the user info back.
router.get('/google/redirect',(req,res,next)=>{
            passport.authenticate('google',
            async (err, user, info) => {
                try {
                    if(err || !user){
                        res.json({message:"Error Occured"})
                        return next()
                    }
                    else {
                        res.redirect('http://localhost:3000/success')
                        return next()
                  }
                }
                catch(err){
                    next(err)
                }
            }
            )(req,res,next)
        })
module.exports=router;