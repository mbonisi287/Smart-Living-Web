import React from "react";
import { Header } from "../../components";
import { useState, useRef , useEffect} from 'react';
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form';
import { ModalHeader } from 'react-bootstrap';
import {    BrowserRouter as Router,    Routes,   
     Route, Link, useLocation, useNavigate,  } from "react-router-dom";
import { Stepper, Step, StepLabel, Box, Button, useTheme } from "@mui/material";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { API_URL } from "../../global";
import { Label } from "@mui/icons-material";

const steps = ["Property Details", "Review & Submit"];


const Property = () => {

    const [ file, setFile ] = useState('');
    const navigate = useNavigate();
    const inputFileRef = useRef();
    const [ customerForm, setCustomerForm ] = useState(true ); 

    const [activeStep, setActiveStep ] = useState(0);

    const [redirectCountdown, setRedirectCountdown] = useState(3); 
    const [ successMessage, successMessageVisible ] = useState(false);
    const [ showRedirectSpinner, setShowRedirectSpinner] = useState(false);
    const [ loadingSubmit, setLoadingSubmit] = useState(false);
    
    const [ showNoRecordsModal, setShowNoRecordsModal] = useState(false);

    const [ count, setCount] = useState(0);  
    const [ bookingDate, setBookingDate ] = useState(new Date());
    const [ travelDate, setTravelDate ] = useState(new Date());    
    const [ loading, setLoading] = useState(false);
    const [ modalError, setModalError ] = useState(false);
    const [ errorFormModal, setErrorFormModal ] = useState(false);
    const [ fileSizeErrorModal, setFileSizeErrorModal ] = useState(false);

    const [ propertyForm, setPropertyForm ] = useState(false);
    const [ propertyListing, setPropertyListing ] = useState([]);

        // Missing values on Booking Agent
    const { control, handleSubmit, watch, trigger,  formState: { errors }  } = useForm({
        defaultValues: {  propertyName: "", propertyAddress: "", propertyType: "",
            tenantId: "",
            //companyName:"", subdomain: "wwww.example.com", contactPerson:"", 
            //contactNumber: "", contactEmail:"",
            //, fileName: "", tenantId: "",
            // altContactNo:"", bookingRef:"", bookingDate:"", departAirport: "", 
            // arrivalAirport:"", travelDate: "",
            //voucherNo: "", voucherAmount:"" 
        },
    });

    const onSubmit = async (data) => {
    
        if (activeStep === steps.length - 1) 
        { 
            data.tenantId = 0;
            //setLoadingSubmit(true);
            //data.docType = idType;
            //data.identityNoPassportNo = idNumber;
            //setEmail(data.email);
        // data.fileName = data.name + data.surname + idNumber + ".pdf";
        // Cookies.set('userId', data.email, {expires: 1});
        // localStorage.setItem("step1Complete", "true");
        

            
            // start the spinner and have a 10 second
            setShowRedirectSpinner(true);
        
            try {
            await axios.post(API_URL + 'NewProperty', data);
            
            successResponse();
                

            //Api for Document Upload
            const uploadData = new FormData();
            uploadData.append('file', file, data.fileName );

            await axios.post(API_URL + 'UploadAttachment', uploadData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            
            setLoading(true);

            //Redirect or Show Spinner
            const interval = setInterval(() => {
                
                setRedirectCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    navigate('/verification'); // Adjust path as needed
                }
                return prev - 1;
                });
            }, 1000);

            } catch (error) {
            setModalError(true);
            
            } finally{
            setLoading(false);
            }
        } else {
        setActiveStep((prev) => prev + 1);
        }
    };

    const handleNext = async () => {
        const result = await trigger([
        "name",
        "surname",
        "email",
        "docType",
        "identityNoPassportNo",
        "phoneNo"
        ]);
    };

    useEffect(() => {
        axios.get(API_URL + 'GetAllProperties')
        .then((response) => {
            setPropertyListing(response.data);
        })
        .catch((error) => {
            console.error("API error", error);
        });
    }, []);

    return(
       <Box m="20px">
          <Header title="Property Listings Dashboard" subtitle=" Welcome to the Company Dashboard - Register Your Company as Client on our System" />
          <Box height="75vh">

            <div className="">
                <button className="btn btn-primary" 
                onClick={() => setPropertyForm(true)}> Add New Property </button>
                {
                    propertyForm &&
                    <>
                      <hr className="propHr" />
                    <button className="btn btn-danger" 
                        onClick={() => setPropertyForm(false)}> Close New Property Form </button>
                     <Box sx={{ width: "100%", margin: "auto", mt: 5, fontSize: 20 }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) =>(
                            <Step key={label}>
                                <StepLabel><span className="stepperHeading">{label}</span></StepLabel>
                            </Step>
                            ))}
                        </Stepper>
            
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {activeStep === 0 && (
                            <Box>
                                    {/* Name and Surname */}
                                    <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                        <label className="form-label">  Property Name   </label>     
                                        <Controller
                                        name="propertyName"
                                        control={control}
                                        render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Please Enter the Propert Name" required />}
                                        />   
                                            
                                        
                                        </div>
                                        <div className="col-md-6">  
                                        <label className="form-label"> Property Type </label>  
                                        <Controller
                                            name="propertyType"
                                            control={control}
                                            render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Please Enter the type of property - Apartments, Rooms, Complex, etc..." required />}
                                            />                            
                                        <div className="invalid-feedback">   Please enter a username.     </div>     
                                        </div>              
                                    </div>             
                                    </div>

                                    <div className="form-group">
                                    <hr />
                                    <label className="form-label"> Property Address  </label>
                                      <Controller
                                            name="address"
                                            control={control}
                                            render={({ field }) => <input {...field} type="text" 
                                            className="form-control" 
                                            placeholder="Please Enter the address of the property - 1232, abdc Avenue, Example Surburb..." required />}
                                            />  
                                  

                                           
                                    </div>

                            </Box>
                            )}
            
                            {activeStep === 1 && (
                            <Box>
                                <div className="bookingInfo"> 
                                <h3 className='reviewH3'> Please review your details before submitting...</h3>
                                <hr />
                                <span className="revSpan">
                                    Company Name: <span className="revSpanInner revSpanInnerName">{watch("companyName")}</span> 
                                    </span>
                                <span className="revSpan"> 
                                    Company Contact Person: <span className="revSpanInner revSpanInnerSurname">{watch("surname")}</span> </span>
                            
                            

                                
                    
                                <hr />
                                <span className="revSpan"> 
                                    Contact Person Phone Number: <span className="revSpanInner">{watch("phoneNo")}</span> 
                                    </span>

                                <span className="revSpan"> 
                                    Contact Person Email Address: <span className="revSpanInner">{watch("email")}</span> 
                                    </span>

                            

                                </div>
                    
                            </Box>
                            )}      
                    
                            <Box mt={2}>
                            {activeStep > 0 && (
                                <button className="stepsBtn stepsBtnBack"  type="button" onClick={() => setActiveStep((prev) => prev - 1)}>Back</button>
                            )}
                            
                            <button className="stepsBtn" type="submit" onClick={handleNext} disabled={loading}>
                            {loading ? (
                                    <>
                                        Submitting...
                                        <span
                                        className="spinner-border spinner-border-sm ms-2"
                                        role="status"
                                        aria-hidden="true"
                                        ></span>
                                    </>
                                    ) : activeStep === steps.length - 1 ? 'Submit' : 'Next'  }
                            </button>
                            </Box>
                        </form>
                    </Box>
                     </>

                }
         
                {              
                    successMessage &&   
                    <div className="verifySuccess">
                        {showRedirectSpinner && (
                            <div className="overlay">
                            <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                            </div>
                            <p style={{ color: 'white', marginTop: '15px' , fontSize: '1.6em'}}>
                            Your Customer Info has been captured and you will be directed to Step 2 in the next page.
                            
                            Redirecting in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...
                            
                            </p>
                        </div>
                        )}
                        

                    </div>               
                }

              
                { modalError && (
                    <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Form Submission Error</h2>
                        <p>Please fill in all fields correctly before continuing to Step 2</p>                                         
                        <hr />
                        <button className="btn btn-dark" onClick={() => setModalError(false)}>Close</button>
                    </div>
                    </div>
                )} 

                { 
                
                    fileSizeErrorModal && (
                    <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>File Size Restriction</h2>
                        <p>Please select and upload a file that is less than <strong> 5MB(i.e., MegaBytes) </strong></p>                                         
                        <hr />
                        <br /><br />
                        <p> We kindly advice that you make use of free PDF Compression Tools or use free PDF compression websites to ensure that your file 
                        is less than  <br />
                        <strong> 5MB(i.e., Megabytes) </strong> ...</p> 
                        <button className="btn btn-dark" onClick={() => setFileSizeErrorModal(false)}>Close</button>
                    </div>
                    </div>
                )} 
            </div>

            <div className="propLists">
                <hr className="propHr" />
                <h3> Properties Under Your Organisation </h3>
                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <td> Property Name</td>
                            <td> Property Type </td>
                            <td> Property Address </td>                            
                            <td> Action/Edit </td>
  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            propertyListing.map((listings, index) => {
                                return <tr key={index}>
                                    <td>{listings.propertyName}</td>
                                    <td>{listings.propertyType}</td>
                                    <td>{listings.propertyAddress}</td>
                                    <td><button className="btn btn-info"> View/Edit</button></td>
                                </tr>
                            })
                        }
                    </tbody>

                </table>
            </div>
          </Box>
        </Box>
    )
}

export default Property;