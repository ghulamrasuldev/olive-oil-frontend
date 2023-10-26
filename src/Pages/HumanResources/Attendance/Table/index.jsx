import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Style.scss";
import File from "../../../../assets/icons/file.png";
import Tick from "../../../../assets/icons/tick1.png";
import View from "../../../../assets/icons/TableEye.png";
import Theme from "../../../../Theme/Theme";
import Tooltip from "@mui/material/Tooltip";

const AttendanceTable = ({data}) => {
  const lightTheme = Theme();
  const [rows, setRows] = useState(data);

  const tableHeaders = Object.keys(data[0] || {});


  return (
    <TableContainer className="AttendanceTable">
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
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.index}
              style={{
                borderRadius: "10px", // Border radius for odd rows
              }}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.values(row).map((cellValue, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align="right"
                  style={{
                    borderTopLeftRadius: cellIndex === 0 ? "10px" : "0px",
                    borderBottomLeftRadius: cellIndex === 0 ? "10px" : "0px",
                  }}
                >
                  {cellIndex === 4 ? (
                    <div className="checkBoxMain">
                      {cellValue === "present" ? (
                        <div className="check">
                          <img src={Tick} alt="tick" height={13} />
                        </div>
                      ) : (
                        <div className="notCheck"></div>
                      )}
                    </div>
                  ) : (
                    cellValue
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
                <div className="mainActionsAtt">
                  <Tooltip title="View" placement="top">
                    <div
                      className="circle"
                      style={{ backgroundColor: `${lightTheme.yellowIcon}` }}
                    >
                      <img src={View} alt="view" height={20} />
                    </div>
                  </Tooltip>
                  <Tooltip title="File" placement="top">
                    <div
                      className="circle"
                      style={{ backgroundColor: `${lightTheme.yellowIcon}` }}
                    >
                      <img src={File} alt="file" height={20} className="img2" />
                    </div>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
