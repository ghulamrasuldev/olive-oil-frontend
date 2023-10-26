import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Style.scss";
import Theme from "../../../Theme/Theme";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setSelectedStockData,
  openEditStock,
  openEditOilStock,
} from "../../../Redux/slice/stockEdit";
import DeletePopUp from "../DeletePopUp";
import EditStock from "../../../Pages/warehouseManagement/EditStock";
import apiService from "../../../Services/apiService";
import { ErrorMessage } from "../../../Helper/Message";
import Loading from "../Loading";
import { setPartData } from "../../../Redux/slice/sparePart";
import {HiOutlineAdjustments} from 'react-icons/hi'

const WarehouseOilTable = ({ searchVal, data, address, check }) => {
  const lightTheme = Theme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const reloadOrderBill = useSelector((state) => state.auth.reloadOrderBill);

  const getOrderBill = async () => {
    try {
      setRows([]);
      setFilterData([]);
      setLoading(true);

      if (check) {
        const response = await apiService(
          "GET",
          "/stock/order-bills",
          {},
          null
        );
        if (response.success) {
          setRows(response.data || []);
          setFilterData(response.data || []);
          setLoading(false);
        }
      } else {
        const response = await apiService(
          "GET",
          "/spareParts/get/spare-parts",
          {},
          null
        );
        if (response.success) {
          if (response.data.length > 0) {
            const partData = response.data.map((item) => ({
              partName: item.SparePart,
              objectId: item._id,
            }));
            dispatch(setPartData(partData));
          }
        }
        const getPart = await apiService(
          "GET",
          "/spareParts/get/spare-part-amount",
          {},
          {}
        );
        if (getPart.success) {
          setRows(getPart.data || []);
          setFilterData(getPart.data || []);
          setLoading(false);
        }
      }
    } catch (error) {
      ErrorMessage("Api Error", error);
    }
  };

  useEffect(() => {}, [rows]);

  useEffect(() => {
    getOrderBill();
  }, [reloadOrderBill]);

  useEffect(() => {
    searchFilter();
  }, [searchVal]);

  const reloadData = () => {
    getOrderBill();
  };
  const notRequired = check
    ? ["_id", "__v", "date"]
    : ["_id", "__v", "ProductId"];
  const allTableHeaders = Object.keys(rows[0] || {});
  const tableHeaders = allTableHeaders.filter(
    (field) => !notRequired.includes(field)
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

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  }

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
                    borderRadius: "10px",
                  }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {tableHeaders.map((cellValue, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      align="right"
                      style={{
                        borderTopLeftRadius: cellIndex === 0 ? "10px" : "0px",
                        borderBottomLeftRadius:
                          cellIndex === 0 ? "10px" : "0px",
                      }}
                    >
                      {/* {cellValue === "date" ? (
                      formatDate(row[cellValue])
                    ) : cellValue === "SparePart" && check === false ? (
                      <img src={`${row.SparePart}`} alt="Image" height={30} />
                    ) : (
                      row[cellValue]
                    )} */}
                      {cellValue === "date" ? (
                        formatDate(row[cellValue])
                      ) : cellValue === "SparePart" && check === false ? (
                        <img src={`${row.SparePart}`} alt="Image" height={30} />
                      ) : cellValue === "Reason" &&
                        check === true &&
                        row["Reason"] !== "New Inventory" ? (
                              <span className="adjusted">{row[cellValue]}<HiOutlineAdjustments size={15} /></span>
                      ) : (
                        row[cellValue]
                      )}
                    </TableCell>
                  ))}
                  <TableCell
                    align="right"
                    style={{
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    <div className="mainActionsW">
                      {/* {check && (
                      <div onClick={() => handleData(row)}>
                        <EditStock address={address} />
                      </div>
                    )} */}

                      <DeletePopUp
                        circleIcon={false}
                        id={row["_id"]}
                        url={
                          check
                            ? "/stock/delete-bill"
                            : "/spareParts/delete/stock/spare-part"
                        }
                        reloadData={reloadData}
                      />
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

export default WarehouseOilTable;
