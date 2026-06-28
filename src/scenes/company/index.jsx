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

const steps = ["Company Details", "Review & Submit"];

const Company = () => {

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

    // Missing values on Booking Agent
    const { control, handleSubmit, watch, trigger,  formState: { errors }  } = useForm({
        defaultValues: {  companyName:"", subdomain: "wwww.example.com", contactPerson:"", 
            contactNumber: "", contactEmail:"",
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
            await axios.post(API_URL + 'CreateCompany', data);
            
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

    return(
       <Box m="20px">
          <Header title="Company Dashboard" subtitle=" Welcome to the Company Dashboard - Register Your Company as Client on our System" />
          <Box height="75vh">

            <div className="">
            {
                customerForm &&
             
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
                                <label className="form-label">  Company Name   </label>     
                                <Controller
                                name="companyName"
                                control={control}
                                render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Please Enter the Company Name" required />}
                                />   
                                    
                                
                                </div>
                                <div className="col-md-6">  
                                <label className="form-label"> Contact Person </label>  
                                <Controller
                                    name="contactPerson"
                                    control={control}
                                    render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Please Enter the Company - Contact Person's Full Name" required />}
                                    />                            
                                <div className="invalid-feedback">      Please enter a username.     </div>     
                                </div>              
                            </div>             
                            </div>

                            <div className="form-group">
                            <hr />
                            <label className="form-label"> Contact Number* </label>
                            <Controller
                                    name="contactNumber"
                                    control={control}
                                    rules={{
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\d{10,14}$/,
                                            message: "Phone number must be between 10 and 14 digits",
                                        },
                                        }}
                                    
                                    render={({ field }) => 
                                    <input {...field} 
                                    type="number" minLength="10" maxLength="14" 
                                    className={`form-control ${errors.phoneNo ? 'is-invalid' : ''}`}  
                                    placeholder="Enter your Contact Number" required/>}
                                    /> 

                                    {errors.phoneNo && (
                                                <p className="invalid-feedback" style={{ color: 'white'}}>{errors.phoneNo.message}</p>
                                    )} 
                            </div>
                            
                            <div className="form-group">
                                <hr />
                                <label className="form-label"> Contact Email Address* </label>
                                <Controller
                                        name="contactEmail"
                                        control={control}
                                            rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                                message: "Enter a valid email address",
                                            },
                                            }}
                                        render={({ field }) => 
                                        <input {...field} type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Enter your Email Address...."  name="email" required/>
                                    
                                    }
                                    />         {errors.email && (
                                            <p className="invalid-feedback" style={{ color: 'white'}}>{errors.email.message}</p>
                                        )}

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
          </Box>
        </Box>
    )
}

export default Company;