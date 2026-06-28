import { Header } from "../../components";
import { useState, useRef , useEffect} from 'react';
import axios from "axios";

import { Controller, useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form';
import { ModalHeader } from 'react-bootstrap';
import {    BrowserRouter as Router,    Routes,   
     Route, Link, useLocation, useNavigate,  } from "react-router-dom";
import { Stepper, Step, StepLabel, Box, useTheme } from "@mui/material";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { API_URL } from "../../global";


const Tenants = () => {

    const [ tenants, setTenants ] = useState([]);
    const [ userCreate, setUserCreate ] = useState(false);
    const [ userLevel, setUserLevel] = useState('');

    const [selectedValue, setSelectedValue] = useState('');

    const [ newUserMessage, setNewUserMessage] = useState(false );

        // Categorized users
    const [adminUsers, setAdminUsers] = useState([]);
    const [callCenterAgents, setCallCenterAgents] = useState([]);

    const [ propertyListings, setPropertyListings ] = useState([]);

    // Loading For Submitting New User
    const [loading, setLoading] = useState(false);


  const { control, handleSubmit } = useForm({
    defaultValues: {  username: "",   passwordHash: "", adminLevel:"" },
  });


    // Handle selection change
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = async ( data ) =>{
    data.adminLevel = userLevel;

    if (!selectedValue) {
      alert("Please select a user to assign the query.");
      return;
    }

    setLoading(true);

        try {
          await axios.post(API_URL + "users/register", data);
          //successResponse();
          //alert("Form submitted successfully!");       

          //alert("File Upload Successfully");


        } catch (error) {
          alert("User Already Exists");
        } finally{
            newUserNotification();
            setLoading(false);
        }

  }

    useEffect(() => {
    // Function to fetch vouchers
    const fetchTenants = () => {
      axios.get(API_URL + "GetAllTenants" ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
      })
        .then((response) => {
          setTenants(response.data);
          //console.log("Fetched Vouchers:", response.data);
        })
        .catch((error) => {
          //console.error("API error:", error);
        });
    };

    // Call immediately on mount
    fetchTenants();

    // Set interval to run every 60 seconds
    const intervalId = setInterval(fetchTenants, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch Property Listings from API...
  // Will Add flitering at a later stage based on the Login Cookie...
  useEffect(() => {
    axios.get(API_URL + 'GetAllProperties' , {
                  headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    })
      .then(response =>  setPropertyListings(response.data)) // Assume data is an array of { id, name }
      .catch(error => console.error('Error fetching data:', error));      
  }, []);

    return(
        <Box m="20px">
          <Header title="Tenant Dashboard" subtitle=" Welcome to the Tenant Dashboard - Repairs and Fixes" />
          <Box height="75vh">
            <div className="jobReqArea">
                <h2> Add New Tenant  </h2>
                <button className="btn btn-primary" onClick={() => setUserCreate(true)} > Create Tenant </button>
                  { 
                    userCreate && 
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-6">                          
                          <div className="form-group">
                              <label className="form-label"> Username </label>
                                  <Controller
                                        name="username"
                                        control={control}
                                        render={({ field }) => 
                                        <input {...field} type="email" className="form-control" placeholder="Please enter the username..an email address...."  name="username" required/>
                                      
                                      }
                                  />   <div className="invalid-feedback">Please fill out this field.</div> 
                          </div>

                          <div className="form-group">
                            <label className="form-label"> Password </label>
                                <Controller
                                        name="passwordHash"
                                        control={control}
                                        render={({ field }) => 
                                        <input {...field} type="text" className="form-control" placeholder="Please enter a default password for the user ...."  name="passwordHash" required/>
                                    
                                    }
                                />   
                          </div>

                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label className="form-label"> Admin Level </label>
                                
                                    <select  value={userLevel} 
                                      onChange={(e) => setUserLevel(e.target.value)} 
                                    
                                      className="form-select" required > 
                                        <option value=""> Choose the admin level</option> 
                                        <option value="superAdmin"> Super Administrator </option>                                                
                                        <option value="admin"> Administrator </option> 
                                        <option value="tenant"> Tenant  </option>    
                                        <option value="techmaintenance"> Technicians/Maintenance Team   </option>                                
                                        </select>    
                            
                            </div>

                            <div className="form-group">
                              <label className="form-label"> Assign Tenant To Property </label>
                              <Controller
                                  name="assignedTo"
                                  control={control}
                                  render={({field}) =>
                                          <select className="form-select" {...field} id="dropdown" name="assignedTo" value={selectedValue} onChange={handleChange}>
                                          <option value="">-- Select A Property To Assign A Tenant --</option>
                                          {propertyListings.map(option => (
                                            <option key={option.propertyId} value={option.propertyName}>
                                              {option.propertyName}
                                            </option>
                                          ))}
                                        </select>
                                  }                                
                              />                              
                            </div>
                          
                        </div>

                      </div>

                      <hr />                 

                        <div className="">                            
                            <button className="btn btn-primary" type="submit">
                                { loading ? 
                                    (
                                    <>
                                        Creating New User...
                                        <span
                                        className="spinner-border spinner-border-sm ms-2"
                                        role="status"
                                        aria-hidden="true"
                                        ></span>
                                    </>
                                    ) 

                                    : 'Submit'
                                }
                            </button>

                            <button className="stepsBtn btn btn-danger"
                              onClick={() => setUserCreate(false)}
                            > Close </button>

                        </div>
                    </form>
                }

      

        


                
            </div>

            <div className="allTenants">
                <h2> All Tenants </h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <td> Name </td>
                            <td> Surname </td>
                            <td> Phone Number</td>
                            <td> Email </td>
                            <td> ID Number/Passport Number</td>
                            <td> Next of Kin - Name </td>
                            <td> Next of Kin - Surname </td>
                            <td> Next of Kin - Phone Number  </td>
                            <td> Next of Kin - Relationship </td>
                            
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tenants.map((ten, index) => {
                                return <tr key={index}>
                                    <td> {ten.firstName} </td>
                                    <td> {ten.lastName} </td>
                                    <td> {"0"+ten.primaryPhoneNumber} </td>
                                    <td> {ten.email} </td>
                                    <td> {ten.IDNumber}</td>
                                    <td> {ten.nxtFirstName}</td>
                                    <td> {ten.nxtLastName} </td>
                                    <td> {"0"+ten.nxtPhone}</td>
                                    <td> {ten.nxtRelNo == 1 ? 'Spouse' : ten.nxtRelNo == 2 ? 'Sibling' : 'Relative'}</td>
                                    

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>

            <Modal>
              
            </Modal>
        
       


              
           
          </Box>
        </Box>

    );
}
export default Tenants; 