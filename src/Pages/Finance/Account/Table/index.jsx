import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Style.scss";
import Theme from "../../../../Theme/Theme";
import Arrow from "../../../../assets/icons/filldarrow.png";
import apiService from "../../../../Services/apiService";
import DeletePopUp from "../../../../Components/Common/DeletePopUp";
import { useSelector } from "react-redux";

const TableCom = ({ searchVal, activeBtn, selectedTab }) => {
  const lightTheme = Theme();
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  const tabsDetail = useSelector((state) => state.auth.tabsDetail);
  const getSelectedTab = async () => {
    try {
      setIsLoading(true);
      if (selectedTab) {
        const response = await apiService(
          "GET",
          `/Finance/selected/account-tab/${selectedTab}`,
          {},
          {}
        );
        if (response.success) {
          setIsLoading(false);
          const data = response?.data;
          if (data) {
            const tabDetails = data.tabDetails || [];
            const excludeColumn = ["_id"];
            const headers = Object.keys(tabDetails[0] || {});
            const filteredHeaders = headers.filter(
              (header) => !excludeColumn.includes(header)
            );
            setRows(data);
            setFilterData(data);
            setTableHeaders(filteredHeaders);
          }
        }
      }
    } catch (error) {
      console.log("Error in fetching the selected tab", error);
    }
  };
  useEffect(() => {
    getSelectedTab();
    console.log("calling1");
  }, [selectedTab]);
  useEffect(() => {
    getSelectedTab();
    console.log("calling2");
  }, [tabsDetail]);

  // const tableHeaders = Object.keys(rows[0] || {});

  // useEffect(() => {
  //   searchFilter();
  // }, [searchVal]);

  // const searchFilter = () => {
  //   if (!searchVal) {
  //     setFilterData(rows);
  //   } else {
  //     const filter = rows.filter((order) => {
  //       return order.name.toLowerCase().includes(searchVal);
  //     });
  //     setFilterData(filter);
  //   }
  // };

  const toggleRow = (row) => {
    const updatedSelectedRows = selectedRows.includes(row)
      ? selectedRows.filter((selectedRow) => selectedRow !== row)
      : [...selectedRows, row];
    setSelectedRows(updatedSelectedRows);
    activeBtn(false);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      activeBtn(true);
    } else {
      setSelectedRows([...filterData]);
      activeBtn(false);
    }
    setSelectAll(!selectAll);
  };

  return (
    <TableContainer className="accountTable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell className="borHead">
              <input
                type="checkBox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </TableCell> */}

            {tableHeaders.map((header, index) => (
              <TableCell key={index} className={index === 0 ? "borHead" : ""}>
                {header}
              </TableCell>
            ))}
            <TableCell
              style={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData?.tabDetails?.map((row, index) => (
            <TableRow
              key={row.index}
              style={{
                borderRadius: "10px", // Border radius for odd rows
              }}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell
                component="th"
                scope="row"
                style={{
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRow(row)}
                />
              </TableCell> */}
              {Object.entries(row).map(
                ([key, cellValue], cellIndex) =>
                  key !== "_id" && (
                    <TableCell
                      key={cellIndex}
                      align="right"
                      className={cellIndex === 0 ? "borHead bor" : "bor"}
                      onClick={() =>
                        console.log(
                          "id",
                          row["id"],
                          row["name"],
                          filterData.tabName
                        )
                      }
                    >
                      {cellValue}
                    </TableCell>
                  )
              )}
              <TableCell className="lastCell">{filterData.tabName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCom;
