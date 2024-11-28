import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../Visitors/visitors.css';
import ApexCharts from 'apexcharts';

function Visitors(){



    //charts

    document.addEventListener("DOMContentLoaded", function(arg) {
        // do something cool
        VisitorAnalytics();
      });
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

    return(
        <div className="container">
            <div className="chartsDiv">
                <div className="visitorChartsHeading">
                    <h1> Visitor Stats OverView </h1>
                </div>
                <div>
                    <div id="chartsVisitor"></div>
                </div>

                <div className='visitorLog'>
                    <div> </div> 

                </div>
                
            </div>
        </div>
    )

}

export default Visitors;