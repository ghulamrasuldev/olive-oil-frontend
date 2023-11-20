import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import "./style.scss";
import apiService from "../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../Helper/Message";
import { IoIosClose } from "react-icons/io";
import './style.scss'
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

export default function ProcessingPrice({ reloadData }) {
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
    setError(null);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isValidInput = /^\d+$/.test(value);
    if (isValidInput) {
      setPrice(value);
      setError(null);
    } else {
      setPrice("");
      setError("Please enter a valid price");
    }
  };

  const handleCancel = () => {
    handleClose();
    setPrice("");
    setError("");
  };

  const handleUpdate = async () => {
    try {
      if (/^\d+$/.test(price) && price !== "") {
          const authToken = localStorage.getItem("authToken");
          console.log('.,.,',price)
        const res = await apiService(
          "POST",
          "/Processing/update/olive-price",
          { "x-usertoken": authToken },
          {price:price}
        );
        if (res.success) {
          SuccessMessage(res.message);
          reloadData();
          handleCancel();
        } else {
          ErrorMessage(res.message);
        }
      } else {
        setError("Please enter a valid price");
      }
    } catch (error) {
      console.log("Error in updating the processing price", error);
    }
  };

  return (
    <div className="mainCon">
          <Tooltip title="Adjust Price" placement="top">
          <p onClick={handleOpen} className="iconText">
        <HiAdjustmentsHorizontal size={20} className="icon" color="rgb(60, 126, 156)"/>
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
            <div className="mainPriceBox">
              <div className="textAndClose">
                <p className="p1">
                  Adjust <span>Processing</span> Price
                </p>
                <IoIosClose size={25} onClick={handleCancel} className="icon" />
              </div>

              <div className="form">
                {error && <p className="error">{error}</p>}
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
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
