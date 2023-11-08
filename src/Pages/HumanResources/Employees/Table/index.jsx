import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Style.scss";
import Edit from "../../../../assets/icons/edit.png";
import Theme from "../../../../Theme/Theme";

import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../../../Helper/Message";
import apiService from "../../../../Services/apiService";
import { formatDateTime } from "../../../../Helper/date";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeData } from "../../../../Redux/slice/authSlice";
import Loading from "../../../../Components/Common/Loading/index";
import UniversalTableSkeleton from "../../../../Helper/tableSkeleton";

const EmployeeTable = ({ searchVal, setShow }) => {
  const lightTheme = Theme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setIsloading] = useState(false);
  const reloadEmployee = useSelector((state) => state.auth.reloadEmployeeTable);

  useEffect(() => {
    getEmployees();
  }, [reloadEmployee]);

  const getEmployees = async () => {
    try {
      setIsloading(true);
      setRows([]);
      setFilterData([]);
      const response = await apiService(
        "GET",
        "/HumanResource/employees/get-employee"
      );
      if (response.success) {
        let data = response.data;
        setIsloading(false);
        setRows(data);
        setFilterData(data);
      } else {
        ErrorMessage(response.message);
      }
    } catch (error) {
      console.log("error in getting employee");
      ErrorMessage(error);
    }
  };

  useEffect(() => {
    searchFilter();
  }, [searchVal]);

  const notInclude = [
    "_id",
    "lname",
    "image",
    "Attachment",
    "Mail",
    "Phone",
    "Nationality",
    "Address",
    "Birth",
    "__v",
  ];

  const tableHeaders = Object.keys(rows[0] || {}).filter(
    (key) => !notInclude.includes(key)
  );

  const searchFilter = () => {
    if (!searchVal) {
      setFilterData(rows);
    } else {
      const filter = rows.filter((order) => {
        return tableHeaders.some((header) =>
          order[header].toLowerCase().includes(searchVal)
        );
      });
      setFilterData(filter);
    }
  };

  const updateEmployee = (data) => {
    setShow(false);
    dispatch(EmployeeData(data));
  };

  return (
    <>
      {
        loading ? <Loading /> : (
    <TableContainer className="employeeTable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => {
              const displayName = header === "fname" ? "Name" : header;

              return (
                <TableCell
                  key={index}
                  style={{
                    borderTopLeftRadius: index === 0 ? "10px" : "0px",
                    borderBottomLeftRadius: index === 0 ? "10px" : "0px",
                  }}
                >
                  {displayName}
                </TableCell>
              );
            })}
            <TableCell
              align="right"
              style={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            filterData.map((row, index) => (
              <TableRow
                key={row.index}
                style={{
                  borderRadius: "10px", // Border radius for odd rows
                }}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {tableHeaders.map((cellValue, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    align="right"
                    style={{
                      borderTopLeftRadius: cellIndex === 0 ? "10px" : "0px",
                      borderBottomLeftRadius: cellIndex === 0 ? "10px" : "0px",
                    }}
                  >
                    {cellValue === "date"
                      ? formatDateTime(row[cellValue])
                      : row[cellValue]}
                  </TableCell>
                ))}
                <TableCell
                  align="right"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <div className="mainActionsE">
                    <Tooltip title="Edit" placement="top">
                      <div>
                        <Link
                          to={`${row.fname}/id/${row.EmployeeId}`}
                          onClick={() => updateEmployee(row)}
                        >
                          <img src={Edit} alt="edit" height={20} />
                        </Link>
                      </div>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
        }

      </>
  );
};

export default EmployeeTable;
