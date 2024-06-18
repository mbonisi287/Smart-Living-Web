import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../UserAccount/login.css';

import googleIcon from '../../Images/google-symbol.png';
import facebookIcon from '../../Images/facebook-icon.png';

import Cookies from 'js-cookie';

function Login(){

    window.onload = function () {
        console.log("hiding the elements");
        //const elements = document.getElementsByClassName('.smart-living, .footer, sidenav_sidenav__3d27F');
        //elements.style.display = 'none';
    }; 

    
        const [formData,setFormData] = useState({
            email:"",
            password: "",
        });

        const handleChange = event => { setFormData ({ ...formData, [event.target.name] : event.target.value });     }
    
        const handleSubmit = async(e) => {
            e.preventDefault();

            try{
                const response = await axios.post('https://localhost:44311/api/controller/login', formData );
                //alert("Login Successful" + JSON.stringify(response.data.adminRole));
                const username = response.data.userEmail;
                alert("Welcome - > " + JSON.stringify(response.data.userEmail));
                if(username != null){
                    const token = response.data.userEmail;
                    localStorage.setItem('key', JSON.stringify(token));

                    const storedData = localStorage.getItem('key');
                    const parsedData = JSON.parse(storedData);
                    

                    //setAuthToken(token);
                    console.log("This is the token" + storedData);

                    alert("Token is now set to - > " + parsedData);

                    window.location.href = '/';

                    console.log(JSON.stringify(response.data));
                   
                    Cookies.set('token', token, { expires: 7, secure: true });
                   // console.log("token is being set");
                } else {
                    console.log("Incorrect User credentials");
                }
                
                
            }catch(error){ console.log("could not post the login API");
            }   
            //console.log("Sign in Successful" + response.data);
            console.log("Api Works");

            //console.log(response.data);
        }

    return(
        <div className="container bodyContainer"> 
            <div className="center">   
                <div>
                    <h6> If you do have account, Please <a href="#"> Sign up </a></h6>
                    <hr />
                </div>
                <div class="loginForm">
                    <form onSubmit={handleSubmit}> 
                        
                            <label> Email address 
                                {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
                            <input onChange={handleChange} name="email" value={formData.email}
                                type="email" placeholder="Enter your email address" 
                            />
                            </label>  
                    

                        
                            <label> Password
                                {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
                            <input onChange={handleChange} value={formData.password} 
                                type="password" name="password" placeholder="Enter your password" 
                            />
                            </label>
                        

                        <button  type="submit" className="btn btn-lg btn-success ">  Login </button>
                    </form>
                </div>
                <div className="otherSignIn"> 
                    <hr />
                    <div className="loginRow">
                        <img className="loginIcons" src={googleIcon} alt="Logo"  />
                         <span className="contGoogle"> Continue with Google </span>
                    </div>
                   {/* <div className="loginRow">
                       <img className="loginIcons" src={facebookIcon} alt="Logo" /> 
                       <p> Continue with Facebook </p>
                    </div>*/}        
                    
                </div>


                <div>
                    <h6> <a href="#"> Forgot Password? </a></h6>
                        This site is protected by reCAPTCHA and the
                         Google <a href="#" className="googleTerms"> Privacy Policy </a> and <a href="" className="googleTerms">Terms of Service 
                         apply.</a>
                </div>

            </div>
        </div>
    )
}

export default Login;