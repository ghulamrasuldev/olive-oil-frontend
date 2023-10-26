import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Style.scss";
import Qrimg from "../../../assets/icons/Qrcode.png";
import Print from "../../../assets/icons/print.png";
import QRCode from "qrcode.react";
import html2pdf from "html2pdf.js";
import Base64Image from "../../../Helper/Base64Img";

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
            <QRCode value={JSON.stringify(orderData)} size={250}   />
            {/* <Base64Image base64String={'data:image/png;base64,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'}/> */}
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
