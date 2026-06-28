import React from "react";
import { Header } from "../../components";
import { useState, useRef , useEffect} from 'react';
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form';
import { ModalHeader } from 'react-bootstrap';
import {    BrowserRouter as Router,    Routes,   
     Route, Link, useLocation, useNavigate,  } from "react-router-dom";
import { Stepper, Step, StepLabel, Box, Button, useTheme } from "@mui/material";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { API_URL } from "../../global";
import { Label } from "@mui/icons-material";

const PurchaseOrder = () => {
    return(
           <Box m="20px">
                  <Header title="Purchase Order Dashboard" subtitle=" Welcome to the Purchase Order  Dashboard - Manage Purchase Orders..." />
                  <Box height="75vh">
        
                  
                  </Box>
                </Box>
    )   
}

export default PurchaseOrder