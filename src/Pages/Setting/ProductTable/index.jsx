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
import DeletePopUp from "../../../Components/Common/DeletePopUp";
import EditStock from "../../../Pages/warehouseManagement/EditStock";
import apiService from "../../../Services/apiService";
import { ErrorMessage } from "../../../Helper/Message";
import Loading from "../../../Components/Common/Loading";
import { setPartData } from "../../../Redux/slice/sparePart";

const ProductTable = () => {
  const lightTheme = Theme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const reloadProductTable = useSelector(
    (state) => state.auth.reloadProductTable
  );

  const getProduct = async () => {
    try {
      setRows([]);
      setFilterData([]);
      setLoading(true);

      const response = await apiService(
        "GET",
        "/spareParts/get/spare-parts",
        {},
        null
      );
      if (response.success) {
        if (response.data.length > 0) {
          const partData = response.data.map((item) => ({
            partName: item.partName,
            objectId: item._id,
          }));
          dispatch(setPartData(partData));
          setRows(response.data || []);
          setFilterData(response.data || []);
          setLoading(false);
        }
      }
    } catch (error) {
      ErrorMessage("Api Error", error);
    }
  };

  useEffect(() => {}, [rows]);

  useEffect(() => {
    getProduct();
  }, [reloadProductTable]);

  //   useEffect(() => {
  //     searchFilter();
  //   }, [searchVal]);

  const reloadData = () => {
    getProduct();
  };

  const notRequired = ["_id", "__v", "date"];
  const allTableHeaders = Object.keys(rows[0] || {});
  const tableHeaders = allTableHeaders.filter(
    (field) => !notRequired.includes(field)
  );

  //   const searchFilter = () => {
  //     if (!searchVal) {
  //       setFilterData(rows);
  //     } else {
  //       const filter = rows.filter((order) => {
  //         return tableHeaders.some((header) =>
  //           order[header].toLowerCase().includes(searchVal)
  //         );
  //       });
  //       setFilterData(filter);
  //     }
  //   };

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
                {/* Actions */}
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
                      borderBottomLeftRadius: cellIndex === 0 ? "10px" : "0px",
                    }}
                  >
                    {cellValue === "image" ? (
                      <img src={`${row.image}`} alt="Image" height={30} />
                    ) : cellValue === "Quantity" ? (
                      row["Quantity"] ? (
                        row["Quantity"]
                      ) : (
                        "Null"
                      )
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
                  {/* <div className="mainActionsProduct">
                    

                    <DeletePopUp
                      circleIcon={false}
                      id={row["_id"]}
                      url={
                        "/spareParts/delete/stock/spare-part"
                      }
                      reloadData={reloadData}
                    />
                  </div> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ProductTable;
