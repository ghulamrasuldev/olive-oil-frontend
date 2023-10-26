import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Style.scss";
import Slider from "../../Slider/slider";
import { Tooltip } from "@mui/material";
import Watch from "../../../../assets/icons/watch.png";
import Theme from "../../../../Theme/Theme";
import apiService from "../../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../../Helper/Message";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "white",
  // border: '2px solid #000',
  boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.27)",
  p: 4,
  borderRadius: "10px",
};

export default function Stations({ status,reload,orderId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const lightTheme = Theme();
  const [selectedStation, setSelectedStation] = React.useState('Hopper');
  const updateStatus =async () => {
    try {
      const authToken=localStorage.getItem('authToken')
      const res = await apiService('POST', `/order/update-order/${orderId}`, { 'x-usertoken': authToken }, { newStatus:selectedStation })
      if (res.success) {
        SuccessMessage(res.message);
        reload();
        handleClose();
      } else {
        ErrorMessage(res.message);
        handleClose();
      }

    } catch (error) {
      console.log(error)
      ErrorMessage("Api Error",error)
    }
  }

  React.useEffect(() => {
  },[selectedStation])

  return (
    <div className="stationMain">
      <Tooltip title={status} placement="top" onClick={handleOpen}>
        <div
          className="circle"
          style={{ backgroundColor: `${lightTheme.yellowIcon}` }}
        >
          <img src={Watch} alt="watch" height={17} />
        </div>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="insideMain">
            <p className="p2">Station</p>
            <Slider selectedStation={setSelectedStation} />
          </div>
          <button className="saveBtn" onClick={() =>updateStatus()}>
            Save
          </button>
        </Box>
      </Modal>
    </div>
  );
}
