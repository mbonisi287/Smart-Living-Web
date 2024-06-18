import React, { useState, useEffect } from 'react';
import axios from 'axios';
/*import { BarChart } from '@mui/x-charts/BarChart';*/
import ApexCharts from 'apexcharts';

function MeterUsage() {

    var options = {
        chart: {
          type: 'line'
        },
        series: [{
          name: 'sales',
          data: [30,40,35,50,49,60,70,91,125]
        }],
        xaxis: {
          categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
        }
      }
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();
      
    return(
        <div className="container">
            <h2> Meter Usage </h2>   

            <div id="chart">
            </div>

            {/* <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />

                              <BarChart
                    series={[
                        { data: [35, 44, 24, 34] },
                        { data: [51, 6, 49, 30] },
                        { data: [15, 25, 30, 50] },
                        { data: [60, 50, 15, 25] },
                    ]}
                    height={290}
                    xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    /> */} 


        </div>
    )
}

export default MeterUsage;