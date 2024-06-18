import React, { useState, useEffect , Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../pages/maintenance.css';

function Maintenance(){
    const home = () => {
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
      }

    const singleIssues = () => {    }

    const multipleIssues = () => {    }

    

    var buttonSingleIssue = visibleSingleIssue ? "Report Single Issue - Hide Form" : "Report Single Issue - Show Form";
    var buttonMultipleIssue = visibleMultipleIssue ? "Report Multiple Issues - Hide Form" : "Report Multiple Issues - Show Form" ;

    return(
        <div class="container">
            <div className="row maintenance-heading-row">
                <button onClick={home} className="btn btn-lg btn-primary back-button"> Back </button>
                <h3 className="maintenance-heading"> Log a Maintenance Call </h3>
            </div>
            <div className="row singleIssue">
                <button type="button" className="btn btn-primary btn-lg" onClick={toggleSingleIssues}> {buttonSingleIssue} </button>
                {/* Single Issue */}
                <div className="singleIssueForm">
                    { visibleSingleIssue && 
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
                    }
                    </div>               
            </div>

              {/* Mutliple Issues */}
              <div className="row multiple issues">
                    <button className="btn btn-primary btn-lg" onClick={toggleMultipleIssues}> {buttonMultipleIssue} </button>
                    { visibleMultipleIssue &&
                        <h4> Please fill in the form to Report Mutliple Maintenance Issues </h4>
                    }
              </div>




            {/* Maintenance History */}
            <div class="row"> 
                <h3> Previous Maintenance History </h3>
                <table class="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th> Date </th>
                        <th> Description Of Fault </th>
                        <th> Log Status </th>
                    </tr>
            
                    </thead>
                    <tbody>
                        {
                        /*setPosts.data.map(post => ( 
                            <tr key={post.userId}> 
                            <td> {post.userId} </td>
                            <td> {post.userId} </td>
                            <td> {post.title} </td>
                            <td> {post.body }</td>
                            <td> <button class="btn btn-primary"> View Message </button></td>
                            <td> <button class="btn btn-primary"> Mark As Read </button></td>
                            </tr>

                        ))*/
                        }
                    

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Maintenance;