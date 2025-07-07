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

const steps = ["Maintenance Job Details", "Review & Submit"];

const Maintenance = () => {

    const [ jobForm, setJobForm ] = useState(false);
    const handleClose = ()  => setJobForm(false);

    // Ref object to reference the input element
    const inputFile = useRef(null);

     const [file, setFile ] = useState('');

    const navigate = useNavigate();
    const [customerForm, setCustomerForm ] = useState(true ); 
    const [redirectCountdown, setRedirectCountdown] = useState(5); 
    const [showRedirectSpinner, setShowRedirectSpinner] = useState(false);
    const [loading, setLoading] = useState(false);

    const [activeStep, setActiveStep ] = useState(0);

    
    
    const [ verifyForm, verifyFormVisible ] = useState(true);
    const [ successMessage, successMessageVisible ] = useState(false);

    const [ vouchers, setVouchers ] = useState([]);

    const [bookingDate, setBookingDate ] = useState(new Date());
    const[ flightRoute, setFlightRoute] = useState('');
    const [departAirport, setDepartAiport] = useState(true);

    // Airport Validation - Depart and Arrive Option
    const [ departOption, setDepartOption ] = useState('');   
    const [ arriveOption, setArriveOption ] = useState(''); 
    const [ optionError, setOptionError ] = useState('');

    const [ fileSizeErrorModal, setFileSizeErrorModal ] = useState(false);

    const [ verificationEmailModal ,  setVerificationEmailModal ] = useState(false);

    //Validation Logic

    //PNR Validation
    const [bookingNo, setBookingNo ] = useState('');
    const [bookingNoError, setBookingNoError] = useState('');


    const [ voucherNo, setVoucherNo ] = useState('');
    const [ errorVoucherNo, setErrorVoucherNo] = useState('');

    const [ jobItem, setJobItem ] = useState(''); 

    const [ allJobs, setAllJobs ] = useState([]);


    const handleReset = () => {
        if (inputFile.current) {
            inputFile.current.value = null;
            //inputFile.current.value = "";
            //inputFile.current.type = "text";
            //inputFile.current.type = "file";
            
        }
      };

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {  
            unitNo: "",
            jobItem: "",
            jobItemDescription: "",
            allocatedTo: "",
            allocatedBy: "",
            completedBy: "",
            adminApprovalBy: "",            
           },
    });

    const onSubmit = async (data) => {

      //data.voucherNo = voucherNo;
      //data.pnrNo = bookingNo;      
      //data.depAirport = 'None';
      //data.arrAiport = 'None';
      data.jobItem = jobItem;
      if(data.fileName === '')
      { 
        data.fileName="Not File Attached";
 
        
      }else{
        
        data.fileName = data.unitNo + data.jobItem + file?.name  + ".pdf";
        
      }
     

   

      if (activeStep === steps.length - 1) 
        {     
           setLoading(true);
          setShowRedirectSpinner(true);
          try{
              await axios.post(API_URL + "NewJob", data);
              successResponse();
              //alert("Form submitted successfully!");       
    
              //Api for Document Upload
              const uploadData = new FormData();
              uploadData.append('file', file, data.fileName );
    
              await axios.post(API_URL + "UploadAttachment", uploadData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              setVerificationEmailModal(true);

              
              //Redirect or Show Spinner
              const interval = setInterval(() => {                
                setRedirectCountdown((prev) => {
                  if (prev === 1) {
                    clearInterval(interval);
                                       // Adjust path as needed
                  }
                  return prev - 1;
                });
              }, 1000);

          }catch(error){

          } finally{
             
              setLoading(false); 
              successMessageVisible(false);
              navigate('/maintenance'); 
             
          }
        } else {
          setActiveStep((prev) => prev + 1);
        
        } 

    };

      useEffect(() => {
    // Function to fetch vouchers
    const fetchJobs = () => {
      axios.get(API_URL + "AllJobs" ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
      })
        .then((response) => {
          setAllJobs(response.data);
          //console.log("Fetched Vouchers:", response.data);
        })
        .catch((error) => {
          //console.error("API error:", error);
        });
    };

    // Call immediately on mount
    fetchJobs();

    // Set interval to run every 60 seconds
    const intervalId = setInterval(fetchJobs, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);


   

      return (
        <Box m="20px">
          <Header title="Maintenance Dashboard" subtitle=" Welcome to the Maintenance Dashboard - Repairs and Fixes" />
          <Box height="75vh">
            <div className="jobReqArea">
                <h2> Log a maintenance Request  </h2>
                <button className="btn btn-primary" onClick={() => setJobForm(true)}> Create Request </button>
                
                   
                    <Modal
                        show={jobForm}
                        handle={handleClose}
                        backdrop="static"
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        keyboard={false}>
                        <ModalHeader>
                            <button className="btn btn-primary" onClick={handleClose}> Close </button>
                            <Modal.Title>  
                                Log A Maintenance Request
                            </Modal.Title>
                        </ModalHeader>
                        <Modal.Body>
                            <Box sx={{ width: "100%", margin: "auto", mt: 5 }}>
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
                                        {/* Attach Your Booking Invoice */}

                                        <div className="form-group">
                                            <hr />
                                            {/* Removed the "Required" attribute */}
                                            <label className="form-label"> Attach Picture of Affected Area* <i className="bi bi-info-circle"></i> </label>
                                                <input type="file" 
                                                    className="form-control" aria-describedby="Upload"
                                                    ref={inputFile}
                                                    accept="/.pdf/.png/.pdf"
                                                    onChange={(event) => {
                                                        
                                                        if(event.target.files && event.target.files[0] && event.target.files[0].type ==='application/pdf'){
                                                            if(event.target.files[0].size < 5 * 1024 * 1024) {
                                                                setFile(event.target.files[0])
                                                        
                                                            }else{
                                                              setFileSizeErrorModal(true);
                                                              
                                                               
                                                                handleReset();
                                                                
                                                            }

                                                        }
                                                    }} 
                                                />
                                        </div>


                                        {/* Email */}
                                        <div className="form-group">
                                            <hr />
                                            <label className="form-label"> Problem Area </label>
                                                <Controller
                                                    name="jobItem"
                                                    control={control}
                                                    placeholder="Choose Your Area ........"
                                                    render={({ field }) =>  
                                                        <select  {...field} value={jobItem} 
                                                        onChange={(e) => setJobItem(e.target.value)} 
                                                        
                                                        className="form-select" required > 
                                                            <option value=""> Choose Your Area ........</option>                                                
                                                            <option value="Appliances"> Applicances </option> 
                                                            <option value="Doors&Locks"> Doors and Locks </option>  
                                                            <option value="Electricity"> Electricity </option> 
                                                            <option value="Plumbing"> Plumbing </option>                                                                                           
                                                        </select>                               
                                                    }
                                                />       

                                          </div>    

                                                                                      {/* Message Note  */}
                                    <div className="form-group">
                                          <hr />
                                          <label className="form-label">
                                                Describe the problem you're having(maximum 500 characters)
                                          </label>
                                            <Controller
                                                name="jobItemDescription"
                                                control={control}
                                                rules={{
                                                required: "This field is required",
                                                maxLength: {
                                                    value: 500,
                                                    message: "Message cannot exceed 500 characters",
                                                },
                                                }}
                                                render={({ field }) => {
                                                    const charCount = field.value ? field.value.length : 0;
                                                    return (
                                                    <>
                                                        <textarea
                                                        {...field}
                                                        rows="5"
                                                        maxLength="500"
                                                        className={`form-control ${errors.messageNote ? 'is-invalid' : ''}`}
                                                        placeholder="Maximum 500 characters......"
                                                        ></textarea>

                                                        {/* Live character count display */}
                                                        <div className="text-end ">
                                                        {charCount}/500 characters used
                                                        </div>

                                                      
                                                    </>
                                                        );
                                                    }}
                                                    />
                                    </div>
             
                                   </Box>
                                 )}
                 
                                 {activeStep === 1 && (
                                   <Box>
                                     <div className="bookingInfo"> 
                                      <h3> Please Review of the all the details before submitting....</h3>
                                       
                                      
                
                                        <span className="revSpan"> 
                                          Attachment File Name: <span className="revSpanInner">{file?.name === '' ? 'Please note that you have not attached any file' :
                                          file?.name  
                                           }{watch("")}</span> 
                                        </span>

                                         <span className="revSpan"> 
                                            {jobItem === '1' ? 'South African ID Number:' : jobItem === '2' ? 'Passport Number:' : ""}{watch("jobItem")} <span className="revSpanInner"></span> 
                                        </span>

                                        <span className="revSpan"> 
                                        Message Note<span className="revSpanInner">{watch("jobItemDescription")}</span> 
                                        </span>
                
                                
                
                                     </div>
                        
                                   </Box>
                                 )}
                        
                        
                        
                                 <Box mt={2}>
                                   {activeStep > 0 && (
                                     <button className="stepsBtn btn btn-primary" onClick={() => setActiveStep((prev) => prev - 1)}>Back</button>
                                   )}
                                   {/*<button className="stepsBtn" type="submit" disabled={loading}>{activeStep === steps.length - 1 ? "Submit" : "Next"}</button>*/}
                                   <button className="stepsBtn btn btn-primary" type="submit" disabled={loading}>
                                   {loading ? (
                                          <>
                                            Submitting...
                                            <span
                                              className="spinner-border spinner-border-sm ms-2"
                                              role="status"
                                              aria-hidden="true"
                                            ></span>
                                          </>
                                        ) : activeStep === steps.length - 1 ? (
                                          'Submit'
                                        ) : (
                                          'Next'
                                    )}
                                   </button>
                                 </Box>
                               </form>
                            </Box>

                        </Modal.Body>
                    </Modal>

                       {              
                            successMessage &&          

                            <div className="verifySuccess">
                            {showRedirectSpinner && (
                                <div className="overlay">
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p style={{ color: 'white', marginTop: '15px' , fontSize: '1.6em'}}>
                                    Your info has been captured and you will be directed to back to the Maintenance Dashboard.
                                    
                                    Redirecting in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...
                                    
                                </p>
                                </div>
                            )}
                            

                            </div>

                          
                        }

                    
                        {
                            verificationEmailModal && (

                            <div className="modal-overlay">
                                <div className="modal-content">
                                <h2> Thank You...</h2>
                                <p> We have received your request for a maintenance job and an email will be sent to you... </p>
                                <hr />
                                <p> If you do not recieve the email, please be sure to check you spam folder or junk mail.</p>
                                <hr />
                                
                        
                                <button className="btn btn-dark" onClick={() => setVerificationEmailModal(false)}>Close</button>
                                </div>
                            </div>
                        )}

                       { fileSizeErrorModal && (
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

            <div className="allJobs">
                <h2> All Maintenance Requests </h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <td> Unit No:</td>
                            <td> Job Date </td>
                            <td> Job Item</td>
                            <td> Job Description </td>
                            <td> Assigned To</td>
                            <td> Assigned By </td>
                            <td> Allocation Date  </td>
                            <td> Completion Date </td>
                            <td> Call-To-Action </td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allJobs.map((jobs, index) => {
                                return <tr key={index}>
                                    <td> {jobs.unitNo} </td>
                                    <td> {jobs.jobDate} </td>
                                    <td> {jobs.jobItem} </td>
                                    <td> {jobs.jobItemDescription} </td>
                                    <td> {jobs.allocatedTo}</td>
                                    <td> {jobs.allocatedBy} </td>
                                    <td> {jobs.allocationTime}</td>
                                    <td> {jobs.completionTime}</td>
                                    <td> <button className="btn btn-success"> Click To Expand For More Details </button></td>

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
        
       


              
           
          </Box>
        </Box>
      );

};

export default Maintenance;