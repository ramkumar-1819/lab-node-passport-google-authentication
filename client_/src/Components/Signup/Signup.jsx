import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';
import './Signup.css';

export default function Signup(){
    const history=useHistory();//for redirecting to the next page if authentication is success.
    useEffect(()=>{
        //keeping the form values as none,everytime we visiting the page
        document.getElementsByName("username")[0].value="";
        document.getElementsByName("password")[0].value=""
        document.getElementsByName("re-password")[0].value=""
    },[])
    const signupValidation=(e)=>{
        e.preventDefault()
        //getting the input fields in the form
        const username_field=document.getElementsByName("username")[0];
        const password_field=document.getElementsByName("password")[0];
        const repassword_field=document.getElementsByName("re-password")[0];
        //alerter - display msg if something goes wrong
        const alerter=document.getElementById('alerter');
        //pattern for password
        const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g;
        alerter.innerHTML=""
        //username can't be null
        if(username_field.value===""){
            alerter.innerHTML="Username Can't be null";
            username_field.focus()
            return
        }
        //password can't be null
        if(password_field.value===""){
            alerter.innerHTML="password can't be none";
            password_field.focus()
            return
        }
        //retype password field can't be null
        if(repassword_field.value===""){
            alerter.innerHTML="Retype the Password"
            repassword_field.focus()
            return
        }
        //password should be strong
        if(!password_pattern.test(password_field.value)){
            alerter.innerHTML="Password should be strong";
            password_field.focus()
            return
        }
        //password should match the retype password
        if(password_field.value!==document.getElementsByName('re-password')[0].value){
            alerter.innerHTML="Password is not matching";
            return
        }
        //If we filled everything then check with the datas in the DB in the backend
        //to proceed further or need to make changes.
        axios.post('http://localhost:5000/auth/signup',{username:username_field.value,password:password_field.value})
        .then(res=>{
            if(res.data.message){
                alert("Account Created Login to Continue")
                history.push('/login')
            }
            else{
                alerter.innerHTML="Username already Exist"
            }
        })
    }
    return(
        <>
        <h1>SignUp Form</h1>
        <form className="signup" >
            <div id="alerter"></div>
            <div>Username</div>
            <input type="text"  name="username"></input>
            <div>Password</div>
            <input type="password"  name="password" ></input>
            <div>Retype-Password</div>
            <input type="password"  name="re-password"></input>
            <button className="btns" type='button' onClick={signupValidation}>SUMBIT</button>
            <Link to='/login'><div>Login?</div></Link>
        </form>
        </>
    )
}