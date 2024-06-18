import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import '../pages/complaints.css'

function complaints(){

    return(
        <div className="container">
            <h2> Log A Complaint </h2>

            <div className="row">
                <div className="complaintForm">
                    <Form>
                        <Form.Label> Select the Type of Complaint </Form.Label>
                            <Form.Select aria-label="Default select example">
                                        
                                <option>Select Option </option>
                                <option value="1"> Noise Disturbance  </option>
                                <option value="2"> Parking Complaint </option>
                                <option value="3"> Air Pollution </option>
                            </Form.Select>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label> Date of Incident </Form.Label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Select a date" disableFuture />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}                          
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label> Estimated Time of Incident </Form.Label>
                                    {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
                                
                                <Form.Select aria-label="Default select example">
                                        
                                        <option>Select Time </option>
                                        <option value="1"> 00hr 00 - 00hr 59  </option>
                                        <option value="2"> 01hr 00 - 01hr 59  </option>
                                        <option value="3"> 02hr 00 - 02hr 59  </option>
                                        <option value="3"> 03hr 00 - 03hr 59  </option>
                                        <option value="3"> 04hr 00 - 04hr 59  </option>
                                        <option value="3"> 05hr 00 - 05hr 59 </option>
                                        <option value="3"> 06hr 00 - 06hr 59  </option>
                                        <option value="3"> 07hr 00 - 07hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                        <option value="3"> 08hr 00 - 08hr 59  </option>
                                        <option value="3"> 09hr 00 - 09hr 59  </option>
                                    
                                    </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label> Brief description of Complaint </Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                            {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
                                        
                                    </Form.Group>
                                    
                                    <Button variant="primary" type="submit">  Submit Complaint </Button>
                    </Form>
                </div>

            </div>

            <div className="row">
                <div className="complaintNotes">
                    <h4> Please Note </h4>
                        <p> 
                            We understand the importance of promptly addressing and resolving complaints to maintain a harmonious 
                            living environment within our community. To ensure that all concerns are dealt with effectively and fairly, 
                            we have established the following procedures for handling complaints:
                        </p>
                            
                        <p>
                            Submission of Complaints: Residents are encouraged to submit their complaints through the designated 
                            channels provided by the management. This could include email, dedicated complaint forms, or direct 
                            communication with the management office.
                        </p>  
                        <p>    
                            Initial Assessment: Upon receipt of a complaint, our management team will conduct an initial assessment to
                            determine the nature and severity of the issue. This step helps in prioritizing complaints and allocating 
                            resources accordingly.
                        </p>    
                        <p>    
                            Investigation Process: For complaints other than parking and noise issues, which have shorter turnaround times, 
                            a dedicated team will be dispatched to investigate the incident thoroughly. This team will gather evidence, 
                            interview relevant parties, and assess the situation from all angles to ensure a comprehensive understanding 
                            of the matter.
                        </p>    
                        <p>    
                            Fair Ruling: After a thorough investigation, the management will carefully review the findings and consider 
                            all relevant factors before reaching a decision. The ruling will be fair and impartial, aiming to resolve the 
                            complaint in the best interest of all parties involved.
                        </p>
                        <p>    
                            Communication of Decision: Once a decision has been made, the management will promptly communicate it to the complainant. 
                            This includes providing explanations for the decision and outlining any necessary actions to be taken.
                        </p>   

                        <p>    
                            Follow-up and Feedback: We value feedback from our residents and recognize the importance of follow-up after resolving 
                            a complaint. Residents are encouraged to provide feedback on the handling of their complaints, allowing us to continually 
                            improve our processes and services.
                        </p>    
                        <p>    
                            Turnaround Time: While parking and noise complaints are typically resolved within a shorter timeframe due to their 
                            immediate impact on residents' quality of life, other complaints may take longer to investigate thoroughly. However, 
                            we are committed to ensuring that all complaints are addressed in a timely manner, with regular updates provided to the 
                            complainants throughout the process.
                        </p>    
                        <p>
                            Our goal is to foster a supportive and respectful community where all residents feel heard and valued. We appreciate your 
                            cooperation in adhering to these complaint handling procedures and welcome any suggestions for improvement.
                        
                        </p>
                </div>
            </div>

        </div>

    )
}

export default complaints; 