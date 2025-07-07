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
import { Label } from "@mui/icons-material";

const steps = ["Personal Details", "Next of Kin Details",  "Review & Submit"];


const TenantOnboarding = () => {

  const [file, setFile ] = useState('');

  const navigate = useNavigate();

  const inputFileRef = useRef();
  const [customerForm, setCustomerForm ] = useState(true ); 
  const [redirectCountdown, setRedirectCountdown] = useState(3); 
  const [ successMessage, successMessageVisible ] = useState(false);
  const [showRedirectSpinner, setShowRedirectSpinner] = useState(false);
  const [ loadingSubmit, setLoadingSubmit] = useState(false);
  
  const [showNoRecordsModal, setShowNoRecordsModal] = useState(false);

  const [count, setCount] = useState(0);
  
  const [bookingDate, setBookingDate ] = useState(new Date());
  const [travelDate, setTravelDate ] = useState(new Date());

  const [activeStep, setActiveStep ] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ modalError, setModalError ] = useState(false);

  const [ errorFormModal, setErrorFormModal ] = useState(false);

  const [ fileSizeErrorModal, setFileSizeErrorModal ] = useState(false);

  // Validations Section
  //ID or Passport Validations
  const [idType, setIdType] = useState(''); // 'id' or 'passport'
  const [ rshipType, setRshipType ] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');

  const [ profile, setProfile ] = useState([]);
  const [ onBoardingArea, setOnBoardingArea ] = useState(false);
  const [ profileInfo, setProfileInfo ] = useState(false);

  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const username = payload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const role = payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    
  //API Request for queries
  //Admin all open queries
  //User all open queries for the user

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }

  console.log("Username is now: " + username);

  useEffect(() => {
    axios.get(API_URL + "CheckTenantProfile?Email=" + username , {
                  headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    })
      .then(response =>  {
        setProfile(response.data);

        //console.log();

        if(profile.length >= 1)
        {
          setOnBoardingArea(false);
          setProfileInfo(true);
        } else{
          setOnBoardingArea(true);
          setProfileInfo(false);
        }
      }) // Assume data is an array of { id, name }
      .catch(error => console.error('Error fetching data:', error));      
  }, []); 


      const identityType = '';

    // Validation logic on blur
    const handleBlur = (idNumber) => {
        if (idType == 1) {
        //const saIdRegex = /^\d{13,13}$/; 
        
            const saIdRegex = /^\d[0-9]{12}$/ // SA ID: exactly 13 digits
            if (!saIdRegex.test(idNumber)) {
                setError('Invalid South African ID number (must be 13 digits).');
                setLoading(false);
            } else {
                setError('');
            }
        } else if (idType == 2) {
            const passportRegex = /^[A-Za-z0-9]{6,9}$/; // Simple example: 6–9 alphanumeric characters
            if (!passportRegex.test(idNumber)) {
                setError('Invalid passport number (6–9 letters or numbers).');
            } else {
                setError('');
            }
        } else if(idType.trim() ===""){        
            setError('');
        }else{
          setError('Please select an ID type.');
        }

        const isValidSAID = /^\d{13}$/.test(idNumber); // Exactly 13 digits
        const isValidPassport = /^[A-Za-z0-9]{6}$/.test(idNumber);

        if (!isValidSAID && !isValidPassport) {
          //setIdNumber('');
          setLoading(false);
         
          return; // Stop if invalid
        }  
        
      
    };



  // Missing values on Booking Agent
  const { control, handleSubmit, watch, trigger,  formState: { errors }  } = useForm({
    defaultValues: { name: "", surname:"", email: "", docType:"", 
        identityNoPassportNo: "", phoneNo:"", fileName: "", nxtFirstName: "", nxtLastName: "", nxtPhone: "", nxtRelNo: "",
       
    },
  });

  const handleNext = async () => {
    const result = await trigger([
      "name",
      "surname",
      "email",
      "docType",
      "identityNoPassportNo",
      "phoneNo"
    ]);

    const identityType = idType;

  if (result && !error && file) {
    //setActiveStep((prev) => prev + 1);
  } else {
    setModalError(true);
    setActiveStep((prev) => prev - 1);
  }

};

  const changeHandler = e => {
    setIdDocVisible(e.target.value);
  };



  const onSubmit = async (data) => {
    
    if (activeStep === steps.length - 1) 
    { 
        
        //setLoadingSubmit(true);
        data.docType = idType;
        data.nxtRelNo = rshipType;
        data.identityNoPassportNo = idNumber;
        //setEmail(data.email);
        data.fileName = data.name + data.surname + idNumber + ".pdf";
        //Cookies.set('userId', data.email, {expires: 1});
        //localStorage.setItem("step1Complete", "true");
       

        
        // start the spinner and have a 10 second
        setShowRedirectSpinner(true);
       
        try {
          await axios.post(API_URL + 'CreateTenant', data);
          
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
                navigate('/'); // Adjust path as needed
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

  // Ref object to reference the input element
  const inputFile = useRef(null);

  // Function to reset the input element
  const handleReset = () => {
      if (inputFile.current) {
          inputFile.current.value = null;
          //inputFile.current.value = "";
          //inputFile.current.type = "text";
          //inputFile.current.type = "file";
          
      }
  };

  const successResponse = () =>
  {
    
    successMessageVisible(true);
    setCustomerForm(false);
    //navigate('/verification'); 
    
  }

    return(
        <Box m="20px">
          <Header title="Tenant Onbaording" subtitle="Welcome to the Tenant Onboarding Dashboard - 
          Please complete all the steps below" />
          <Box height="75vh">

            {
              profileInfo &&
              <div className="">
                <h4> Tenant Profile Details </h4>
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
                            profile.map((ten, index) => {
                                return <tr key={index}>
                                    <td> {ten.firstName} </td>
                                    <td> {ten.lastName} </td>
                                    <td> {"0"+ten.phoneNo} </td>
                                    <td> {ten.email} </td>
                                    <td> {ten.idNumberPassport}</td>
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
            }



            {/* Personal Information */}

            {
              onBoardingArea && 
                  <>
                    <div className="stepOne">
                        <h2> Please complete you personal Details</h2>
                    </div>           
                
                    <div className="formContainer">

                    

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
                                        <label className="form-label"> Name*   </label>     
                                      <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Enter your First Name"  />}
                                      />   
                                            
                                      
                                      </div>
                                      <div className="col-md-6">  
                                        <label className="form-label"> Surname* </label>  
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Enter your Surname"  />}
                                          />                            
                                        <div className="invalid-feedback">      Please enter a username.     </div>     
                                      </div>              
                                    </div>             
                                  </div>
                  
                                  {/* ID or Passport Number ... selection type*/}
                                  <div className="form-group">   
                                  <hr />    
                                      <div className="row">
                                          <div className="col-md-6">
                                                <label className="form-label"> Identification Type* </label>
                                                <Controller
                                                    name="docType"
                                                    control={control}
                                                    placeholder="Choose Your Identity Type....RSA ID or Passport"
                                                    render={({ field }) =>  
                                                      <select  {...field} value={idType} 
                                                      onChange={(e) => setIdType(e.target.value)} 
                                                      
                                                      className="form-select" required > 
                                                          <option value=""> Choose Your Identity Type....RSA ID or Passport </option>                                                
                                                          <option value="1"> South African ID </option> 
                                                          <option value="2"> Passport </option>                                
                                                        </select>                               
                                                  }
                                                /> 
                                          </div>
                                          <div className="col-md-6">
                                            <label className="form-label"> 
                                              {idType === '2' ? 'Passport Number:' :  idType === '1' ? 'South African ID Number:' : 'ID Number/Passport'} 
                                              </label>
                                          
                                          <Controller
                                                name="idNoPassportNo"
                                                control={control}
                                                render={({ field }) => 
                                                <input {...field} 
                                                type={idType ==='1' ? 'number' : 'text' } 
                                                value={idNumber}   
                                                minLength={ idType === '1' ? '12' : idType === '2' ? '6' : ''}
                                                maxLength={ idType === '1' ? '12' : idType === '2' ? '9' : ''}
                                                onChange={(e) => setIdNumber(e.target.value)}
                                                onBlur={handleBlur(idNumber)}
                                                className="form-control" 
                                                placeholder="Enter your ID Number or Passport Number" minimum="6"  />}
                                              />

                                              
                                          </div>
                                        </div> 

                                        <div className="row">
                                          {error && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.2em' }}>{error}</p>} 
                                        </div>
                                        
                                  </div>
                  
                  
                                  <div className="form-group">
                                    <hr />
                                    {/* Removed the "Required" attribute */}
                                    <label className="form-label"> Attach RSA Id Document or Passport*  </label>
                                    <input type="file" 
                                          className="form-control" aria-describedby="Upload"
                                          ref={inputFile}
                                          accept=".pdf"
                                          onChange={(event) => {
                                              
                                            if(event.target.files && event.target.files[0] && event.target.files[0].type ==='application/pdf'){
                                              if(event.target.files[0].size < 5 * 1024 * 1024 ){
                                                  setFile(event.target.files[0])
                                        
                                              }else{
                                                setFileSizeErrorModal(true);
                                                //alert("Please select a file that is less than 2MegaBytes");
                                                
                                                handleReset();
                                                //alert("Form field will be automitically reset for a new upload");
                                              }
                  
                                            }
                                    }} />
                                  </div>

                                  <div className="form-group">
                                  <hr />
                                    <label className="form-label"> Contact Number* </label>
                                    <Controller
                                            name="primaryPhoneNo"
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
                                            placeholder="Enter your Contact Number" />}
                                          /> 

                                            {errors.phoneNo && (
                                                      <p className="invalid-feedback" style={{ color: 'white'}}>{errors.phoneNo.message}</p>
                                            )} 
                                    </div>
                                    
                                    <div className="form-group">
                                        <hr />
                                        <label className="form-label"> Email Address* </label>
                                        <Controller
                                                name="email"
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
                                                placeholder="Enter your Email Address...."  name="email" />
                                            
                                            }
                                            />         {errors.email && (
                                                  <p className="invalid-feedback" style={{ color: 'white'}}>{errors.email.message}</p>
                                                )}

                                      </div>    


                            </Box>
                          )}

                          {activeStep === 1 && (
                            <Box>
                                  {/* Name and Surname */}
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label className="form-label"> Name*   </label>     
                                      <Controller
                                        name="nxtFirstName"
                                        control={control}
                                        render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Enter your First Name"  />}
                                      />   
                                            
                                      
                                      </div>
                                      <div className="col-md-6">  
                                        <label className="form-label"> Surname* </label>  
                                        <Controller
                                            name="nxtLastName"
                                            control={control}
                                            render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Enter your Surname"  />}
                                          />                            
                                        <div className="invalid-feedback">      Please enter a Surname.     </div>     
                                      </div>              
                                    </div>             
                                  </div>

                                  
                  
                                  {/* ID or Passport Number ... selection type*/}
                                  <div className="form-group">   
                                  <hr />    
                                      <div className="row">
                                          <div className="col-md-6">
                                                <label className="form-label"> Contact Number* </label>
                                                <Controller
                                                        name="nxtPhone"
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
                                          <div className="col-md-6">
                                                <label className="form-label"> Relationship </label>
                                                <Controller
                                                    name="nxtRelNo"
                                                    control={control}
                                                    placeholder="Choose Your Identity Type....RSA ID or Passport"
                                                    render={({ field }) =>  
                                                      <select  {...field} value={rshipType} 
                                                      onChange={(e) => setRshipType(e.target.value)} 
                                                      
                                                      className="form-select" required > 
                                                          <option value=""> Please Select the type of relationship....</option>                                                
                                                          <option value="1"> Spouse </option> 
                                                          <option value="2"> Sibling </option>     
                                                          <option value="2"> Relative </option>                            
                                                        </select>                               
                                                  }
                                                /> 
                                          </div>
                                    
                                        </div> 

                                        <div className="row">
                                          {error && <p style={{ color: 'red', fontWeight: '600', fontSize: '1.2em' }}>{error}</p>} 
                                        </div>
                                        
                                  </div>
                  
            
                            </Box>
                          )}

                          {activeStep === 2 && (
                            <Box>
                              <div className="bookingInfo"> 
                                <h3 className='reviewH3'> Please review your details before submitting...</h3>
                                <hr />
                              
                                <div className="row"> 
                                  <div className="col-md-6">  
                                      <h3> Tenant Details </h3>
                                    <span className="revSpan">
                                        Name: <span className="revSpanInner revSpanInnerName">{watch("name")}</span> 
                                      </span>
                                    <span className="revSpan"> 
                                        Surname: <span className="revSpanInner revSpanInnerSurname">{watch("surname")}</span> </span>
                                
                                    <span className="revSpan"> 
                                        {idType === '1' ? 'South African ID Number:' : idType === '2' ? 'Passport Number:' : ""}{watch("idType")} <span className="revSpanInner">{idNumber}{watch("identityNoPassportNo")}</span> 
                                      </span>

                                      <span className="revSpan"> 
                                        Attachment File Name: <span className="revSpanInner">{file?.name}{watch("identityNoPassportNo")}</span> 
                                      </span>

                                      <hr />
                                      <span className="revSpan"> 
                                        Contact Number: <span className="revSpanInner">{watch("phoneNo")}</span> 
                                        </span>

                                      <span className="revSpan"> 
                                        Email: <span className="revSpanInner">{watch("email")}</span> 
                                        </span>

                                  </div>
                                  <div className="col-md-6">
                                    <h3> Next Of Kin Details </h3>
                                    <span className="revSpan"> 
                                        Name : <span className="revSpanInner">{watch("nxtFirstName")}</span> 
                                    </span>

                                    <span className="revSpan"> 
                                        Surname : <span className="revSpanInner">{watch("nxtLastName")}</span> 
                                    </span>

                                    <span className="revSpan"> 
                                        Contact Number : <span className="revSpanInner">{watch("nxtPhone")}</span> 
                                    </span>

                                                                
                                    <span className="revSpan"> 
                                        Relationship: <span className="revSpanInner">{watch("rshipType")}</span> 
                                    </span>
                                  </div>

                                </div>                   


                          

                              </div>
                  
                            </Box>
                          )}
                  
                  
                  
                          <Box mt={2}>
                            {activeStep > 0 && (
                              <button className="stepsBtn stepsBtnBack btn btn-info"  type="button" onClick={() => setActiveStep((prev) => prev - 1)}>Back</button>
                            )}
                          
                            <button className="stepsBtn btn btn-success" type="submit" onClick={handleNext} disabled={loading}>
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

                    </div>
                  </>
            }                              
                               
        

              
           
          </Box>
        </Box>
    )
}

export default TenantOnboarding;