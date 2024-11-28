import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
/*import { DatePicker } from "react-rainbow-components";*/
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import logo from '../../Images/clubhouse.jpg';

//import '../pages/ClubHouse/club-house.css';

import '../../pages/ClubHouse/clubHouse.css';

function ClubHouse() {

    const [booking, setBookings] = useState([]);

    const url = "https://localhost:44311/api/controller/GetAllBookings";

    useEffect(() => {
        axios.get(url)
            .then(response => {
                // If the defualt appears this indicates that no payment has been made
                
                console.log(response.data);
                setBookings(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });           
    }, []);

    function actionRefund (bookingId) {
        alert("Refund Will be processed using booking Id : " + bookingId);
        

    }

    const userEmailDefault = localStorage.getItem('key');
    let userEmail = userEmailDefault.replaceAll("\"", "").toString();

    const [ formData, setFormData ] = useState({
        profileId: userEmail,
        bookingDate: "",
        bookingPurpose: "",
        guestNo: "",
        paymentConfirmation: false,
        paymentDate: "",
        refundDate: "",
        refundStatus: 4,
        refundProcessedBy: "none",
    });

    const handleChange = event => {
        setFormData ({ ...formData, [event.target.name] : event.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
    }


    return (
        <div class="container">
            <div>
                <h2 className='booking-h2'> Make a Booking for the Club House </h2>
            </div>

            <div>
                {/* Form for Booking the club house */}
                {/* Show date calender for available dates  */}
                <div className='row booking-row'>
                    <div className='col-lg-6'>
                        <img src={logo} alt="Logo" height={350} width={400} />
                    </div>
                   <div className='col-lg-6'>                       
                        <div className='row deposit-row'>                        
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Check For available dates
                                </label>

                                <label>
                                    Number of Expected Guests
                                    <input
                                    />
                                </label>
                            </form>
                        </div>
                    </div>
                </div>

            </div>



            <div>
                <h2> Previous Bookings </h2>
            </div>
            <div class="row">
                <table class="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th> Booking Date </th>
                        <th> User Email </th>
                        <th> Booking Purpose </th>
                        <th> Payment Date </th>
                        <th> No: Of Guests  </th>
                        <th> Call To Action </th>
                    </tr>
            
                    </thead>
                    <tbody>
                        {
                            booking.map((book, index) =>  {
                                return<tr key={index}>
                                    {/* Td for Booking ID */}
                                    <td>{book.bookingDate}</td>
                                    <td>{book.profileId}</td>
                                    <td>{book.bookingPurpose}</td>
                                    <td>{book.paymentDate}</td>
                                    <td>{book.guestNo}</td>
                                    <td>
                                        <button 
                                            onClick={() => actionRefund(book.bookingId)} 
                                            class="btn btn-primary"> 
                                            Action Refund Process 
                                        </button>
                                    </td>
                                </tr>
                                   
                            })

        
                        }
                    

                    </tbody>
                </table>


            </div>
        </div>
    
      
    )
  }

  export default ClubHouse;