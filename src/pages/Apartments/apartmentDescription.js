import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Apartments/apartmentDescription.css';

function ApartmentDescription(){

    const [ apartments, setApartments ] = useState([]);

    const url = "https://localhost:44311/api/controller/GetAllApartments";

    let unitArray = new Array();

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setApartments(response.data);
                console.log(response.data);
                unitArray = JSON.stringify(response.data);
                //console.log("Unit ArraY" + unitArray);
            })
            .catch(error => {
                console.error(error);
            })
    },[]);

    unitArray = apartments;
    
    // console.log("Unit ArraY" + JSON.stringify(unitArray));

    var oneBedCount = 0;
    var twoBedCount = 0;
    var threeBedCount = 0;

    for( let i = 0; i < unitArray.length ; i++ )
    {

        var bedroomNumber = JSON.stringify(apartments[i].bedroomNumber);

        if(bedroomNumber == "1" )
        {
            oneBedCount = oneBedCount + 1;
        }

        if(bedroomNumber == "2")
        {
            twoBedCount = twoBedCount + 1;
        }

        if(bedroomNumber == "3")
        {
            threeBedCount = threeBedCount + 1;
        }     

        // console.log("Bedroom Number : ->" + JSON.stringify(apartments[i].bedroomNumber));

    }
    
    console.log("Three Bed Count " + oneBedCount);
    console.log("Three Bed Count " + twoBedCount);
    console.log("Three Bed Count " + threeBedCount);


    return(
        <div className="container">
            {/* Apartment Summaries */}
            <div className="apartmentDiv">
                <h2> Apartments Summary </h2>
                <div className="aptSum">
                    <div className="row">
                        <div className="col-3 sumCols1">
                            <h5> Total Apartments </h5>
                            <span className="totalNo"> { oneBedCount + twoBedCount + threeBedCount } </span>
                        </div>
                        <div className="col-3 sumCols2">
                            <h5> Total 3 Bedroom Apartments </h5>
                            <span className="totalNo"> { threeBedCount } </span>
                        </div>
                        <div className="col-3 sumCols3">
                            <h5> Total 2 Bedroom Apartments </h5>
                            <span className="totalNo"> { twoBedCount } </span>
                        </div>
                        <div className="col-3 sumCols4">
                            <h5> Total 1 Bedroom Apartments </h5>
                            <span className="totalNo"> { oneBedCount } </span>
                        </div>
                    </div>
                </div>

                <div className="aptListings">
                    <h2> Apartment Listings </h2>

                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <th> Building Or Block No: </th>
                            <th> Unit No: </th>
                            <th> Floor Number </th>
                            <th> Bathroom No: </th>
                            <th> Bedroom No: </th>
                            <th> Balcony </th>
                            <th> Parking No: </th>
                            <th> Action </th>
                        </thead>
                        <tbody>
                            {
                                apartments.map((apt, index) => {
                                    return <tr key={index}>
                                        <td>{apt.buildingOrBlock}</td>
                                        <td>{apt.unitNo}</td>
                                        <td>{apt.floorNumber}</td>
                                        <td>{apt.bathroomNumber}</td>
                                        <td>{apt.bedroomNumber}</td>
                                        <td>{apt.balcony}</td>
                                        <td>{apt.parkingNumber}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary"> Edit </button>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}

export default ApartmentDescription;