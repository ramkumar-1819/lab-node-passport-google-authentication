const passport=require('passport');
const {userModel}=require('./Model/model');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const LocalStratergy=require('passport-local').Strategy;

//Passport middleware's Local Stratergy for Login
passport.use('login',
    new LocalStratergy({
      usernameField:'username',
      passwordField:'password'
    },
    async(username,password,done)=>{
        userModel.findOne({username:username})
        .then(data=>{
          if(data===null){
            return done(null,false,{message:"User Not found"})
          }
          else if(data.password!==password){
            return done(null,false,{message:"Invalid Password"})
          }
          return done(null,data,{message:true})
        })
        .catch(err=>done(err))
    })
)

//Passport middleware's Google Stratergy for Signin
passport.use('google',
    new GoogleStrategy({
    clientID:'955739704334-6ckcec9na78j0jmvkbvmoobom0mdn48s.apps.googleusercontent.com',
    clientSecret: 'oy7f402M1Q3KrhTwGcTgFapc',
    callbackURL: "/auth/google/redirect"    //call back url if success
  },
  function(request, accessToken, refreshToken, profile, done) {
    //profile contain user infos
    //If user is found then Login else signup and login
    userModel.findOne({password:profile.id})
    .then(data=>{
      if(data){
        return done(null,data)
      }
      else{
        new userModel({
          username:profile.displayName,
          password:profile.id
        }).save()
        .then(user=>done(null,user))
        .catch(err=>done(err))
      }
    })
    .catch(err=>done(err))
  })
);