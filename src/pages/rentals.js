import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ModalHeader } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../pages/rentals.css';

import logo from '../Images/clubhouse.jpg';
import eft from '../Images/Instant-Eft.png';
import visa from '../Images/visa-mastercard.png';

function Rentals() {

  const [ currentRent, setCurrentRent ] = useState([]);

    var userProfileId = "mbonisi@mdotcreatives.co.za"

    const urlCurrentRent = "https://localhost:44311/api/controller/GetUserRent?ProfileId=mbonisi@mdotcreatives";

    useEffect(() => {
        axios.get(urlCurrentRent)
            .then(response => {
                
                const oneRent = response.data;
                console.log("Rent for Mbonisi :" + JSON.stringify(oneRent[0]));
                setCurrentRent(oneRent[0]);
                
                
            })
            .catch(error=>{
                console.log(error);
            });

    }, []);

    const [ allRentals, setAllRentals ] = useState([]);

    /* Logic to determine is the user is Admin or User. 
    * If Admin => url applies here
    * If User => url gets all the user's previous rent rentals from the other months
    */
    
    const urlRentals = "https://localhost:44311/api/controller/GetAllRents";
    useEffect( () => {

        /*include code to check if this admin or a normal user 
        * if user pass the user name to the url
        */
        axios.get(urlRentals)
        .then(response =>{
            setAllRentals(response.data);
            console.log(response.data);
        })
        .catch(error =>{
            console.error(error);
        });
    },[]);

    //Modal to handle showing previous rental payments for a single tenant
    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false); 

    const HandleShow = () => setShow(true);

    // Redirect To Payfast 
    const PayfastRent = () =>  { ;}

    const [rent, setRent ] = useState(
        {
            rentId: currentRent.rentId,
            profileId: currentRent.profileId,
            unitNo: currentRent.unitNo,
            rent: currentRent.unitNo,
            dueDate: currentRent.dueDate,
            paymentDate: currentRent.paymentDate
        }
    );

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const url = "https://localhost:44311/api/controller/OnceOff"
            //const rentJson = JSON.stringify(Object.assign({},rent));
            const response = await axios.post(url, rent);
            console.log(response.data);
            console.log(response.data);

        } catch(error){
            alert("Not posted to Payment Controller");


        }

    }
    
    return(
        <div className="container">
            <div className="row">

            </div>
            <div className="payNow">
                <div className="row payRentDetails">
                    <div class="col-4 personalRentDetails">
                        <p className="rentSalutation"> Dear
                        <span className="rentUserName"> {userProfileId} </span></p>                    
                         <p className="rentText"> Rental due this month is : 
                       <span className="rentPrice"> R { currentRent.rentPrice} </span> </p>                        
                    </div>
                    <div class="col-8 paymentOptions">
                        <form onSubmit={handleSubmit}>
                            <button type="submit"
                                class="btn btn-primary btn-lg paymentBtn"> 
                                Pay Now 
                            </button>
                        </form>
                        
                       
                        <div className="paymentOptions">
                            <img class="paymentImages" src={eft} alt="Logo" height={100} width={200} />
                            <img class="paymentImages" src={visa} alt="Logo" height={100} width={200} />
                        </div> 
                        <p> Supported payment methods </p>
                    </div>

                </div>

                <div className="row redMessage">
                    <div className="col-12 ">
                            <p> You will be redirected to a  payment window where you can chose preffered payment method </p>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="previousRentals">
                    <h4 className="previousRnHeading"> Previous Rental Statements </h4>

                    <div className="rentTable">  
                        <table class="table table-striped">
                            <thead class="thead-dark">
                                <tr>
                                    <th className="rentIdHeading"> Rent Id </th>
                                    <th> Profile Id</th>
                                    <th> Unit No </th>
                                    <th> Due Date </th>
                                    <th> Payment Date </th>
                                    <th> Rent Price (R) </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                allRentals.map((rent, index) => {
                                    return <tr key={index}>
                                        <td className="rentId">{rent.rentId}</td>
                                        <td>{rent.profileId}</td>
                                        <td>{rent.unitNo}</td>
                                        <td>{rent.dueDate}</td>
                                        <td>{rent.paymentDate}</td>
                                        <td>{rent.rentPrice}</td>
                                        <td>
                                            <Button 
                                                variant="btn btn-primary"
                                                onClick={HandleShow}>
                                                View Previous Rental Payments
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
                                            <ModalHeader>
                                                <Modal.Title> 
                                                    Smart Living Rental Property Terms and Conditions 
                                                </Modal.Title>
                                            </ModalHeader>
                                            <Modal.Body>
                                            <table class="table table-striped">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th> Rent Id </th>
                                                        <th> Profile Id</th>
                                                        <th> Unit No </th>
                                                        <th> Due Date </th>
                                                        <th> Payment Date </th>
                                                        <th> Rent Price </th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <button className="btn btn-primary">
                                                                Simple Button
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                            </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary"onClick={handleClose}> Close </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table> 
                    </div>

                  

                    <div className="paymentOptions">
                        <img></img>
                    </div>

                    
                </div>
                             

            </div>
        </div>
    )
}

  export default Rentals;