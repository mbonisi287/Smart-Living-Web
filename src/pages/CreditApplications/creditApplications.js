import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModalHeader } from 'react-bootstrap';

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

    return(
        <div className="container">
            <div className="creditTable">
                <div className="creditHeading">
                    Credit Applications 
                </div>
                <div className="row">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th> Credit Check Id </th>
                                <th> Profile Id </th>
                                <th> IdOrPassport </th>
                                <th> Credit Score </th>
                                <th> Call To Action </th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                credit.map((cred, index) => {
                                    return <tr key={index}>



                                        <td>{cred.creditCheckId}</td>
                                        <td>{cred.profileId}</td>
                                        <td>{cred.idOrPassportNumber}</td>
                                        <td>{cred.creditScore}</td>
                                        <td>
                                            <Button
                                                variant="btn btn-primary"
                                                onClick={HandleShow}>
                                                    Generate Lease Agreement
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
                                                        Lease Agrement for {cred.profileId}
                                                    </Modal.Title>
                                                </ModalHeader>
                                                <Modal.Body>
                                                    <h3> Complete all the fields below </h3>
                                                    <form onSubmit={handleSubmit}>

                                                        {/* Temporarily Allocate the unit to the tenant
                                                            - Check for un-allocated blocks and then units
                                                            - Auto populate the Rent Price after selecting the units                                                        
                                                        */}

                                                        <label>
                                                            Unit No:
                                                            <input onChange={handleChange} name="unitNo" value={formData.unitNo} type="text" placeholder="  "/>
                                                        </label>

                                                        <label>
                                                            Rent Price
                                                            <input onChange={handleChange} name="rentPrice" value={formData.rentPrice} type="text" placeholder="  "/>
                                                        </label>

                                                        <label>
                                                            Start Date
                                                            <input onChange={handleChange} name="startDate" value={formData.startDate}
                                                                type="text" placeholder=""
                                                            />
                                                        </label>
                                                        
                                                        <label>
                                                            End Date
                                                            <input onChange={handleChange} name="endDate" value={formData.endDate}
                                                                type="text" placeholder=""
                                                            />
                                                        </label>
                                                        <button type="submit" className="btn btn-lg btn-success"
                                                        >
                                                            Generate Lease Agreement
                                                        </button>
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