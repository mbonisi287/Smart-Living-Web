import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModalHeader } from 'react-bootstrap';

import '../LeaseAgreement/leaseAgreements.css';

function LeaseAgreement(){

    const [lease, setLease ] = useState([]);

    const url = "https://localhost:44311/api/controller/AllLeaseAgreements";

    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setLease(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[]);

    const backToCreditApps = () => { window.location.href = "CreditApplications/creditApplications"; }

    return(
        <div className="container">
            <div className='leaseDiv'>
                <div className="row leaseHeading">
                    <Button onClick={backToCreditApps}>
                        Back to Home Page - Credit Applications
                    </Button>
                    <h3> All Lease Agreements Below </h3>
                </div>

                {/* Lease Table */}

                
                <div className="row">
                    <table className="table table-striped leaseTable">
                            <thead className="thead-dark">
                                <tr>
                                    <th> Lease Id </th>
                                    <th> Profile Id </th>
                                    <th> Unit No </th>
                                    <th> Rent Price </th>
                                    <th> Start Date  </th>
                                    <th> End Date </th>
                                    <th> Valid Lease </th>
                                    <th> Call To Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lease.map((les, index) => {
                                        return <tr key={index}>
                                            <td>{les.leaseId} </td> 
                                            <td>{les.profileId}</td>
                                            <td>{les.unitNo}</td>
                                            <td>{les.rentPrice}</td>
                                            <td>{les.startDate}</td>
                                            <td>{les.endDate}</td>
                                            <td>{les.validLease}</td>
                                            <td>
                                                <Button 
                                                    variant="btn btn-primary">
                                                    View Lease Agreement 
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                    </table>
                </div>

                {/* Lease Table  End */}


            </div>


        </div>
    )

}

export default LeaseAgreement;