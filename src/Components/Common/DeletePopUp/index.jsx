

import * as React from "react";
import "./style.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Fade, Tooltip } from "@mui/material";
import Delete from "../../../assets/icons/redDelete.png";
import DeleteRed from "../../../assets/icons/delete.png";
import Backdrop from '@mui/material/Backdrop';
import Theme from "../../../Theme/Theme";
import apiService from "../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../Helper/Message";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  borderRadius: " 10px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.52)",
  padding: "15px 0",
};

export default function DeletePopUp({ circleIcon, id, url, reloadData,message }) {
  const lightTheme = Theme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteCustomer =async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await apiService('DELETE', `${url}/${id}`, {'x-usertoken':authToken}, {})
      if (response.success) {
        SuccessMessage(response.message)
        reloadData();
        handleClose();
      } else {
        ErrorMessage(response.message)
      }
    } catch (error) {
      ErrorMessage("API Error",error)
    }
  }

  return (
    <div>
      {circleIcon ? (
        <Tooltip title="Delete" placement="top">
          <div
            className="circle"
            style={{ backgroundColor: `${lightTheme.darkRed}` }}
            onClick={() => {
              handleOpen();
            }}
          >
            <img src={DeleteRed} alt="delete" height={18} />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="Delete" placement="top">
          <div
            className="circle"
            onClick={() => {
              handleOpen();
            }}
          >
            <img src={Delete} alt="delete" height={20} />
          </div>
        </Tooltip>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="deleteMain">
              <p>{message?`${message}`:'Are you sure to delete this?'}</p>
              <div className="buttons">
                <button className="buttonCancel" onClick={handleClose}>
                  Cancel
                </button>
                <button className="buttonDelete" onClick={()=>handleDeleteCustomer()}>Delete</button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
