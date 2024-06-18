import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
 
import './App.css';
import Sidenav from './components/sidenav';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Visitors from "./pages/visitors";
import Maintenance from "./pages/maintenance";
import Rentals from "./pages/rentals";
import NewTenant from './pages/newTenant';
import ClubHouse from './pages/clubhouse';
import TenantDocuments from './pages/tenantDocuments';
//import PayRent from './pages/payRent';
import Complaints from './pages/complaints';
import MeterUsage from './pages/meterUsage';


//Login and Sign Pages
import Login from './pages/UserAccount/login';
//import SignIn from './pages/UserAccount/signIn';

//Credit Applications
import CreditApplications from './pages/CreditApplications/creditApplications';

import ProfileDetails from './pages/UserProfile/profileDetails';

import AllocatedUnits from './pages/Apartments/allocatedUnits';

import Header from './components/header';
import Footer from './components/footer';

import Cookies from 'js-cookie';

import jwt from 'jsonwebtoken';
import LeaseAgreement from './pages/leaseAgreement';
import ApartmentDescription from './pages/Apartments/apartmentDescription';


export default function App() {

  //const tokenWeb = localStorage.getItem('website');
  //console.log("Website token is" + tokenWeb);

 // var countWebToken = 0;

 // while( countWebToken == 1 )
  //{  }



  //let checkCookie = process.env.JWT_SECRET;
  const pageUrl = window.location;
  //console.log("Page URL is   "  + pageUrl);
 
  const [ visibleSideNav, setVisibleSideNav ] = useState(true);  

  useEffect(() => {
      if(pageUrl == "http://localhost:3000/useraccount/login"){
          console.log("Page Url matches the conditional statement");
        setVisibleSideNav(false);
      }
  
    });
   
  const [ visibleFooter, setVisibleFooter ] = useState(true);  

  useEffect(() => {
      if(pageUrl == "http://localhost:3000/useraccount/login"){
          console.log("Page Url matches the conditional statement");
        setVisibleFooter(false);
      }
  
    });

  


  /*if(checkCookie =! null){
    console.log("cookie available" + checkCookie);
  }else{
    console.log(" Cookie not available ");
  }

  const token = Cookies.get('');
  console.log("Token is set as" + 'token');*/

  //const payLoad = jwt.verify( jwt, tokenWeb);
  //console.log("Payload is as follows" + payLoad);

  return (
    <div className="App">
      
       <Header/> 
      { visibleSideNav
      
         && <div className="" > <Sidenav/>  </div> }
     

      <div class="">             
          <main>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/rentals" element={<Rentals />}/>
              <Route path="/visitors" element={<Visitors />}/>
              <Route path="/maintenance" element={<Maintenance />}/>
              <Route path="/settings" element={<Settings />}/>  
              <Route path="/newTenant" element={<NewTenant />}/>   
              <Route path="/clubhouse" element={<ClubHouse />}/> 
              <Route path="/tenantDocuments" element={<TenantDocuments/>}/> 
              
              <Route path="/complaints" element={<Complaints />}/>
              <Route path="/meterUsage" element={<MeterUsage />}/>
              <Route path="/UserAccount/login" element={<Login />}/>
              {/* <Route path="/UserAccount/signIn" element={<SignIn />}/> */}
              <Route path="/CreditApplications/creditApplications" element={<CreditApplications />}/>
              <Route path="/UserProfile/profileDetails" element={<ProfileDetails/>} />
              <Route path="/leaseAgreement" element={<LeaseAgreement />}/>

              <Route path="Apartments/allocatedUnits" element={<AllocatedUnits/>} />
              <Route path="Apartments/apartmentDescription" element={<ApartmentDescription/>} />

            </Routes>
          </main> 
      </div>
     { visibleFooter && <Footer/> }

     
    </div>
  );
}

//export default App;
