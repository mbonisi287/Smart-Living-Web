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

    const checkProfileUrl = "https://localhost:44311/api/controller/Email?Email=mbonisitshuma287@gmail.com"; 

    //const checkProfileUrl = "https://localhost:44311/api/controller/GetAllProfiles"; 

    const  [ curProfile , setCurProfile] = useState("");
    
    const profileObj = "";

    useEffect(() => {
        axios.get(checkProfileUrl)
        .then(response => {
            const profileObj = new Array(JSON.stringify(response.data));
            console.log("Parsed 2.0  - Stringified Object => " + profileObj + "Profile Name");    

            //let profObj = JSON.parse(profileObj);
            
            //const profileArray = new Array(JSON.stringify(response.data));
            //console.log("Parsed Object => " + profObj + "Profile Name");
            
            //console.log(profObj + "Profile Name");

            setCurProfile(profileObj);
        })
        .catch(error => {
            console.error(error);
        });
    },[]);

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
        <div className="container profileContainer">
            <div className="profileHeading">
                <h2> Personal Details </h2>
            </div>
            <div className="">

            <nav>
                <div class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"> Personal Details</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"> Work Details </button>
                   
                </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="row pDetails">

                        <div class="col-6 text-justify">
                            <div class="formDisplay text-left">
                                <table class="table table-success">
                                 
                                        <tr> 
                                          <td class="text-start"> First Name:  </td>
                                          <td>  {curProfile.firstName}</td>
                                        </tr>
                                        
 
                                    <tr> <td class="text-start"> Surname: </td> <td></td>  </tr>
                                    <tr> <td class="text-start"> Email: </td> <td> {userEmail1} </td>  </tr>
                                    <tr> <td class="text-start"> ID or Passport: </td> <td></td>  </tr>
                                    <tr> <td class="text-start"> Primary Phone Number: </td> <td></td>  </tr>
                                    <tr> <td class="text-start"> Secondary Phone Number: </td> <td></td>  </tr>
                                    <tr class="text-start" > Next of Kin Details </tr>
                                    <tr> <td class="text-start"> Name: </td> <td></td>  </tr>
                                    <tr> <td class="text-start"> Surname: </td> <td></td>  </tr>
                                    <tr> <td class="text-start"> Phone Number: </td> <td></td>  </tr>
                                    <tr> <td class="text-start"> Relationship </td> <td></td>  </tr> 
                                </table>
                            </div>
                        </div>

                        <div class="col-6">
                            <button class="btn btn-primary"> Edit Details </button>
                        </div>
                    </div>

                 
                    
                    
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                
                </div>
                            
            </div>
            

            
        </div>
    )

}

export default ProfileDetails;