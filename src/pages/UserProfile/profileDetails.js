import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../UserProfile/profileDetails.css';

function ProfileDetails (){

    //Get User email from the token
    const userEmail1 = localStorage.getItem('key'); 

    let userEmail = userEmail1.replaceAll("\"", "").toString();
    console.log("Email is now " + userEmail);

    //bool profileActive = false;

    const profileResponse = "";

    const [formData, setFormData ] = useState ({
        profileId: userEmail,
        firstName: "",
        lastName: "",
        isActive: false,
    });

    const handleChange = event => { 
        setFormData ({ ...formData, [event.target.name] : event.target.value})
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post('https://localhost:44311/api/controller/createProfile', formData);
            console.log("Result from creating profile" + response.data);
            profileResponse = response.status;
        }
        catch(error){
            console.log("Creating Profile works");
        }
    }

    const [ userProfile, setUserProfile ] = useState([false]);

    //const [ visibleProfile, setVisibleProfile ] = useState([]);

    /*useEffect(() => {
        if(profileResponse != 200){
            axios.get('')
                .then( response => {
                    console.log(response.data);
                    setUserProfile(response.data);
                })
                .catch()
        }

    }, []);*/



    return(
        <div className="container">
            <div className="profileHeading">
                Personal Profile Details
            </div>
            <div className="profileForm">
                <form onSubmit={handleSubmit}>
                  {/*  <label> Email address 
                            <Form.Control onChange={this.handleChange} type="text" 
                            placeholder="Enter your name" />
                        <input onChange={handleChange} name="email" value={formData.email = userEmail}
                            type="email" placeholder="Enter your email address" 
                        />
                    </label>*/}
                        

                    <label>
                        First Name                    
                        <input onChange={handleChange} name="firstName" value={formData.firstName}
                        type="text" placeholder="Enter your First Name" />
                    </label>

                    <label>
                        Last Name                    
                        <input onChange={handleChange} name="lastName" value={formData.lastName}
                        type="text" placeholder="Enter your Last Name"/>
                    </label>

                    <button type="submit" className="btn btn-lg btn-success"> Create Profile </button>
                </form>
            </div>
            

            {/*Form to display the Profile Details after creating the Profile Details 
            <div className="displayProfileDetails">
                {
                    post.slice(0, 2).map((user, index) => {
                        return
                        <div className="row" key={index}>
                            <div className="col-6"></div>
                            <div className="col-6"></div>
                        </div>
                    })

                }
 
            </div>*/}
        </div>
    )

}

export default ProfileDetails;