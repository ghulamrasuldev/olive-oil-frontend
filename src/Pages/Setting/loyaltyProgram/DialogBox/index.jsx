import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BiSolidEdit } from "react-icons/bi";
import "./style.scss";
import apiService from "../../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../../Helper/Message";
import { IoIosClose } from "react-icons/io";
import { Tooltip } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  outline: "none",
  border: "none",
  borderRadius: "8px",
  p: 3,
};

export default function UpdateLoyaltyProgram({ program, reloadData }) {
  const [open, setOpen] = React.useState(false);
  const [percentage, setPercentage] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
    setError(null);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isValidInput = /^\d{0,2}$/.test(value);
    if (isValidInput) {
      setPercentage(value);
      setError(null);
    } else {
      setPercentage("");
      setError("Please enter a valid percentage (numeric, max 2 digits)");
    }
  };

  const handleCancel = () => {
    handleClose();
    setPercentage("");
    setError("");
  };

  const handleUpdate = async () => {
    try {
      if (/^\d{0,2}$/.test(percentage) && percentage !== "") {
        const authToken = localStorage.getItem("authToken");
        const res = await apiService(
          "POST",
          "/Loyalty/update-percentage",
          { "x-usertoken": authToken },
          { percentage: percentage, program: program }
        );
        if (res.success) {
          SuccessMessage(res.message);
          reloadData();
          handleCancel();
        } else {
          ErrorMessage(res.message);
        }
      } else {
        setError("Please enter a valid percentage (numeric, max 2 digits)");
      }
    } catch (error) {
      console.log("Error in updating the loyalty's percentage", error);
    }
  };

  return (
    <div>
      <Tooltip title="Update" placement="top">
      <p onClick={handleOpen}>
        <BiSolidEdit size={15} className="icon" />
      </p>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCancel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="maindialogBox">
              <div className="textAndClose">
                <p className="p1">
                  Update <span>{program}</span> Percentage
                </p>
                <IoIosClose size={25} onClick={handleCancel} className="icon" />
              </div>

              <div className="form">
                {error && <p className="error">{error}</p>}
                <input
                  type="text"
                  placeholder="Percentage"
                  value={percentage}
                  onChange={handleInputChange}
                />
                <button onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
