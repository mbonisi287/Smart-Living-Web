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

const AccessControl = () => {
  const [ codeArea, setCodeArea ] = useState(false);
  const [ visitorArea, setVisitorArea ] = useState(false);

  const GenerateCode = () =>{
    setCodeArea(true);
    setVisitorArea(false);
  }

  const VisitorHistory = () => {
    setCodeArea(false);
    setVisitorArea(true);
  }

  const { control, handleSubmit, watch, trigger,  formState: { errors }  } = useForm({});

    
      return (
        <Box m="20px">
          <Header title="Access Control" subtitle=" Welcome to the Apartments Dashboard - Allocations, Lease Validations " />
          <Box height="75vh">
           
           <div className="row">
            <div className="col-md-4 visitorBtn">
              <button className="btn btn-primary d-block" 
                onClick={() => GenerateCode()}> Generate Code </button>
              <hr />
              <button className="btn btn-info d-block" 
                onClick={() => VisitorHistory()}> Visitor History </button>
            </div>
            <div className="col-md-8">
              {
                codeArea && 
                <div className="codeArea"> 
                    <h3> Generate Visitor Code </h3>
                    <h4> Please Enter Visitor Details here </h4>
                    <form>
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

                          <div className="form-group">
                            <hr />
                            <button className="btn btn-success" type="submit"> Generate Code </button>
                          </div>


                    </form>
                </div>
              }
              {
                visitorArea &&
                <div className="visitorArea">
                  <h3> Visitor History </h3>
                  <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <td>Date and Time</td>
                        <td>Visitor Name</td>
                        <td>Entry Time</td>
                        <td>Exit Time</td>
                        <td>Visitor Code</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              }
            </div>
           </div>
        
       


              
           
          </Box>
        </Box>
      );

}

export default AccessControl;