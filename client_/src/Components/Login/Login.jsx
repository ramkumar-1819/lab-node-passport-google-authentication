import React, { Component,useState } from 'react';
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';
import './Login.css';

export default function Login(){
      const history=useHistory();//for redirecting to next page if Login success
      //check the Inputed datas
      const loginHandler=(e)=>{
        e.preventDefault()
        const user=document.getElementsByName('username')[0].value;
        const password=document.getElementsByName('password')[0].value;
        const message=document.getElementById('msg');
        message.innerHTML="";
        //Username and password can't be null
        if(user===""){
            message.innerHTML="Username Can't be null";
            return
        }
        if(password===""){
            message.innerHTML="password can't be none";
            return
        }
        //Check if our credintials are correct with DB in backend
        //If correct then redirect to next page
        axios.post('http://localhost:5000/auth/login',{username:user,password:password})
        .then(res=>{
            console.log(res)
            if(res.data.message===true){
                history.push('/success')
            }
            else{
                message.innerHTML=res.data.message
            }
        })
      }
      return(
          <>
          <h1>Login Form</h1>
          <form className="login">
              <div id="msg"></div>
              <div>Email</div>
              <input type="text" name="username"></input>
              <div>Password</div>
              <input type="password" name="password"></input>
              <button className="btns" type='button' onClick={loginHandler}>SUMBIT</button>
              <Link to='/signup'><div>Signup?</div></Link>
              or
              <a href="http://localhost:5000/auth/google"><button className="google" type="button">SIGN IN WITH GOOGLE</button></a>
          </form>
          </>
      )
}
