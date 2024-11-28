import React, { useState, useEffect , Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../Tenant/tenantDocuments.css';

function tenantDocuments(){
    /* Api Calls for all Documents */
    
    //const [ leaseDoc, setleaseDoc ] = useState([]);
    
    return(
        <div className="container">
            <div className="row"> 
                <div className="leaseDocsHeading">
                    <h2> Tenant Lease Agreements </h2> 
                </div> 
            </div>

            <div className="row">
                <div className="col-6 "> 
                    <div className="currentLeaseAgreement">
                        <h4> Current Lease Agreement </h4> 
                        <span className="startDate"> Commencement date: </span>
                        <span className="endDate"> Expiry Date: </span>
                        <span className="renewalNote"> 
                            NB: You will be notified 60 days before your lease expires. 
                            Renewal option will be made available within the 60 days.                        </span>
                        <button className="btn btn-primary disabled"> Renew Lease Agreement </button>
                    </div>
                </div>
                <div className="col-6 ">
                    <div className="previousLeaseAgreements">
                    <h4> Previous Lease Agreements</h4>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th> Start Date </th>
                                    <th> End Date </th>
                                    <th> Duration </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                        </table> 
                    </div> 

                </div>
            </div>

        </div>
    )

}

export default tenantDocuments;