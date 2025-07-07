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

import Button from 'react-bootstrap/Button';
import { API_URL } from "../../global";
import { Label } from "@mui/icons-material";

const LeaseAgreement = () => {
    const [ leases, setLeases ] = useState([]);

    // Loading For Submitting New User
    const [ loading, setLoading ] = useState(false); 
    const [ leaseModal, setLeaseModal ] = useState(false);
    const [ leaseModalData, setLeaseModalData ] = useState([]);
    const [ leaseModalReview, setLeaseModalReview ] = useState(false);

    const [leasePeriod, setLeasePeriod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // Set start date to today
        const today = new Date();
        setStartDate(formatDate(today));

        // Calculate end date based on lease period
        if (leasePeriod === '6' || leasePeriod === '12') {
        const monthsToAdd = parseInt(leasePeriod);
        const end = new Date(today.setMonth(today.getMonth() + monthsToAdd));
        setEndDate(formatDate(end));
        } else {
        setEndDate('');
        }
    }, [leasePeriod]);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    const handleClose = () => setLeaseModal(false);
    const handleCloseReview = () => setLeaseModalReview(false);

        // Missing values on Booking Agent
    const { control, handleSubmit} = useForm();

    const onSubmit = async () => {

    };

    useEffect(() => {
    // Function to fetch vouchers
        const fetchLeases = () => {
            axios.get(API_URL + "AllLeaseAgreements" ,{
                headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
             })
            .then((response) => {
            setLeases(response.data);
            //console.log("Fetched Vouchers:", response.data);
            })
            .catch((error) => {
            //console.error("API error:", error);
            });
        };

        // Call immediately on mount
        fetchLeases();

        // Set interval to run every 60 seconds
        const intervalId = setInterval(fetchLeases, 60000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    const CreateLeaseModal = (les) => {
        setLeaseModalData(les);
        setLeaseModal(true);
    };

  

    return(
        <Box m="20px">
          <Header title="Lease Agreement Dashboard" subtitle="Welcome to the Lease Agreement Dashboard - Manage All Lease Agreements" />
          <Box height="75vh">

            <div className="leaseGen">
                    Request Lease  Agreement
            </div>

            <div className="leaseContainer">
                <h2 className="leaseHeading"> All Lease Agreements </h2>

                <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <td className="tableHeadings"> Unit No </td>
                            <td className="tableHeadings"> Tenant Name </td>      
                            <td className="tableHeadings">  Rent Price </td>  
                            <td className="tableHeadings"> Lease Period </td>             
                            <td className="tableHeadings"> Start Date </td>
                            <td className="tableHeadings"> End Date </td>      
                            <td className="tableHeadings"> Lease Validity</td>
                            <td className="tableHeadings"> Generate  </td>
                            <td className="tableHeadings"> Review </td>
                           
                            
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leases.map((les, index) => {
                                return <tr key={index}>
                                    <td> {les.unitNo} </td>
                                    <td> {les.profileId} </td>
                                    <td> {"R "+les.rentPrice} </td>
                                    <td> {les.leasePeriod + " Months"}</td>
                                    <td> {les.startDate == "0001-01-01" ? 'N/A' : les.startDate } </td>
                                    <td> {les.endDate == "0001-01-01" ? 'N/A' : les.endDate}</td>
                                    <td> {les.validLease == 0 ? 'Not Valid' : 'Valid'} </td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => CreateLeaseModal(les)}> Generate Lease Agreement </button>

                                    </td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => setLeaseModalReview(true)}> View Lease Agreement </button>

                                    </td>

                                    

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
            <Modal
                show={leaseModal}
                handle={handleClose}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}>
                <ModalHeader>

                </ModalHeader>
                <Modal.Body>
                    <h3> Lease Form</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group row">
                            <label className="form-label"> Unit No: {leaseModalData.unitNo}</label>
                        </div>

                        <div className="form-group row">
                            <label className="form-label"> Tenant Email: {leaseModalData.profileId} </label>
                        </div>

        

                        <div className="form-group row">
                            <div className="col-12 col-lg-12 col-xl-12">
                                <label className="form-label"> Lease Period: </label>
                                <select value={leasePeriod}
                                    onChange={(e) => setLeasePeriod(e.target.value)}
                                    className="form-select">
                                    <option value=""> Choose Lease Period.... </option>
                                    <option value="6"> 6 Months </option>
                                    <option value="12"> 12 Months </option>
                                </select>
                            </div>


                        </div>

                        <div className="form-group row">
                            <div className="col-6 col-lg-6 col-xl-6">
                                <label className="form-label"> Start Date: </label>
                                <input className="form-select" value={startDate} readOnly />
                            </div>

                            <div className="col-6 col-lg-6 col-xl-6">
                                <label className="form-label"> End Date: </label>
                                <input className="form-select" value={endDate} readOnly />
                            </div>
                        </div>

                    

                        <div className="mt-3">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Generate Lease Agreement
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={handleClose}> Close </button>
                </Modal.Footer>
              
            </Modal>

            <Modal
                show={leaseModalReview}
                handle={handleCloseReview}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}>
                <ModalHeader>

                </ModalHeader>
                <Modal.Body>
                    Lease Details
                    
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn" onClick={handleCloseReview}> Close </button>
                </Modal.Footer>
              
            </Modal>

          </Box>
        </Box>
        
    )


}

export default LeaseAgreement;