import React, { useEffect, useState } from "react";
import "./Style.scss";
import { EmployeeData } from "./constant";
import Profile from "../../../assets/icons/profile.jpg";
import { ErrorMessage } from "../../../Helper/Message";
import apiService from "../../../Services/apiService";
import { formatDateTime } from "../../../Helper/date";
import { EmployeeDuration } from "../../../Helper/dateFun";
import { Skeleton } from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const getEmployees = async () => {
    try {
      setEmployees([]);
      const response = await apiService(
        "GET",
        "/HumanResource/employees/get-employee"
      );
      if (response.success) {
        let data = response.data;

        // setTimeout(() => setEmployees(data), 2000);
        setEmployees(data);
      } else {
        ErrorMessage(response.message);
      }
    } catch (error) {
      console.log("Employees Overview error", error);
      ErrorMessage(error);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="employeeMain">
      <div className="insideMainEmp">
        <p className="employee">Employees</p>
        <div className="employeeList">
          {employees.length > 0 ? (
            employees.map((data, index) => {
              return (
                <div key={index} className="employeeInfo">
                  <div className="imgDiv">
                    {data.image && <img src={data.image} alt="profile" />}
                    <div className="bioDiv">
                      {data.fname && (
                        <p>
                          {data.fname} {data.lname}
                        </p>
                      )}
                      {data.Designation && (
                        <p className="gp">{data.Designation}</p>
                      )}
                    </div>
                  </div>
                  <div className="expDiv">
                    <p className="gp">{EmployeeDuration(data.JoiningDate)}</p>
                    <p>{formatDateTime(data.date)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="skeleton">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation="wave"
              />
              <div className="skeletonText">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
