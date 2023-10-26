import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Table.scss";
import Tick from "../../../assets/icons/tick1.png";
import Delete from "../../../assets/icons/delete.png";
import Watch from "../../../assets/icons/watch.png";
import Theme from "../../../Theme/Theme";
import Tooltip from "@mui/material/Tooltip";
import DeletePopUp from "../../../Components/Common/DeletePopUp";
import axios from "axios";
import apiService from "../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../Helper/Message";
import Loading from "../../../Components/Common/Loading/index";
import { useSelector } from "react-redux";


const TableData = ({ searchVal, setShowDelete }) => {
  const lightTheme = Theme();
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [data, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true); 
  const reload = useSelector((state) => state.auth.reload);

  useEffect(() => {
    getData(); 
  }, [reload]);

  useEffect(() => {
    searchFilter();
  }, [searchVal]);

  const getData = async () => {
    try {
      setCustomer([]);
      const response = await apiService(
        "GET",
        "/customer/get-customer",
        {},
        {}
      );
      if (response.success) {
        setCustomer(response.data);
        setFilterData(response.data);
        setLoading(false);
      } else {
        ErrorMessage(response.message);
        setLoading(false); // Set loading to false on error
      }
    } catch (error) {
      console.error("Request failed:", error);
      ErrorMessage("Api Error", error);
      setLoading(false); // Set loading to false on error
    }
  };

  
  const excludedKeys = ["_id", "__v", "NationalId", "CustomerType"];

  const tableHeaders = Object.keys(data[0] || {}).filter(
    (key) => !excludedKeys.includes(key)
  );

  const searchFilter = () => {
    if (!searchVal) {
      setFilterData(data && data);
    } else {
      const filter =
        data &&
        data.filter((order) => {
          return tableHeaders.some((header) =>
            order[header].toLowerCase().includes(searchVal)
          );
        });
      setFilterData(filter);
    }
  };

  const reloadData = ()=> {
    setCustomer([]);
    getData();
  }

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{
                      borderTopLeftRadius: index === 0 ? "10px" : "0px",
                      borderBottomLeftRadius: index === 0 ? "10px" : "0px",
                      borderTopRightRadius:
                        index === tableHeaders.length ? "10px" : "0px",
                      borderBottomRightRadius:
                        index === tableHeaders.length ? "10px" : "0px",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
                <TableCell
                  align="right"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.map((row, index) => (
                <TableRow
                  key={row.index}
                  style={{
                    borderRadius: "10px", // Border radius for odd rows
                  }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {tableHeaders.map((header, index) => (
                    <TableCell
                      key={header}
                      align="right"
                      style={{
                        borderTopLeftRadius: index === 0 ? "10px" : "0px",
                        borderBottomLeftRadius: index === 0 ? "10px" : "0px",
                      }}
                    >
                      {header === "date"
                        ? formatDateTime(row[header])
                        : row[header]}
                    </TableCell>
                  ))}
                  <TableCell
                    align="right"
                    style={{
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    <div className="mainActions" >
                      <DeletePopUp circleIcon={true} id={row._id} reloadData={reloadData} url={"/customer/delete-customer"} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TableData;
