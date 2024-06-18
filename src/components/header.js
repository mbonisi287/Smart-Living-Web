import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../components/header.css';

function Header (){

  const userEmail = localStorage.getItem('key');

  //let userName = userEmail.replaceAll("\"", "").toString();

  const [profile, setProfile ] = useState([true]);

  useEffect(() => {
    if(userEmail != null)
    {
      axios.get('https://localhost:44311/api/controller/CheckProfile?ProfileId=' + userEmail)
        .then(response => {
          setProfile(response.data);

          console.log("Checking the profile existsssssssssssss" + response.data);
          console.log(response.data.firstName);

          if(response.data == 0)
          {
            //window.location.href = "";
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

  }, []);

  return(
    <div>
<nav className="navbar navbar-expand-lg navbar-light fixed-top nav smHeader">

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#"> Hi { userEmail } </a>
      </li>
    </ul>
  </div>
</nav>
    </div>
 
)}

export default Header;