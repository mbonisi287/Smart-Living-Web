import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import '../Apartments/allocatedUnits.css';

function AllocatedUnits(){

    const [ allocatedUnits, setAllocatedUnits ] = useState([]);

    const url = "https://localhost:44311/api/controller/AllApartmentAllocations";
    let allocatedApartments = new Array();
    let unAllocatedApartments = new Array();

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setAllocatedUnits(response.data);
                console.log(response.data);

                //allocatedApartments = JSON.stringify(response.data);
                //console.log("Allocated Apartmentsssss" + allocatedApartments);
                //unAllocatedApartments = JSON.stringify(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    },[]);

    // Function to show allocated Units
    for( let i = 0; i < allocatedUnits.length ; i++)
    {
        console.log("Unit Allocation ....." + allocatedUnits[i].activeAllocation);
        var actAlloc = JSON.stringify(allocatedUnits[i].activeAllocation)
        if( actAlloc === 'true')
        { 
            allocatedApartments.push(allocatedUnits[i]);           
        }

    }
    // Use state to make the array accessible 

    console.log("Allocated Apartments is now" + JSON.stringify(allocatedApartments));

    // Function to show Un - Allocated Units
    for( let a = 0; a <allocatedUnits.length ; a++)
    {
        //invalid allocation
        var expAlloc = JSON.stringify(allocatedUnits[a].activeAllocation)
        if(expAlloc == 'false')
        {
            unAllocatedApartments.push(allocatedUnits[a]);                
        }    
    }
    console.log("Allocated Apartments" + allocatedApartments);
    console.log("Free Apartments" + unAllocatedApartments);

    const backToHome = () => { window.location.href = "/"}


    return(
        <div className="container">
            <div className="allocatedDiv">
                <div className="allocationsHeading">
                    <Button onClick={backToHome}> 
                        Return to Home Page - 
                    </Button>
                    <h3> All Unit Allocations </h3>
                </div>
                <div className="row">
                    <div className="col-6 occupiedApts">
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
                                    unAllocatedApartments.map((units, index) => {
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


                    <div className="col-6 freeApts">
                        <h4> Un-Allocated Units </h4>
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
                                    allocatedApartments.map((units, index) => {
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
                </div>
            </div>

            {/* Previous Tenant History 
            * Previously Allocated Units - Search Functionality to show which units they 
            * stayed. The number of months they stayed for in that unit
            * 
            *
            */}
        </div>


    )
}

export default AllocatedUnits;