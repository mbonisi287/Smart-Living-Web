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
import { Apartment } from "@mui/icons-material";

const steps = ["Maintenance Job Details", "Review & Submit"];

const Apartments = () => {

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

    const [ singleTenant, setSingleTenant] = useState('');
    const [ singleUnit, setSingleUnit ] = useState('');

    const [ allApartments, setAllApartments ] = useState([]);
    const [ allTenants, setAllTenants ] = useState([]);
    const [ allocations, setAllocations ] = useState([]);


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
            buildingOrBlock: "",        
       
            profileId: "",
           
            allocatedBy: "",
            validLease: 0,
            activeAllocation: true,
                    
           },
    });

    const onSubmit = async (data) => {

      //data.voucherNo = voucherNo;
      //data.pnrNo = bookingNo;      
      //data.depAirport = 'None';
      //data.arrAiport = 'None';
      data.unitNo = singleUnit;
      data.profileId = singleTenant;
      {/*if(data.fileName === '')
      { 
        data.fileName="Not File Attached";
 
        
      }else{
        
        data.fileName = data.unitNo + data.jobItem + file?.name  + ".pdf";
        
      }*/}
     

   
    
           setLoading(true);
          setShowRedirectSpinner(true);
          try{
              await axios.post(API_URL + "AllocateApartment", data);
              successResponse();
              //alert("Form submitted successfully!");       
    
              //Api for Document Upload
              const uploadData = new FormData();
              uploadData.append('file', file, data.fileName );
    
         
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
              handleClose();
              navigate('/apartments'); 
             
          }
       
    };

    useEffect(() => {
    // Function to fetch vouchers
    const fetchApartments = () => {
      axios.get(API_URL + "GetAllApartments" ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
      })
        .then((response) => {
          setAllApartments(response.data);
          //console.log("Fetched Vouchers:", response.data);
        })
        .catch((error) => {
          //console.error("API error:", error);
        });
    };

    // Call immediately on mount
    fetchApartments();

    // Set interval to run every 60 seconds
    const intervalId = setInterval(fetchApartments, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  const availableApartments = allApartments.filter(apartment =>
    !allocations.some(allocation => allocation.unitNo === `${apartment.buildingOrBlock}-${apartment.unitNo}`)
  );

      useEffect(() => {
    // Function to fetch vouchers
    const fetchAllTenants = () => {
      axios.get(API_URL + "GetAllTenants" ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
      })
        .then((response) => {
          setAllTenants(response.data);
          //console.log("Fetched Vouchers:", response.data);
        })
        .catch((error) => {
          //console.error("API error:", error);
        });
    };

    // Call immediately on mount
    fetchAllTenants();

    // Set interval to run every 60 seconds
    const intervalId = setInterval(fetchAllTenants, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);


  
      // Remove tenants that are already allocated
      const availableTenants = allTenants.filter(tenant =>
        !allocations.some(allocation => allocation.allocatedTo === tenant.email)
      );

      useEffect(() => {
    // Function to fetch vouchers
    const fetchApartments = () => {
      axios.get(API_URL + "AllApartmentAllocations" ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
      })
        .then((response) => {
          setAllocations(response.data);
          //console.log("Fetched Vouchers:", response.data);
        })
        .catch((error) => {
          //console.error("API error:", error);
        });
    };

    // Call immediately on mount
    fetchApartments();

    // Set interval to run every 60 seconds
    const intervalId = setInterval(fetchApartments, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);


   

      return (
        <Box m="20px">
          <Header title="Apartments Dashboard" subtitle=" Welcome to the Apartments Dashboard - Allocations, Lease Validations " />
          <Box height="75vh">
            <div className="jobReqArea">
                <h2> Allocate Units </h2>
                <button className="btn btn-primary" onClick={() => setJobForm(true)}> Allocate Unit To Tenant </button>
                
                   
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
                                Allocations
                            </Modal.Title>
                        </ModalHeader>
                        <Modal.Body>
                            <Box sx={{ width: "100%", margin: "auto", mt: 5 }}>

                        
                               <form onSubmit={handleSubmit(onSubmit)}>
                                
                                   <Box>                           
         


                                        {/* Units  */}
                                        <div className="form-group">
                                            <hr />
                                            <label className="form-label"> Apartment Units </label>
                                                <Controller
                                                    name="singleUnit"
                                                    control={control}
                                                    placeholder="Choose Your Area ........"
                                                    render={({ field }) =>  
                                                        <select  {...field} value={singleUnit} 
                                                        onChange={(e) => setSingleUnit(e.target.value)} 
                                                        
                                                        className="form-select" required > 
                                                            <option value=""> Choose The Unit To Allocate ........</option>                                                
                                                              {
                                                                availableApartments.map(house => (
                                                                  <option key={house.apartmentId} value={`${house.buildingOrBlock}-${house.unitNo}`}>
                                                                    {house.buildingOrBlock}-{house.unitNo}-R{house.rentPrice}
                                                                  </option>
                                                                ))
                                                              }                                                                                    
                                                        </select>                               
                                                    }
                                                />       

                                          </div>    


                                                                                  {/* Units  */}
                                        <div className="form-group">
                                            <hr />
                                            <label className="form-label"> Choose Tenant  </label>
                                                <Controller
                                                    name="singleTenant"
                                                    control={control}
                                                    placeholder="Choose Tenant........"
                                                    render={({ field }) =>  
                                                        <select  {...field} value={singleTenant} 
                                                        onChange={(e) => setSingleTenant(e.target.value)} 
                                                        
                                                        className="form-select" required > 
                                                            <option value=""> Choose Tenant.........</option>                                                
                                                           {
                                                              availableTenants.map(house => (
                                                                <option key={house.profileId} value={house.email}>
                                                                  {house.firstName}-{house.lastName}-{house.email}
                                                                </option>
                                                              ))
                                                            }                                                                                   
                                                        </select>                               
                                                    }
                                                />       

                                          </div>

                                            <div className="form-group">
                                                                                 
                               
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
                                                        ) :         'Submit'
                                                        
                                                    }
                                                </button>
                                 

                                            </div>
                        
             
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
                <h2> All New Allocations </h2>
                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <td> Unit No</td>
                            <td> Tenant Email </td>
                            <td> Date Allocated</td>
                            <td> Allocated By </td>
                            <td> Valid Lease Agreement </td>
                        
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allocations.map((house, index) => {
                                return <tr key={index}>
                                    <td> {house.unitNo} </td>
                                    <td> {house.allocatedTo} </td>
                                    <td> {house.allocatedDate} </td>
                                    <td> {house.allocatedBy} </td>
                                    <td> {house.validLease == 1 ? 'Lease Signed' : 'Lease Not Signed'}</td>
                             
                                    {/*<td> <button className="btn btn-success"> Click To Expand For More Details </button></td>*/}

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
        
       


              
           
          </Box>
        </Box>
      );

}

export default Apartments;