import React, { useState} from 'react';
import { ModalHeader } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import '../pages/newTenant.css';

export default function NewTenant() {
  /*  API for the Form */ 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Function to handle the consent agreement */

  const handleAgreement = () => setShow(false);

  const [validated, setValidated] = useState(false);

  /*const[state, setState ] = useState({ name: ""});

  const handleChange = event => {
    this.setState({ name: event.target.value})
  }*/

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if(form.checkValidity() === false){
      event.preventDefault();
      event.stopPropagation();
    }

    /*const user = {
      name: this.state.name
    };

    axios.post('https://jsonplaceholder.typicode.com/users', {user})
    .then(res=> {
      console.log(res);
      console.log("Code sent");
      console.log(res.data);
    })*/

    setValidated(true);
  }

  const [visible, setVisible ] = useState(true);

  function toggleShow(){
    setVisible(!visible);
  }
  const [visibleAddress, setVisibleAddress ] = useState(false);
  function toggleShowAddressDetails(){
    setVisibleAddress(!visibleAddress);
  }

  const [visibleWork, setVisibleWork ] = useState(false);
  function toggleShowWorkDetails(){
    setVisibleWork(!visibleWork);
  }

  var buttonText = visible ? "Hide Personal Details" : "Show Personal Details"; 
  var buttonAddressDetails = visibleAddress ? "Hide Address Details" : "Show Address Details";
  var buttonWorkDetails = visibleWork ? "Hide Work Details" : "Show Work Details";


     return (
      <div class="container"> 
        <h2> Welcome to our Smart Living's Prospective Tenant application process </h2>
        <p> Please fill in the fields beloww </p>  

        <Button variant="primary" onClick={handleShow}> 
            Please Click this button to read the Consent Information before filling in the fields
        </Button>

        <Modal
          show={show}
          handle={handleClose}
          backdrop="static"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={false}
          >
            <ModalHeader closeButton>
              <Modal.Title> Smart Living Rental Property Terms and Conditions </Modal.Title>
            </ModalHeader>
            <Modal.Body>
               <h4>1. Introduction: </h4>
              Welcome to Smart Living, a property management solution developed and owned by Mdot Creatives. Before you proceed with the application process, please carefully read and understand the terms and conditions outlined below.

              <h4>2. Data Collection: </h4>
              To assess your eligibility for our rental properties, Smart Living requires you to submit your ID and Passport details for credit checks. By providing this information, you agree to the terms and conditions outlined herein.

              <h4>3. Privacy and Protection: </h4>
              We understand the importance of safeguarding your personal information. All data submitted for credit checks will be handled with the utmost confidentiality and in compliance with the South African Protection of Personal Information Act (POPIA).

              <h4>4. Third-Party Involvement: </h4>
              Mdot Creatives will conduct the credit checks and credit ratings through a trusted organization, which is a verified partner with the Home Affairs and the National Credit Bureau. Rest assured, your personal data will not be sold or shared with any third-party organizations or marketing agencies.

              <h4>5. Purpose of Data Usage: </h4>
              The information collected will be used solely for the purpose of assessing your creditworthiness for the rental property application. It will not be used for any other purposes without your explicit consent.

              <h4>6. Security Measures: </h4>
              We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction. Our commitment is to ensure the confidentiality and integrity of your personal information.

              <h4>7. Access to Information: </h4>
              You have the right to request access to the personal information we hold about you. If you believe that any information we are holding on you is incorrect or incomplete, please contact us promptly, and we will promptly correct any inaccuracies.

              <h4>8. Duration of Data Retention: </h4>
              Your personal information will be retained only for the duration necessary to fulfill the purposes outlined in this agreement. After this period, it will be securely disposed of in accordance with applicable laws and regulations.

              <h4>9. Consent: </h4>
              By submitting your ID and Passport details, you provide explicit consent for Mdot Creatives to perform credit checks and credit ratings through the trusted organization mentioned above.

              <h4>10. Acceptance of Terms: </h4>
              By proceeding with the application process, you acknowledge that you have read, understood, and agreed to the terms and conditions outlined in this document.

              <h4>11. Changes to Terms: </h4>
              Mdot Creatives reserves the right to modify or amend these terms and conditions at any time. Any changes will be communicated to you through the provided contact information.

              <h4>Contact Information: </h4>
              If you have any questions or concerns regarding these terms and conditions, please contact us at [info@smart-living.co.za].
              <br />
              Thank you for choosing Smart Living - where your privacy and security are our top priorities.

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}> Close </Button>

            </Modal.Footer>
        </Modal>

        <div className="component-form">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

  <div className="component-container">
    <div className="row personal-row">
      <div className="col-lg-6"><h2> Personal Details </h2></div>
      <div className="col-lg-6"><button className="btn btn-primary btn-large" onClick={toggleShow}>{buttonText}</button></div>
    </div>
    <div className="row form-row">
        { visible &&                        
          <div className="row personal-details-component"> 
          <div className="col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              {/*<Form.Control onChange={this.handleChange} type="text" placeholder="Enter your name" />*/}
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter your surname" />
            </Form.Group>
          </div> 
          <div className="col-lg-6">
          <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
          </div> 
          <div className="col-lg-6">
          <Form.Group className="mb-3" controlId="formBasicNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" placeholder="Enter Your Phone Number" />
                </Form.Group>
          </div> 
          <div className="col-lg-6">
          <Form.Group className="mb-3" controlId="formBasicIdNumber">
                  <Form.Label>ID Number</Form.Label>
                  <Form.Control type="number" placeholder="Enter your ID Number" />
                </Form.Group> 
          </div> 
       
          </div>
        }

    </div>               
  </div>

  <div className="address-details-component">
    <div className="row address-row">
      <div className="col-lg-6 "><h2> Address Details </h2></div>
      <div className="col-lg-6 "><button className="btn btn-primary" onClick={toggleShowAddressDetails}>{buttonAddressDetails}</button> </div>                  
    </div>
    <div className="row form-row">
      {
        visibleAddress && 
        <div>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Unit No and Building Name/House Number</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> Street Address </Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> Surburb</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> City </Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> Postal Code </Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group> 
        </div>
        }
    </div>              
  </div>

  <div className="work-details-component"> 
        <div className="row work-row">
          <div className="col-lg-6"><h2> Work Details</h2></div>
          <div className="col-lg-6"><button className="btn btn-primary" onClick={toggleShowWorkDetails}>{buttonWorkDetails}</button> </div>
        </div>
        <div className="row form-row">
          {
            visibleWork && 
            <div>
              <Form.Label> Select Type of Employment </Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Type of Employment </option>
                <option value="1"> Self Employed</option>
                <option value="2">Employed</option>
                <option value="3">Student</option>
              </Form.Select>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> Employer's Name/ Name of Business </Form.Label>
                <Form.Control type="text" placeholder="Enter name of Employer or Business " />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> Employement Address/ Business Address </Form.Label>
                <Form.Control type="text" placeholder="Enter your Employement Address/ Business Address" />
              </Form.Group>
            </div>
          }
        </div>              
  </div>           


  <Form.Group className="mb-3">
    <Form.Check
      required
      label="Agree to Terms and Conditions"
      feedback="You must agree to the Terms and Conditions before submitting"
      feedbackType="invalid"
    />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Form>

        </div>

  
                
      </div>   
      
    )
}