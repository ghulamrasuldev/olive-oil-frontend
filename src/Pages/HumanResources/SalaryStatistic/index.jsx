import React, { useEffect, useState } from "react";
import "./Style.scss";
import Arrow from "../../../assets/icons/circleArrow.png";
import ReactApexChart from "react-apexcharts";
import { ErrorMessage } from "../../../Helper/Message";
import apiService from "../../../Services/apiService";

const SalaryStatistic = () => {
  const [salaryGraph, setGraph] = useState({
    series: [
      {
        name: "Last Year",
        data: [30000, 35000, 50000, 70000, 70000, 75000],
      },
      {
        name: "This Year",
        data: [60000, 60000, 80000, 80000, 80000, 90000],
      },
    ],
    options: {
      chart: {
        // height: 350,
        type: "area",

        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      xaxis: {
        categories: ["June", "July", "Aug", "Sep", "Oct", "Nov"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  const [count, setCount] = useState({
    empCount: "",
  });
  const getEmployeeCount = async () => {
    try {
      const res =await apiService("GET", "/HumanResource/employees/get-employee");
      if (res) {
        setCount({
          empCount: res.count,
        });
      }
    } catch (error) {
      console.log("Error in employee Salary Statistic", error);
      ErrorMessage(error);
    }
  };
  useEffect(() => {
    getEmployeeCount();
  }, []);
  return (
    <div className="mainSalary">
      {/* cards */}
      <div className="cards">
        <div className="mainCard">
          <div className="imgDiv">
            <img src={Arrow} alt="Arrow" />
            <p className="p1">Employees</p>
          </div>
          <p className="p2">{count && count.empCount}</p>
        </div>
        <div className="mainCard">
          <div className="imgDiv">
            <img src={Arrow} alt="Arrow" />
            <p className="p1">Total Orders</p>
          </div>
          <p className="p2">150</p>
        </div>
        <div className="mainCard">
          <div className="imgDiv">
            <img src={Arrow} alt="Arrow" />
            <p className="p1">Total Clients</p>
          </div>
          <p className="p2">150</p>
        </div>
      </div>
      {/* graph */}
      <div className="salaryGraph">
        <div className="salaryMain">
          <p className="p1"> Salary Statistic Performance</p>
        </div>
        <div className="graph">
          <ReactApexChart
            options={salaryGraph.options}
            series={salaryGraph.series}
            type="area"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryStatistic;
