import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModalHeader } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


import '../CreditApplications/creditApplications.css';

function CreditApplications(){

    const [ credit, setCredit ] = useState([]);

    const url = "https://localhost:44311/api/controller/GetAllCreditChecks";

    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setCredit(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[]);

    function generateLease(profileId){
        setShow(true);
        //const leaseUrl = "https://localhost:44311/api/controller/AllLeaseAgreements";
        //const lease = axios.post(leaseUrl);
    }

    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false); 

    const HandleShow = () => setShow(true);

    const userEmail1 = localStorage.getItem('key'); 

    let userEmail = userEmail1.replaceAll("\"", "").toString();
    console.log("Email is now " + userEmail);


    const [ formData, setFormData ] = useState({
        profileId: "mbonisi287",
        unitNo: "",
        rentPrice: "",
        startDate: "",
        endDate: "",
        validLease: 0,
    });

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name] : event.target.value})
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const url = "https://localhost:44311/api/controller/CreateLease";
            const response = await axios.post(url, formData);
            console.log("Lease agreement insert" + response.data);
            console.log(response.status);

            if( response.status == 200)
            {
                alert("Lease Agreement for " + response.data.profileId + " has been generated. You will redirected to a different page.");
                window.location.href = "creditApplications";
            }

        }
        catch(error){
            console.log("Unable to create lease agreement");
        }
    }

    function SelectBlocks(){
        const blocks = axios.get();
    }

    // Date Picker
    const [ startDate, setStartDate ] = useState(new Date());
   // const [ endDate, setEndDate ] = useState( new Date);



    const defaultValue = new Date();
    //var formattedEndDate = "**/**/****";
    //let formattedStartDate = "**/**/****";

    const [dateObject, setDateObject ] = useState({
        formattedStartDate: '**/**/****',
        formattedEndDate: '**/**/****',
        displayEndDate: '**/**/****'
    })

    function handleDateChange(date){     
          
        setStartDate(date);  
        dateSort(date);

     }

     function dateSort(date){
        console.log("Date is now ->" + date);
        dateObject.formattedStartDate = `${date.getFullYear()}/${date.getMonth()+ 1 }/${date.getDate()}`; 
        dateObject.formattedEndDate = `${date.getFullYear() + 1 }/${date.getMonth()+ 1 }/${date.getDate()}`;
        dateObject.displayEndDate =   `${date.getDate()}/${date.getMonth()+ 1 }/${date.getFullYear() + 1 }`;
        console.log("Start Date of lease is:" + dateObject.formattedStartDate + " End date of lease is:" + dateObject.formattedEndDate);
        
        return dateObject;
     }
    // Add 12 months to the start date

    console.log("Start Date of lease isssssssss:" + dateObject.formattedStartDate + " End date of lease issssssss:" + dateObject.formattedEndDate);

    //let formattedEndDatee = handleDateChange();

    const [ availableApartments, setAvailableApartments ] = useState(false);
    function ShowAvailableApartments() {
        setAvailableApartments(!availableApartments);
    }

    var apartmentButton = availableApartments ? "Hide Available Apartments" : "Show Available Aprtments";

    // Logic for the lease agreement button
    

    return(
        <div className="container">
            <div className="creditTable">
                <div className="creditHeading">
                    <h1> Credit Applications </h1>
                </div>
                <div className="row">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th className='creditId'> Credit Check Id </th>
                                <th> Profile Id </th>
                                <th> RSA-Id Or Passport </th>
                                <th> Credit Score </th>
                                <th> Call To Action </th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                credit.map((cred, index) => {
                                    return <tr key={index}>
                                        <td className='creditCheckId'>{cred.creditCheckId}</td>
                                        <td>{cred.profileId}</td>
                                        <td>{cred.idOrPassportNumber}</td>
                                        <td>{cred.creditScore}</td>
                                        <td> 
                                            <Button variant="btn btn-primary" onClick={HandleShow}> Generate Lease Agreement </Button>
                                            <Modal show={show} handle={handleClose}  backdrop="static" size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"  centered keyboard={false}       >
                                            <ModalHeader>
                                                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                                                    <Modal.Title>
                                                        Lease Agrement for <span className="credIdSpan"> {cred.profileId} </span> 
                                                    </Modal.Title>
                                            </ModalHeader>
                                            <Modal.Body>
                                                <h3> Complete all the fields below </h3>
                                                <form onSubmit={handleSubmit}>
                                                    

                                                    {/* Temporarily Allocate the unit to the tenant
                                                        - Check for un-allocated blocks and then units
                                                        - Auto populate the Rent Price after selecting the units                                                        
                                                    */}

                                                    <div>
                                                        <h4> See list of available apartments </h4>
                                                        <Button onClick={ShowAvailableApartments}> {apartmentButton}</Button>
                                                        <div className='availableUnits'>
                                                            {
                                                                availableApartments && 
                                                                <div className="form-group input-group"> 
                                                                    <select className="custom-select">
                                                                        <option selected> Choose an available apartment </option>
                                                                        <option value=""> Unit 2002 - R6000 - 2 Bedroom, 1 Bathroom, Block 2, Floor Area - 65sqm </option>
                                                                        <option value=""> Unit 3201 - R6000 - 2 Bedroom, 1 Bathroom, Block 3, Floor Area - 70sqm </option>
                                                                        <option value=""> Unit 4201 - R6500 - 2 Bedroom, 2 Bathroom, Block 3, Floor Area - 80sqm </option>
                                                                        <option value=""> Unit 1204 - R7500 - 3 Bedroom, 2 Bathroom, Block 4, Floor Area - 90sqm </option>
                                                                        <option value=""> Unit 4201 - R6000 - 2 Bedroom, 2 Bathroom, Block 6, Floor Area - 85sqm </option>
                                                                    </select> 
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>

                                                    {/*<div className="form-group"> 
                                                        <label> Unit No: </label>
                                                        <input className="form-control" onChange={handleChange} 
                                                            name="unitNo" value={formData.unitNo} type="text" placeholder="  "
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label> Rent Price </label>
                                                        <input className="form-control" onChange={handleChange} name="rentPrice" value={formData.rentPrice} 
                                                            type="text" placeholder="  "
                                                        />                                                        
                                                    </div>*/}

                                                    <div className='form-group'>
                                                        <label> Start Date </label>
                                                        <DatePicker className="form-control" defaultValue={defaultValue} 
                                                            selected={startDate} onChange={handleDateChange} format='dd-MM-yyyy' />
                                                    {/*<DatePicker className="form-control" defaultValue={defaultValue} 
                                                            selected={startDate} onChange={(date) => setStartDate(date)} />
                                                        <input onChange={handleChange}  value={formData.startDate}
                                                            type="text" placeholder="" />*/}                                                        
                                                    </div>

                                                    {/* Choose the Lease period - 6 or 12 months */}
                    
                                                    <div className='form-group'> 
                                                        <label> End Date : {dateObject.displayEndDate} </label>
                                                        
                                                        <p></p>
                                                        {/* <input onChange={handleChange} name="endDate" value={formData.endDate}
                                                            type="text" placeholder="" />*/}
                                                    

                                                    </div>



                                                

                                                    

                                                    <button type="submit" className="btn btn-lg btn-success"> Generate Lease Agreement      </button>
                                                </form>

                                                </Modal.Body>
                                            </Modal>

                                            {/*<button>{() => generateLease(cred.profileId)} 
                                            </button>*/}
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

export default CreditApplications;