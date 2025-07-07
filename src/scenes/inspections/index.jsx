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

const Inspections = () => {

    const [ incomingInspection, setIncomingInspection ] = useState(false);
    const [ inspectionArea, setInspectionArea ] = useState(false);
    const [ loadingSubmit, setLoadingSubmit] = useState(false);
    const [ fileSizeErrorModal, setFileSizeErrorModal ] = useState(false);

    const [ inspectionsList, setInspectionsList ] = useState([]);

    const [ conditionCheck, setConditionCheck ] = useState('');

    const [ fileOne, setFileOne ] = useState('');
    const [ fileTwo, setFileTwo ] = useState('');
    const [ fileThree, setFileThree ] = useState('');
    const [ additionalImages, setAdditionalImages ] = useState(false);
    const [ additionalInfo, setAdditionalInfo ] = useState(false);

    const roomComponent = ["Floor", "Walls", "Ceiling", "Plugs", "Cardboards", "Geysers", "Doors", "Sinks", "Taps"];
    const rooms = [ "Living-Room", "Kitchen", "Bathroom-And-Toilet", "Bedroom-1", "Bedroom-2"];

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

    const handleConditionCheck = (conditionCheck) => {
        //console.log("Choosen Condition is now" + conditionCheck);

        if(conditionCheck == 1 || conditionCheck == '')
        {
            setAdditionalInfo(false);
            console.log("Choosen Condition is now good");
        } else if (conditionCheck == 2) {
            setAdditionalInfo(true);
            console.log("Choosen Condition is now bad");
        }

    };

    const { control, handleSubmit, watch, trigger,  formState: { errors }  } = useForm({
        defaultValues: { name: "", surname:"", email: "", docType:"", 
            identityNoPassportNo: "", phoneNo:"", fileName: ""
            // altContactNo:"", bookingRef:"", bookingDate:"", departAirport: "", 
            // arrivalAirport:"", travelDate: "",
            //voucherNo: "", voucherAmount:"" 
        },
    });

    useEffect(() => {
    axios.get(API_URL + "GetAllInspections" , {
                  headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    })
      .then(response =>  {
        setInspectionsList(response.data);

        
      }) // Assume data is an array of { id, name }
      .catch(error => console.error('Error fetching data:', error));      
  }, []); 

    return(
       <Box m="20px">
          <Header title="Inspections Dashboard" subtitle=" Welcome to the Inspections Dashboard - Incoming and Outgoing Checks" />
          <Box height="75vh">

            <div className="inspectionContainer">
                <div className="row">
                    <div className="col-6 col-lg-6 incomingRow">
                        <h2> Incoming Inspections</h2>
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="">
                                <tr>
                                    <td> Unit No </td>                                    
                                    <td> Inspection Date </td>
                                    <td> Inspection Type </td>
                                    <td> Status </td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                inspectionsList.map((ten, index) => {
                                    return <tr key={index}>
                                        <td> {ten.unitNo} </td>
                                        <td> {ten.inspectionDate} </td>
                                        <td> {ten.inspectionType} </td>
                                        <td> {ten.inspectionStatus} </td>
                                    </tr>
                                 })
                            }

                            </tbody>
                        </table>
                        <button className="btn btn-primary" onClick={() => setInspectionArea(true)}> Start Incoming Inspection  </button>

                    </div>
                    <div className="col-6 col-lg-6 outgoingRow">
                        <h2> Out Going Inspections </h2>
                    </div>
                </div>
            </div>

            { 
                inspectionArea && 
                <>

                    <div className="incomingInspection">
                
                        <button className="btn btn-success" onClick={() => setIncomingInspection(true)}> Begin Inspection Checklist </button> | 
                        <button className="btn btn-danger" onClick={() => setIncomingInspection(false)}> Close Inspection Checklist </button>
                        {/* Incoming Inspection Area */}
                        {
                            incomingInspection &&
                            <>
                                <div className="incomingChecklist">
                                    <h5> Please follow the next steps to do the Incoming Inspection </h5>
                                    <form>
                                        <div className="form-group checklistFormItem">
                                            <label className="form-label"> Room Component </label>
                                            <select className="form-select">
                                            { roomComponent.map(item =>(
                                                <option value={item}> {item} </option>
                                            ))}
                                            </select>
                                        </div>

                                        <div className="form-group checklistFormItem">
                                            <label className="form-label"> Room </label>
                                            <select className="form-select">
                                            { rooms.map(item =>(
                                                <option value={item}> {item} </option>
                                            ))}
                                            </select>
                                        </div>

                                        <div className="form-group checklistFormItem">
                                            <label className="form-label"> Condition </label>
                                            <Controller
                                                name="conditionCheck"
                                                control={control}
                                                placeholder="Please select the condition of the item being checked"
                                                render={({ field }) =>  
                                                    <select  {...field} value={conditionCheck} 
                                                    onClick={handleConditionCheck(conditionCheck)}
                                                    onChange={(e) => setConditionCheck(e.target.value)} 
                                                    
                                                        className="form-select" required> 
                                                    <option value=""> Choose condition </option>                              
                                                    <option value="1"> Good </option>
                                                    <option value="2"> Bad </option>                                
                                                    </select>                             
                                                }
                                            />
                                        
                                        </div>
                                        <hr />
                                            
                                        { 
                                            additionalInfo && 
                                            <>
                                                {/* Additional Description */}
                                                <div className="textChecklist">
                                                    <label className="form-label"> Describe in brief the condition of the item being checked against </label>
                                                    <textarea className="form-control" type="textarea" rows="">                                  
                                                    </textarea>
                                                </div>
                                                
                                                {/* Additional Images */}
                                                <div className="row">
                                                        <div className="col-lg-4 addImageDiv">
                                                            {/* Removed the "Required" attribute */}
                                                            <label className="form-label">  Attach Supporting Image(s)*  </label>
                                                            <input required type="file" 
                                                                    className="form-control" aria-describedby="Upload"
                                                                    ref={inputFile}
                                                                    accept=".png/.jpg"
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
                                                            <button className="btn btn-info block" onClick={() => setAdditionalImages(true)}> Click here to Add Two Additional Images</button>
                                                        </div>

                                                        { 
                                                            additionalImages && 

                                                            <>

                                                                <div className="col-lg-4 addImageDiv">
                                                                    {/* Removed the "Required" attribute */}
                                                                        <label className="form-label">  Attach Supporting Image 1  </label>
                                                                        <input required type="file" 
                                                                                className="form-control" aria-describedby="Upload"
                                                                                ref={inputFile}
                                                                                accept=".png/.jpg"
                                                                                onChange={(event) => {
                                                                                    
                                                                                if(event.target.files && event.target.files[0] && event.target.files[0].type ==='application/png/jpg'){
                                                                                    if(event.target.files[0].size < 5 * 1024 * 1024 ){
                                                                                        setFileTwo(event.target.files[0])
                                                                            
                                                                                    }else{
                                                                                    setFileSizeErrorModal(true);
                                                                                    //alert("Please select a file that is less than 2MegaBytes");
                                                                                    
                                                                                    handleReset();
                                                                                    //alert("Form field will be automitically reset for a new upload");
                                                                                    }
                                                        
                                                                                }
                                                                        }} />
                                                                </div>

                                                                <div className="col-lg-4 addImageDiv">
                                                                {/* Removed the "Required" attribute */}
                                                                <label className="form-label">  Attach Supporting Image 2  </label>
                                                                <input required type="file" 
                                                                        className="form-control" aria-describedby="Upload"
                                                                        ref={inputFile}
                                                                        accept=".png/.jpg"
                                                                        onChange={(event) => {
                                                                            
                                                                        if(event.target.files && event.target.files[0] && event.target.files[0].type ==='application/png/jpg'){
                                                                            if(event.target.files[0].size < 5 * 1024 * 1024 ){
                                                                                setFileThree(event.target.files[0])
                                                                    
                                                                            }else{
                                                                            setFileSizeErrorModal(true);
                                                                            //alert("Please select a file that is less than 2MegaBytes");
                                                                            
                                                                            handleReset();
                                                                            //alert("Form field will be automitically reset for a new upload");
                                                                            }
                                                
                                                                        }
                                                                }} />
                                                                <button className="btn btn-danger" onClick={() => setAdditionalImages(false)}> Close Additional Images </button>
                                                                </div>   
                                                                
                                                            </>
                                                        }
                                                

                                                </div>
                                            
                                            </>
                                        }


                                        <div className="form-group">
                                            <br /><br />

                                            
                                            <button className="stepsBtn btn-lg btn btn-primary" type="submit"> 
                                            { loadingSubmit ? (
                                                    <>
                                                    Submitting...
                                                    <span
                                                        className="spinner-border spinner-border-sm ms-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    </>
                                                ) : 'Submit' }
                                            </button> 

                                        </div>
                                    </form>

                                </div>
                            </>
                        }               
                    </div>
                </>
            }
    

            <div className="outgoingInspection">

            </div>


              
           
          </Box>
        </Box>
    )

}
export default Inspections;