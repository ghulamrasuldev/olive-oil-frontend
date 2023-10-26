import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Style.scss";
import Qrimg from "../../../assets/icons/QRCode.png";
import Print from "../../../assets/icons/print.png";
import QRCode from "qrcode.react";
import html2pdf from "html2pdf.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
    width: 500,
  backgroundColor:'white',
//   border: "2px solid #000",
  boxShadow:'0px 4px 20px 0px rgba(238, 238, 238, 0.27)',
    p: 4,
  borderRadius:'10px'
};

export default function QrModal({ orderData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generatePDF = () => {
    const qrCodeBlock = document.querySelector(".qrcodeBlock");
  
    html2pdf().from(qrCodeBlock).save("qrcode.pdf");
    handleClose();
  };

  return (
    <div className="mainQRcode">
      <div onClick={handleOpen} className="qrcodeDiv">
        <img src={Qrimg} alt="qrimg" height={20} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="qrcodeBlock">
            <p>Your QR code is:</p>
            <QRCode value={JSON.stringify(orderData)} size={250}/>
          </div>
          <div className="buttons">
            <div className="cancleButton" onClick={() => handleClose()}>
              Cancle
            </div>
            <div className="printButton" onClick={generatePDF}>
              <img src={Print} alt="printer" height={20} />
              <p>Print Code</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
