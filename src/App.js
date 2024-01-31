import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
 
import './App.css';
import Sidenav from './components/sidenav';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Visitors from "./pages/visitors";
import Maintenance from "./pages/maintenance";
import Rentals from "./pages/rentals";
import NewTenant from './pages/newTenant';
import ClubHouse from './pages/club-house';

function App() {
  return (
    <div className="App">
      <div class="">
         <Sidenav/>
      </div>
      <div class="">             
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/rentals" element={<Rentals />}/>
          <Route path="/visitors" element={<Visitors />}/>
          <Route path="/maintenance" element={<Maintenance />}/>
          <Route path="/settings" element={<Settings />}/>  
          <Route path="/newTenant" element={<NewTenant />}/>   
          <Route path="/club-house" element={<ClubHouse />}/>  
        </Routes>
      </main> 
      </div>

     
    </div>
  );
}

export default App;
