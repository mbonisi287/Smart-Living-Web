import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../home.css';

function Home() {

const [post, setPosts ] = useState ([]);

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts/8')
    .then(response => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}, []);

const posts = setPosts;
console.log("mbonisi" + posts);

if (!post) return null;


return (

  <div class="container">
    <div class="row">
      <h1> Messages </h1>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th> Date </th>
            <th> Title </th>
            <th> Message </th>
            <th> Action </th>
            <td> </td>
          </tr>
  
        </thead>
        <tbody>
            {
              setPosts.data.map(post => ( 
                <tr key={post.userId}> 
                  <td> {post.userId} </td>
                  <td> {post.userId} </td>
                  <td> {post.title} </td>
                  <td> {post.body }</td>
                  <td> <button class="btn btn-primary"> View Message </button></td>
                  <td> <button class="btn btn-primary"> Mark As Read </button></td>
                </tr>

              ))
            }
          

        </tbody>
      </table>


    </div>
    <div class="row row-one">
        <div class="col-lg-4">
          <div class="home-tiles">
            <h2> Rentals </h2>
            <p> Rent due this month: </p>
            <div class="home-buttons">
              <div class="btn-section-one">
              <button class="btn btn-large btn-primary"> Pay Rent Now </button>
             
              </div>
              <div class="btn-section-two">
              <button class="btn btn-large btn-primary"> View Statements </button>
              </div>
            </div>
  
            
          </div> 
        </div> 
        <div class="col-lg-4">                  
          <div class="home-tiles">
              <h2> Visitors </h2>
              <p> Generate Visitors Code </p>
              <div class="home-buttons">
                <div class="btn-section-one">
                <button class="btn btn-large btn-primary"> Generate Code </button>
              
                </div>
                <div class="btn-section-two">
                <button class="btn btn-large btn-primary"> Delivery Code </button>
                </div>
              </div>
            </div>  
        </div>   

        <div class="col-lg-4">
          <div class="home-tiles">
              <h2> Meter Usage </h2>
              <p> View Meter Usage </p>
              <button class="btn btn-large btn-primary"> View Meter </button>
          </div>            
          
        </div>
    </div>

    <div class="row row-two">
      <div class="col-lg-4">
            <div class="home-tiles">
              <h2> Maintenance </h2>
              <p> Schedule Maintenance for you unit </p>
              <div class="home-buttons">
                <div class="btn-section-on">
                  <button class="btn btn-large btn-primary"> Schedule Maintenance </button>              
                </div>   
              </div>    
            </div> 
      </div> 

      <div class="col-lg-4">                  
            <div class="home-tiles">
                <h2> Club House </h2>
                <p> Book the club house for your events </p>
                <div class="home-buttons">
                  <div class="btn-section-on">
                    <button class="btn btn-large btn-primary"> Book Club-House </button>                
                  </div>                 
                </div>
              </div>  
      </div>   

      <div class="col-lg-4">
            <div class="home-tiles">
                <h2> Tenant Documents </h2>
                <p> View Lease Agreements </p>
                <button class="btn btn-large btn-primary"> View Documents </button>
            </div>             
      </div>
    </div>

    <div class="row row-three">
      <div class="col-lg-4">
            <div class="home-tiles">
              <h2> Complaints </h2>
              <p> Log a complaint </p>
              <div class="home-buttons">
                <div class="btn-section-on">
                  <button class="btn btn-large btn-primary"> Log Complaint </button>              
                </div>   
              </div>    
            </div> 
      </div> 

      <div class="col-lg-4">                  
            <div class="home-tiles">
                <h2> Rules & Regulations  </h2>
                <p> View Complex Rules and Regulations </p>
                <div class="home-buttons">
                  <div class="btn-section-on">
                    <button class="btn btn-large btn-primary"> View Rules & Regs </button>                
                  </div>                 
                </div>
              </div>  
      </div>   


    </div>


  </div>


 
       
      
    )
  }

export default Home;