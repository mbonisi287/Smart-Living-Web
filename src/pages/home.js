import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/home.css';

import snapIcon from '../Images/home.png';
import noiseIcon from '../Images/noisy.png';
import payIcon from '../Images/operation.png';
import applyIcon from '../Images/job-description.png';

import dateIcon from '../Images/calendar.png';

import ApexCharts from 'apexcharts';

// Charts JS
//import CanvasJSReact from '@canvasjs/react-charts';

//var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//Dashboard Date:

function getDate(){
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

export default function Home() {

  // Dashboard Date
  const [ currentDate, setCurrentDate ] = useState(getDate());

  /* declare the domain name */

    const domainName = "http:localhost:3000";
    const clubHouse = () => {  window.location.href = "Clubhouse/clubHouse"; }

    const newTenantApp = () => {  window.location.href =  "Tenant/newTenant";  }

    const maintenance = () => { window.location.href = "Maintenance/maintenance"; }

    const tenantDocuments = () => { window.location.href = "Tenant/tenantDocuments";  }

    const payRent = () => { window.location.href = "Rentals/payRent";  }

    const complaints = () => { window.location.href = "Complaints/complaints"  }

    const meterUsage = () => { window.location.href = "meterUsage";  }

    const creditApplications = () => { window.location.href = "CreditApplications/creditApplications"; }

    //Chart Functions
    document.addEventListener("DOMContentLoaded", function(arg) {
      // do something cool
      RentalCollectionCharts();
    });



  const [profile, setProfile ] = useState([true]);

  useEffect(() => {
    if((userEmail != null) && (countWebToken == 1))
    {
      axios.get('https://localhost:44311/api/controller/CheckProfile?ProfileId=' + userEmail)
        .then(response => {
          setProfile(response.data);

          console.log("Checking the profile exists" + response.data);
          console.log(response.data);

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




const [post, setPosts ] = useState ([]);

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}, []);
/* Message API */

const [ messages, setMessages ] = useState ([]);
useEffect(() => {
  
},[]);

if (!post) return null;

// Active Maintenance Jobs Box   
        /* Filter the difference between the previous jobs to the main jobs
        * Array 1 - Current Jobs
        * Array 2 - Previous Jobs
       */
      
const urlMainJob = "https://localhost:44311/api/controller/AllJobs";
/*const [ mainJobs, setMainJobs ] = useState ([]);

useEffect(() => {
  axios.get('https://localhost:44311/api/controller/AllJobs')
      .then(response => {
     
      //const onGoingJobs = response.data;
       //onGoingJobs.filter( a => a.adminApproval === 'true');
                        
        //setMainJobs(onGoingJobs.filter(a => a.adminApproval === false));
        setMainJobs(response.data);
        console.log(response.data);
      })
      .catch( error => {
        console.error(error);
      })
},[]); 

if(!mainJobs) return null;*/





function RentalCollectionCharts(){
  var options = {
    chart: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      },
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#99C2A2', '#000000', '#66C7F4'],
    series: [
      
      {
        name: 'Rent Collected',
        type: 'column',
        data: [95000, 89000, 101000, 101000, 112000, 89000, 132000, 154000]
      },
      {
        name: "Rent Owing",
        type: 'column',
        data: [7000, 14000, 7000, 14000, 21000, 7000, 14000, 7000]
      },
      /*{
        name: "Line of growth",
        type: 'line',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
      },*/
    ],
    stroke: {
      width: [4, 4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: "80%"
      }
    },
    xaxis: {
      categories: [ "January", "February", "March", "April", "May", "June", "July", " September", "August", "October"]
    },
    yaxis: [
      {
        seriesName: 'Column A',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: "Rands(R)"
        }
      },
      {
        seriesName: 'Column A',
        show: false
      }/*, 
      {
        opposite: true,
        seriesName: 'Line C',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: "Line"
        }
      }*/
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

function LeaseRenewals(){
  var options = {
    chart: {
      type: 'donut'
    }, 
    dataLabels: {
      style: { fontSize: '20px', fontWeight: 'bold'}
    }, 
    width: '100%',
    height: '100%',
    series: [ 20, 45, 17 ],
    labels: ['Approved', 'Pending' , 'Not Approved'],
    plotOptions: {
      pie: { 
        donut: {
          size: '50%',
          labels: { show: true}
        },
        expandOnClick: false,
        customScale : 0.8
      } 
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    }
  }

  var chart = new ApexCharts(document.querySelector("#chartsLease"), options);
  chart.render();
}

function CreditScoreApps(){
  var options = {
    chart: {
      type: 'donut'
    }, 
    series: [ 20, 45, 17 ],
    labels: ['Approved', 'Pending' , 'Not Approved'],
    plotOptions: {
      pie: { 
        donut: {
          size: '50%'
        },
        customScale : 0.8
      } 
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    }
  }

  var chart = new ApexCharts(document.querySelector("#chartsPie"), options);
  chart.render();
}

function VisitorAnalytics(){
  var options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#FF1654", "#247BA0"],
    series: [
      {
        name: "Visitors",
        data: [ 15, 16, 8, 14, 61, 42, 35 ]
      },
      {
        name: "Deliveries",
        data: [20, 29, 37, 36, 44, 45, 50]
      }
    ],
    stroke: {
      width: [4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    },
    xaxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday',  'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FF1654"
        },
        labels: {
          style: {
            colors: "#FF1654"
          }
        },
        title: {
          text: "Visitors",
          style: {
            color: "#FF1654"
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#247BA0"
        },
        labels: {
          style: {
            colors: "#247BA0"
          }
        },
        title: {
          text: "Deliveries",
          style: {
            color: "#247BA0"
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    }
  };
  
  var chart = new ApexCharts(document.querySelector("#chartsVisitor"), options);
  
  chart.render();
  
}
// Charts - chart.destroy();

    

const userEmail = localStorage.getItem('key'); 

var countWebToken = 0;

if((userEmail == null) && (countWebToken == 0 )){
   console.log("Website token is" + userEmail);
   window.location.href = "/useraccount/login";
}else{
  console.log("User Email is now - >" + userEmail );
  //hit api to check profile
  countWebToken =+1;
}






return (

  <div className="container adminContainer">
    <div className="adminDashboard">
      <div className="row welcomeRow">
        <h4> Dashboard Summary - {currentDate} </h4>        
      </div>

      <div className="row snapShotRow">

        <div className="col-8">

          <div className="row">
            <div className="col-6">
              <div className="snapShot">
                <h5 className="snapShotHeading"> Rent Collected </h5>
                <span className="snapShotSpan"> R 95 000 </span>
                <img className="snapShotImg" src={payIcon} alt="Logo"/>
                <button type="button" onClick={payRent}
                className="btn btn-sm btn-success snapShotBtn d-block"> See More</button>
              </div>
            </div>

            <div className="col-6">
              <div className="snapShot">
                <h5 className="snapShotHeading"> Total Allocated Apartments </h5>
                <span className="snapShotSpan"> 67  / 100 </span>
                <img className="snapShotImg" src={snapIcon} alt="Logo"/>
                <button type="button" className="btn btn-sm btn-success snapShotBtn d-block"> See More</button>
              </div>
            </div>

            <div className="col-6">
              <div className="snapShot">
                <h5 className="snapShotHeading"> New Tenant Applications </h5>
                <span className="snapShotSpan"> 4 / 9  </span> 
                <img className="snapShotImg" src={applyIcon} alt="Logo"/>
                <button type="button" onClick={newTenantApp} className="btn btn-sm btn-success snapShotBtn d-block"> See More</button>
              </div>

            </div>
            <div className="col-6">
              <div className="snapShot">
                <h5 className="snapShotHeading"> Complaints/Disturbances </h5>
                <span className="snapShotSpan"> 4 </span>
                <img className="snapShotImg" src={noiseIcon} alt="Logo"/>
                <button type="button" onClick={complaints} className="btn btn-sm btn-success snapShotBtn d-block"> See More</button>
              </div>

            </div>



          </div>

          <div className="row">
             
            <div className="col-12">
            <h1 className="statsHeading"> Stats Overview </h1>
            <nav className="nav nav-pills nav-justified">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" 
                   data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                   onClick={RentalCollectionCharts} aria-selected="true">
                    Rental Collections
                  </button>

                  <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" 
                    data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" 
                    onClick={LeaseRenewals} aria-selected="false">
                      Lease Renewals
                  </button>

                  <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" 
                    data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" 
                    onClick={VisitorAnalytics} aria-selected="false">
                    Visitor Analytics
                  </button>

                  <button className="nav-link" id="nav-credit-tab" data-bs-toggle="tab" 
                    data-bs-target="#nav-credit" type="button" role="tab" aria-controls="nav-credit" 
                    onClick={CreditScoreApps} aria-selected="false">
                    Credit Score Applications
                  </button>

                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">

                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
               
                  <div id="chart"></div>
               
                </div>

                <div className="tab-pane fade" id="nav-profile" role="tabpanel" 
                aria-labelledby="nav-profile-tab">

                  <div id="chartsLease"></div>
                    This is some placeholder content the Profile tab's associated content. Clicking another tab 
                      wi
                </div>

                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                
                <div id="chartsVisitor"></div>
                    This is some placeholder content                    
                </div>

                <div className="tab-pane fade" id="nav-credit" role="tabpanel" aria-labelledby="nav-credit-tab">
                  <div id="chartsPie"></div>
                  <button onClick={creditApplications} className="btn btn-large btn-primary"> View All Credit Applications </button>
                                       
                </div>

              </div>

            </div>
          </div>

        </div>

        <div className="col-4 sideCol">
          <div className="maintenanceJobs">
             <h5 className="jobHeadingTop"> Active Maintenance Jobs </h5>
             {/*
                mainJobs.map(item =>
                  <div className="row jobRow">
                    <span>
                      <span className="jobTitle"> {item.jobItem}</span>
                      <span className="jobUnit"> Unit No : {item.unitNo} </span>
                    </span>
                    <span>
                      <span className="jobStatus"> Status : <span className=""> Active </span> </span>
                      <span className="jobdate"><img className="dateIconImg" src={dateIcon} alt="DateIcon"/> : 15/03/2024 </span>
                    </span>
                    <button type="button" onClick={clubHouse} className="btn btn-sm btn-success float-right d-blacks jobBtn"> View Job </button>
            
                  </div>

                )

              */}

             
          </div>

          <button type="button" className="btn btn-lg btn-success  d-block"> 
              View Active Maintenance Jobs 
          </button>


          <div className="clubHouse">
              <h5> Club House Bookings </h5>
                <div className="row jobRow">
                    <span>
                      <span className="jobTitle"> Birthday </span>
                      <span className="jobUnit"> Unit No : 605 </span>
                    </span>

                    <span>
                      <span className="jobStatus"> Payment Status : <span className=""> Paid </span> </span>
                      <span className="jobdate"><img className="dateIconImg" src={dateIcon} alt="DateIcon"/> : 15/03/2024 </span>
                    </span>
                    

                    
                    <button type="button" className="btn btn-lg btn-success float-right d-block"> View Booking </button>
                </div>

                <div className="row jobRow">
                    <span>
                      <span className="jobTitle"> Birthday </span>
                      <span className="jobUnit"> Unit No : 605 </span>
                    </span>

                    <span>
                      <span className="jobStatus"> Payment Status : <span className=""> Paid </span> </span>
                      <span className="jobdate"><img className="dateIconImg" src={dateIcon} alt="DateIcon"/> : 15/03/2024 </span>
                    </span>
                    

                    
                    <button type="button" className="btn btn-lg btn-success float-right d-block"> View Booking </button>
                </div>
            </div>
        </div>  
      </div>




    </div>

    {/*
    <div className="row row-one">
        <div className="col-lg-4">                  
          <div className="home-tiles">
              <h2> Visitors </h2>
              <p> Generate Visitors Code </p>
              <div className="home-buttons">
                <div className="btn-section-one">
                <button className="btn btn-large btn-primary"> Generate Code </button>
              
                </div>
                <div className="btn-section-two">
                <button className="btn btn-large btn-primary"> Delivery Code </button>
                </div>
              </div>
            </div>  
        </div>   

        <div className="col-lg-4">
          <div className="home-tiles">
              <h2> Meter Usage </h2>
              <p> View Meter Usage </p>
              <button onClick={meterUsage} className="btn btn-large btn-primary"> View Meter </button>
          </div>            
          
        </div>
    </div>

    <div className="row row-two">
      <div className="col-lg-4">                  
            <div className="home-tiles">
                <h2> Rules & Regulations  </h2>
                <p> View Complex Rules and Regulations </p>
                <div className="home-buttons">
                  <div className="btn-section-on">
                    <button className="btn btn-large btn-primary"> View Rules & Regs </button>                
                  </div>                 
                </div>
              </div>  
      </div>  
  

      <div className="col-lg-4">
            <div className="home-tiles">
                <h2> Tenant Documents </h2>
                <p> View Lease Agreements </p>
                <button onClick={tenantDocuments} className="btn btn-large btn-primary"> View Documents </button>
            </div>             
      </div>
    </div>  */}
    


  </div>
  
      
    )
}


//export default Home;