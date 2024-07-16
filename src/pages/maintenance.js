import React, { useState, useEffect , Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { ModalHeader } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../pages/maintenance.css';
import { on } from 'events';

function Maintenance(){
    /*const home = () => {
        window.location.href = "http://locahost:3000/";
        console.log("Back to Home");
    }
   const [ visibleSingleIssue, setSingleIssue ] = useState(false);
    function toggleSingleIssues(){
        setSingleIssue(!visibleSingleIssue);
    }

    const [ visibleMultipleIssue, setMultipleIssue] = useState(false);
    function toggleMultipleIssues(){
        setMultipleIssue(!visibleMultipleIssue);
    }
    function checkLoaded() { 
        if (document.readyState === "complete") { 
          // Your code here 
        } else { 
          setTimeout(checkLoaded, 10); 
        } 
      }*/

    //const singleIssues = () => {    }
    //const multipleIssues = () => {    }
    //var buttonSingleIssue = visibleSingleIssue ? "Report Single Issue - Hide Form" : "Report Single Issue - Show Form";
    //var buttonMultipleIssue = visibleMultipleIssue ? "Report Multiple Issues - Hide Form" : "Report Multiple Issues - Show Form" ;

    const [ mainJobs, setMainJobs ] = useState([]);

    const [ prevJobs, setPrevJobs ] = useState([]);

    const [ modalData, setModalData] = useState("");
    const urlMainJob = "https://localhost:44311/api/controller/AllJobs";

    useEffect(() => {
        axios.get(urlMainJob)
            .then(response => {

                /* Filter the difference between the previous jobs to the main jobs
                * Array 1 - Current Jobs
                * Array 2 - Previous Jobs
                */
                const onGoingJobs = response.data;
                //onGoingJobs.filter( a => a.adminApproval === 'true');
                
                setMainJobs(onGoingJobs.filter(a => a.adminApproval === false));
                console.log("Filtered Array" + JSON.stringify(onGoingJobs)); 
                //setMainJobs(onGoingJobs);


                const prevJobs = response.data;
                setPrevJobs(prevJobs.filter( p => p.adminApproval === true));

                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    },[]);

    const [ show, setShow ] = useState(false);
    const handleClose = ()  => setShow(false);
    //const handleShow = () => {     setShow(true);    }

    const oneJob ="";

    function handleShow(oneJob){
       
        let mainJob = new Array(oneJob);
        console.log("One Job is:" + JSON.stringify(oneJob.jobId))
        setModalData(oneJob);
        //unitNo: unitNo;
        setShow(true);

    }

    

    return(
        <div className="container-fluid mainJobsContainer">
            <h3> Maintenance Jobs</h3>
            {/* Maintanence Container*/}
            <div className="row ">
                {/* Current OnGoing Jobs */}
                <div className="col-6 mainDivCurrent"> 
                    <h3> Current Ongoing Maintenance Jobs</h3>
                    {
                        
                        mainJobs.map(item =>                             
                            <div key={item.jobId}className="row prevJobRow">
                                <div className="col-3"> <span className='spanPrevJob'> Unit No: </span> {item.unitNo}</div>
                                <div className="col-9"> 
                                    <span className='bigSpanPrevJob'> 
                                        <span className='spanPrevJob'>Job Item: </span> {item.jobItem} 
                                    </span> 
                                    <span className='bigSpanPrevJob'> 
                                        <span className='spanPrevJob'>Job Description: </span> {item.jobDescription} 
                                    </span> 
                                    <span className='bigSpanPrevJob'> 
                                        <span className='spanPrevJob'>Job Recorded Date:  </span> {item.jobDate} 
                                    </span> 
                                    <span className='bigSpanPrevJob'> 
                                        <span className='spanPrevJob'>Allocated To :  </span>{ item.allocatedTo}
                                    </span>
                                  
                                    <Button type="button" variant="primary" onClick={() => handleShow(item)}>  View Job </Button>
                                    <Modal
                                        show={show}
                                        handle={handleClose}
                                        backdrop="static"
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        keyboard={false}>

                                        <ModalHeader>
                                            <Button variant="secondary" onClick={handleClose}> Close </Button>
                                            <Modal.Title> Job For Unit No: {modalData.unitNo}
                                            
                                            </Modal.Title>
                                        </ModalHeader>
                                        <Modal.Body>
                                            <span className="modalSpan"> Job Date: {modalData.jobDate} </span>
                                            <span className="modalSpan"> Job Item: {modalData.jobItem} </span>
                                            <span className="modalSpan"> Job Description: {modalData.jobDescription} </span>
                                            <span className="modalSpan"> Allocated Time: {modalData.allocationTime} </span>
                                            <span className="modalSpan"> Allocated To: {modalData.allocatedTo} </span>
                                            <span className="modalSpan"> Allocated By: {modalData.allocatedBy} </span>
                                            <span className="modalSpan"> Completion Time: {modalData.completionTime} </span>
                                            <span className="modalSpan"> Admin Approval: {modalData.adminApproval} </span>
                                            <span className="modalSpan"> Tenant Approval: {modalData.tenantApproval} </span>
                                            <span className="modalSpan"> Tenant Approval Time: {modalData.tenantApprovalTime} </span>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}> Close </Button>
                                        </Modal.Footer>

                                    </Modal>
                                </div>
                     
                            </div>
                        )
                    }
                </div>

                {/* Previous Maintenance Jobs*/}
                <div className="col-6 mainDivPrev">
                    <h3> Previous Maintenance Jobs </h3>
                    {
                        prevJobs.map(item => 
                            <div key={item.jobId}className="row prevJobRow">
                                <div className="col-3"> <span className='spanPrevJob'> Unit No: </span> {item.unitNo}</div>
                                <div className="col-9"> 
                                    <span className='bigSpanPrevJob'> <span className='spanPrevJob'>Job Item: </span> {item.jobItem} </span> 
                                    <span className='bigSpanPrevJob'> <span className='spanPrevJob'>Job Description: </span> {item.jobDescription} </span> 
                                    <span className='bigSpanPrevJob'> <span className='spanPrevJob'>Job Recorded Date:  </span> {item.jobDate} </span> 
                                    <span className='bigSpanPrevJob'> <span className='spanPrevJob'>Allocated To :  </span>{item.allocatedTo}</span>
                                    <Button type="button" variant="primary" onClick={() => handleShow(item)}>  View Job </Button>
                                    <Modal
                                        show={show}
                                        handle={handleClose}
                                        backdrop="static"
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        keyboard={false}>

                                        <ModalHeader>
                                            <Button variant="secondary" onClick={handleClose}> Close </Button>
                                            <Modal.Title> Job For Unit No: {modalData.unitNo}
                                            
                                            </Modal.Title>
                                        </ModalHeader>
                                        <Modal.Body>
                                            <span className="modalSpan"> Job Date: {modalData.jobDate} </span>
                                            <span className="modalSpan"> Job Item: {modalData.jobItem} </span>
                                            <span className="modalSpan"> Job Description: {modalData.jobDescription} </span>
                                            <span className="modalSpan"> Allocated Time: {modalData.allocationTime} </span>
                                            <span className="modalSpan"> Allocated To: {modalData.allocatedTo} </span>
                                            <span className="modalSpan"> Allocated By: {modalData.allocatedBy} </span>
                                            <span className="modalSpan"> Completion Time: {modalData.completionTime} </span>
                                            <span className="modalSpan"> Admin Approval: {modalData.adminApproval} </span>
                                            <span className="modalSpan"> Tenant Approval: {modalData.tenantApproval} </span>
                                            <span className="modalSpan"> Tenant Approval Time: {modalData.tenantApprovalTime} </span>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}> Close </Button>
                                        </Modal.Footer>

                                    </Modal>
                                </div>
                     
                            </div>
                        )
                    }
                    <div className=''>
      
                    </div>
                </div>

            </div>

            
   
     

        </div>
    )
}

export default Maintenance;