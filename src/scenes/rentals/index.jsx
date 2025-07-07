import { Box, useTheme } from "@mui/material";
import { Header } from "../../components";
import { useState, useRef , useEffect} from 'react';
import axios from "axios";



import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { API_URL } from "../../global";

import payIcon from '../../assets/images/operation.png';
import eftIcon from '../../assets/images/Instant-Eft.png';

const Rentals = () => {

    const [ allRentals, setAllRentals ] = useState([]);
    const [ currentRent, setCurrentRent ] = useState([]);

    useEffect( () => {

        /*include code to check if this admin or a normal user 
        * if user pass the user name to the url
        */
        axios.get(API_URL + "GetAllRents")
        .then(response =>{
            setAllRentals(response.data);
            console.log(response.data);
        })
        .catch(error =>{
            console.error(error);
        });
    },[]);

    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    const formattedDate = `${month}`;
    const currentDate = `${day} ${month} ${year}`;

      return (
        <Box m="20px">
          <Header title="Rental Dashboard" subtitle=" Welcome to the Rental Dashboard - rentals, rental statements" />
          <Box height="75vh">
            <div className="">
                <h1> Tenant Rentals</h1>
                                <div className="row">
                    <div className="col-6 col-lg-6">
                        <div className="rentDivSect">
                            <span className="rentP"> Rent Due For {formattedDate} </span>
                            <span className="rentAmt">  R 200 000 </span>
                            <button className="btn btn-primary"> Pay Now </button>
                            <img className="snapShotImg" src={payIcon} alt="Logo"/>
                        </div>
                    </div>

                    <div className="col-6 col-lg-6">
                        <div className="rentDivSect">
                            <p> Payment Options Available </p>
                            <img class="paymentImages" src={eftIcon} alt="Logo" height={100} width={200} />
                           
                        
                        </div>
                    </div>

                </div>


                <div className="row">
                    <div className="col-4 col-lg-4">
                        <div className="rentDivSect">
                            <span className="rentP"> Expected Rentals  </span>
                            <span className="spanDate"> Total sum of money expected for the month of {formattedDate} </span>
                            <span className="rentAmt">  R 200 000 </span>
                            <img className="snapShotImg" src={payIcon} alt="Logo"/>
                        </div>
                    </div>

                    <div className="col-4 col-lg-4">
                        <div className="rentDivSect">
                            <span className="rentP"> Total Rentals Paid  </span >
                            <span className="spanDate"> {currentDate} </span>
                            <span className="rentAmt">  R 125 000  / R200 000</span> 
                            <img className="snapShotImg" src={payIcon} alt="Logo"/>
                        </div>
                    </div>

                    <div className="col-4 col-lg-4">
                        <div className="rentDivSect">
                            <span className="rentP"> Total Outstanding Rentals :   </span>
                            <span className="spanDate"> {currentDate}  </span>
                            <span className="rentAmt">  R 75 000  /  R200 000</span>
                            <img className="snapShotImg" src={payIcon} alt="Logo"/>
                        </div>
                    </div>

                </div>
            </div>

            <div className="rentalSect">
                <div className="row">
                    <div className="col-6 col-lg-6">
                        <h4> Recent Rental Payments </h4>
                        
                    <div className="rentTable">  
                        <table class="table table-striped">
                            <thead class="thead-dark">
                                <tr>
                                    
                                    <th> Tenant Id</th>
                                    <th> Unit No </th>
                                    <th> Due Date </th>
                                    <th> Payment Date </th>
                                    <th> Rent Price (R) </th>
                                    <th> Payment Status </th>
                                    <th> Action  </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                // create two tables depending on where the user is admin or a normal tenant
                                allRentals.map((rent, index) => {
                                    return <tr key={index}>
                                        
                                        <td>{rent.profileId}</td>
                                        <td>{rent.unitNo}</td>
                                        <td>{rent.dueDate}</td>
                                        <td>{rent.paymentDate == '2020-01-01' ? '-' : rent.paymentDate}</td>
                                        <td>{rent.rentPrice}</td>
                                        <td>{rent.paymentStatus == 0 ? 'Owing' 
                                        : rent.paymentStatus == 1 ? 'Paid' : ''}</td>
                                        <td><button className="btn btn-primary"> Generate Rental Statement </button></td>
                                        
                                    </tr>
                                })
                            }
                            </tbody>
                        </table> 
                    </div>
                    </div>
                    <div className="col-6 col-lg-6">
                        <h4> Outstanding Rental Payments </h4>                        
                    </div>
                </div>
            </div>
           
          </Box>
        </Box>
      );

};

export default Rentals;