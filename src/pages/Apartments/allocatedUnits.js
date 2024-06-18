import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Apartments/allocatedUnits.css';

function AllocatedUnits(){

    const [ allocatedUnits, setAllocatedUnits ] = useState([]);

    const url = "https://localhost:44311/api/controller/AllApartmentAllocations";

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setAllocatedUnits(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    },[]);
    return(
        <div className="container">
            <div className="allocatedDiv">
                <div></div>
                <div className="row">
                    <div className="col-6">
                        <h4> Allocated Units</h4>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <th>Unit No</th>
                                <th>Allocated To</th>
                                <th>Allocated Date</th>
                                <th>Allocated By</th>
                                <th>Valid Lease</th>
                            </thead>
                            <tbody>
                                {
                                    allocatedUnits.map((units, index) => {
                                        return <tr key={index}>
                                            <td>{units.unitNo}</td>
                                            <td>{units.allocatedTo}</td>
                                            <td>{units.allocatedDate}</td>
                                            <td>{units.allocatedBy}</td>
                                            <td>{units.validLease}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">
                        <h4> Un-Allocated Units </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllocatedUnits;