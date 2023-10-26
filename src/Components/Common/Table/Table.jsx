import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Style.scss";
import Tick from "../../../assets/icons/tick1.png";
import Delete from "../../../assets/icons/delete.png";
import Watch from "../../../assets/icons/watch.png";
import Theme from "../../../Theme/Theme";
import { tableData } from "./constant";
import QrModal from "../../../Pages/orderManagement/QRmodal/QrModal";
import Stations from "./Station";
import Tooltip from "@mui/material/Tooltip";
import DeletePopup from "../DeletePopUp";
import apiService from "../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../Helper/Message";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import TransactionOrder from "../../../Pages/orderManagement/TransactionOrder";

const TableCom = ({ tabVal, searchVal, qrcode, setShowDelete }) => {
  const lightTheme = Theme();
  const [filterData, setFilterData] = useState([]);
  const [dataa, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const reloadOrder = useSelector((state) => state.auth.reloadOrder);

  const getOrders = async () => {
    try {
      setData([]);
      setLoading(true);
      const response = await apiService("GET", "/order/all-orders", {}, {});
      if (response.success) {
        setData(response.data);
        setFilterData(response.data);
        setLoading(false);
      }
    } catch (error) {
      ErrorMessage(error);
    }
  };

 

  const reload = () => {
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, [reloadOrder]);

  useEffect(() => {
    filterTable();
  }, [tabVal]);

  const filterTable = () => {
    if (tabVal === "All") {
      setFilterData(dataa);
    } else {
      const filter = dataa.filter((order) => order.Status === tabVal);
      setFilterData(filter);
    }
  };

  useEffect(() => {
    searchFilter();
  }, [searchVal]);

  const notRequired = ["ObjId"];
  const AlltableHeaders = Object.keys(dataa[0] || {});
  const tableHeaders = AlltableHeaders.filter(
    (field) => !notRequired.includes(field)
  );

  const searchFilter = () => {
    if (!searchVal) {
      setFilterData(dataa);
    } else {
      const filter = dataa.filter((order) => {
        return tableHeaders.some((header) =>
          order[header].toLowerCase().includes(searchVal)
        );
      });
      setFilterData(filter);
    }
  };

  return (
    <TableContainer>
      {loading ? (
        <Loading />
      ) : (
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
                  borderRadius: "10px",
                }}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {tableHeaders.map((key, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    align="right"
                    style={{
                      borderTopLeftRadius: cellIndex === 0 ? "10px" : "0px",
                      borderBottomLeftRadius: cellIndex === 0 ? "10px" : "0px",
                    }}
                  >
                    {row[key]}
                  </TableCell>
                ))}
                <TableCell
                  align="right"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <div className="mainActions">
                    <Stations
                      status={row["Status"]}
                      orderId={row["OrderId"]}
                      reload={reload}
                    />
                    <TransactionOrder orderId={row["OrderId"]} reload={reload} />

                    <DeletePopup
                      circleIcon={true}
                      id={row.ObjId}
                      url={"/order/delete-order"}
                      reloadData={reload}
                    />
                    {qrcode && (
                      <Tooltip title="QR Code" placement="top">
                        <div>
                          <QrModal orderData={row} />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default TableCom;
