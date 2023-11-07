import React, { useState } from "react";
import "./Style.scss";
import { Link } from "react-router-dom";
import Search from "../../../assets/icons/search.png";
import EmployeeTable from "./Table";
import AddEmployee from "./AddEmployee";
import LeaveForm from "./Leave";
import { FaLessThanEqual } from "react-icons/fa";
import Profile from "./Profile";
import CustomSearchInput from "../../../Components/Common/customSearch";

const Employees = () => {
  const [searchBar, setSearchBar] = useState();
  const [addEmp, setAddEmp] = useState(0);
  const [leaveForm, setLeaveForm] = useState(0);
  const [show, setShow] = useState(true);
  const address = "/human-resources/employees";
  return (
    <div className="employeesMain">
      {show ? (
        <>
          <div className="employeeBtn">
            <p className="p1">Employees</p>
            <div className="btns">
              <LeaveForm address={address} />
              <AddEmployee address={address} />

              <CustomSearchInput
                placeholder="search"
                onSearchChange={setSearchBar}
                iconShow={true}
              />
            </div>
          </div>
          <div className="empTable">
            <EmployeeTable searchVal={searchBar} setShow={setShow} />
          </div>
        </>
      ) : (
        <Profile setShow={setShow} />
      )}
    </div>
  );
};

export default Employees;
