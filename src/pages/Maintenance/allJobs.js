import React, { useState, useEffect , Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { ModalHeader } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../Maintenance/allJobs.css';

function AllJobs(){
const urlAllJobs = "https://localhost:44311/api/controller/AllJobs";
const [ jobs, setJobs ] = useState([]);

useEffect(()=>{
    axios.get(url)
    .then(response => {
        console.log(response.data);
        setJobs(response.data);

    })
    .catch(error => {
        console.log(error);
    })

},[]);

}
export default AllJobs;