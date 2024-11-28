import React, { useState, useEffect , Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { ModalHeader } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../Maintenance/singleJob.css';

function SingleJob(){

    const [ job, setJob ] = useState([]);

    const jobId = "285094f1-781b-4fb2-a05b-f429cf9aba5a";

    const url = "https://localhost:44311/api/controller/CurrentJob?JobId=";

    useEffect(() => {
        axios.get(url+jobId)
            .then(response => {            
                console.log(response.data);
                setJob("Job Found");
                console.log("Job Found");
        })
        .catch(error => { 
            console.log(error);
        });
        
    },[]);

    return(
        <div className="container">
            <div className="row singleJobArea">
                <h1> Report New Fault </h1>
            </div>

        


 
                
       

        </div>
    )

}

export default SingleJob;