import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../pages/club-house.css';

export default function clubHouse() {
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

                    </div>
                    <div className='col-lg-6'>
                        <Button variant="primary" > Pick a Date </Button>
                        <div className='row deposit-row'>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                        {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                        {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>

                                <Form.Label>Bank Name</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    
                                    <option>Select Bank </option>
                                    <option value="1"> Capitec </option>
                                    <option value="2"> Absa </option>
                                    <option value="3"> African  Bank </option>
                                    <option value="3"> FNB </option>
                                    <option value="3"> Discovery Bank </option>
                                    <option value="3"> Nedbank </option>
                                    <option value="3"> Stanbic  </option>
                                    <option value="3"> Tyme Bank </option>
                                    <option value="3"> FirstRand Bank </option>
                                    <option value="3"> Grindrod Bank </option>
                                    <option value="3"> HBZ Bank </option>
                                    <option value="3"> Investec Bank </option>
                                    <option value="3"> Mercantile Bank </option>
                                    <option value="3"> Rand Merchant Bank </option>
                                    <option value="3"> RMB Private Bank  </option>
                                    <option value="3"> South African Bank of Athens Limited </option>
                                    <option value="3"> Sasfin Bank Ltd </option>
                                    <option value="3"> Standard Bank of SA </option>
                                    <option value="3"> Wesbank </option>
                                    <option value="3">Standard Bank </option>
                                </Form.Select>

                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label> Bank Account Number </Form.Label>
                                        {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                                
                                <Button variant="primary" type="submit">  Pay Deposit </Button>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>



            <div>
                <h2> Previous Bookings </h2>
            </div>
        </div>
    
      
    )
  }