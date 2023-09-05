import React, {useState,useEffect} from 'react'
import { employRolesData } from '../../../Components/Common/Table/constant';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./../Table/Style.scss";
import Watch from "../../../assets/icons/TableEye.png";
import Theme from "../../../Theme/Theme";
import Tooltip from "@mui/material/Tooltip";
import Delete from "../../../assets/icons/delete.png"
import Tick from "../../../assets/icons/tick1.png"

const Employeetable  = ({ searchVal }) => {
    const lightTheme = Theme();
    const [rows, setRows] = useState(employRolesData);
    const [filterData, setFilterData] = useState(employRolesData);
  
    useEffect(() => {
      searchFilter();
    }, [searchVal]);
  
    const searchFilter = () => {
      if (!searchVal) {
        setFilterData(rows);
      } else {
        const filter = rows.filter((employee) => {
          return (
            employee.employId.toLowerCase().includes(searchVal) ||
            employee.employName.toLowerCase().includes(searchVal) ||
            employee.role.toLowerCase().includes(searchVal) ||
            employee.status.toLowerCase().includes(searchVal) 

          );
        });
        setFilterData(filter);
      }
    };
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                
                Employee ID
              </TableCell>
              <TableCell align="right">Employee Name</TableCell>
              <TableCell align="right">Rolel</TableCell>
              <TableCell align="right">Status</TableCell>
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
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  {row.employId}
                </TableCell>
                <TableCell align="right">{row.employName}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell
                  align="right"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <div className="mainActionsW">
                    <Tooltip title="View" placement="top">
                      <div
                        className="circle"
                        style={{ backgroundColor: `${lightTheme.yellowIcon}` }}
                      >
                        <img src={Watch} alt="watch" height={20} />
                        
                      </div>
                    </Tooltip>
                    <Tooltip title="View" placement="top">
                      <div
                        className="circle"
                        style={{ backgroundColor: `${lightTheme.greenIcon}` }}
                      >
                        <img className='tickImage' src={Tick} alt="tick" height={15} />
                        
                      </div>
                    </Tooltip>
                    <Tooltip title="View" placement="top">
                      <div
                        className="circle"
                        style={{ backgroundColor: `${lightTheme.darkRed}` }}
                      >
                        <img src={Delete} alt="delete" height={20} />
                        
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

export default Employeetable