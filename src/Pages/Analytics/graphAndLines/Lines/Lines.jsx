import React, { useState } from "react";
import "./Style.scss";
import Theme from "../../../../Theme/Theme";
import ReactApexChart from "react-apexcharts";


const Lines = () => {
  const lightTheme = Theme();
  const [graph, setGraph] = useState({
    series: [
      {
        name: "New Orders",
        data: [44, 55, 41, 98, 10, 23],
      },
      {
        name: "In Processed",
        data: [53, 32, 33, 23, 91, 10],
      },
      {
        name: "Processed Olives",
        data: [12, 17, 11, 22, 10, 5],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false, // Disable the download menu for the graph image
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          // borderRadius: 8, // Set the desired border radius value
          barHeight: "20px",
        },
      },
      colors: ["#20558A", "#F5BF00", "#39B54A"],
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false, // Remove x-axis label line
        },
        categories: [
          "Line-01",
          "Line-02",
          "Line-03",
          "Line-04",
          "Line-05",
          "Line-06",
        ],
      },
      yaxis: {
        axisBorder: {
          show: false, // Remove y-axis label line
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
      grid: {
        show: false, // Hide both vertical and horizontal grid lines
      },
    },
  });
  return (
    <div className="linesMain">
      
      <p className="p1">Production Lines</p>
      <div
        className="linesDiv"
        style={{ backgroundColor: `${lightTheme.componentBackground}` }}
      >

        <div className="linesDashboard">
          <p className="p2">Production Capacity</p>
          <div>
            <ReactApexChart
              options={graph.options}
              series={graph.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lines;
