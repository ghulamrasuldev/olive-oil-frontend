import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Style.scss";
import { Tooltip } from "@mui/material";
import Watch from "../../../assets/icons/watch.png";
import Theme from "../../../Theme/Theme";
import Tick from "../../../assets/icons/tick1.png";
import { SuccessMessage, ErrorMessage } from "../../../Helper/Message";
import apiService from "../../../Services/apiService";
import { AiOutlineClose } from "react-icons/ai";
import { FaFileContract } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { dateFunction } from "../../../Helper/dateFun";
import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Select from "react-select";
import html2pdf from 'html2pdf.js';


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
const paymentOptions = [
  { label: "By Cash", value: "By Cash" },
  { label: "By Card", value: "By Card" },
];

export default function TransactionOrder({ orderId, reload }) {
  const authorizedBy = localStorage.getItem("userName");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const lightTheme = Theme();
  const [billToggle, setBillToggle] = useState(false);
  const [payment, setPayment] = useState(null);
  const [formData, setFormData] = useState({
    refinedOil: "",
    rawMaterial: "",
    cans: "",
    inOut: "Out",
    payment: "",
    orderId: orderId,
    authorized:authorizedBy
  });
  const [formDataError, setFormDataError] = useState({
    refinedOil: "",
    rawMaterial: "",
    cans: "",
    inOut: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const alphabetRegex = /^[A-Za-z]+$/;
    const numericRegex = /^[0-9-]+$/;
    const minLength = 2;

    const updateFormErrors = (fieldName, regex, errorMessage) => {
      if (!regex.test(value)) {
        setFormDataError({
          ...formDataError,
          [fieldName]: errorMessage,
        });
      } else {
        setFormDataError({ ...formDataError, [fieldName]: "" });
      }
    };

    switch (name) {
      case "refinedOil":
        updateFormErrors(
          "refinedOil",
          numericRegex,
          "It should contain only numbers"
        );
        break;

      case "rawMaterial":
        updateFormErrors(
          "rawMaterial",
          numericRegex,
          "It should contain only numbers"
        );
        break;

      case "cans":
        updateFormErrors(
          "cans",
          numericRegex,
          "It should contain only numbers"
        );
        break;

      case "inOut":
        updateFormErrors(
          "inOut",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectPayment = (selectedOption) => {
    setFormData({
      ...formData,
      payment: selectedOption ? selectedOption.value : null,
    });
  };

  const updateStatus = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const res = await apiService(
        "POST",
        `/order/update-order/${orderId}`,
        { "x-usertoken": authToken },
        { newStatus: "Completed" }
      );
      if (res.success) {
        SuccessMessage(res.message);
        handleOpen();
      } else {
        ErrorMessage(res.message);
        handleClose();
      }
    } catch (error) {
      console.log(error);
      ErrorMessage("Api Error", error);
    }
  };

  const handleCancel = () => {
    reload();
    handleClose();
    setBillToggle(false);
  };

  const emptyForm = () => {
    setFormData({
      refinedOil: "",
      rawMaterial: "",
      cans: "",
      inOut: "",
      payment: "",
    });
    setFormDataError({
      refinedOil: "",
      rawMaterial: "",
      cans: "",
      inOut: "",
    });
  };

  const handleBill = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    try {
      setBillToggle(true);
      const fieldErrors = {};
      const requiredFields = [
        "refinedOil",
        "rawMaterial",
        "cans",
        "payment",
      ];
      requiredFields.forEach((field) => {
        if (!formData[field]) {
          fieldErrors[field] = `${field} is required`;
        }
      });

      if (Object.keys(fieldErrors).length > 0) {
        setFormDataError((prevErrors) => ({
          ...prevErrors,
          ...fieldErrors,
        }));
        return;
      }
      updateStatus();
      const orderResponse = await apiService(
        "POST",
        "/order/create-order-bill",
        { "x-usertoken": authToken },
        formData
      );
      if (orderResponse.success) {
        // emptyForm();
        SuccessMessage(orderResponse.message);
        return;
      } else {
        emptyForm();
        handleCancel();
        ErrorMessage(orderResponse.message);
        return;
      }
    } catch (error) {
      ErrorMessage("Api Error", error);
    }
  };

  const currentDate = dateFunction();
  const divToCaptureRef = useRef(null);
  const handleDownload = () => {
    // Capture the content of the div as an image
    html2canvas(divToCaptureRef.current).then((canvas) => {
      // Calculate the width and height of the PDF based on the captured image
      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Create a PDF document with the calculated height
      const pdf = new jsPDF("p", "mm", "a4", true); // The last argument 'true' ensures landscape mode
  
      // Add the captured image to the PDF
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );
     
    // Add a watermark at the center of the page, rotated at 225 degrees
    pdf.setTextColor(150); 
    pdf.setFontSize(40);

    const watermarkText = "Olive Oil Bill";
    const textWidth = pdf.getStringUnitWidth(watermarkText) * pdf.internal.getFontSize();
    const textX = (imgWidth-50) / 2;
    const textY = imgHeight / 2;

    // Rotate the text using a transformation matrix
    const angleInRadians = (225 * Math.PI) / 35; // Convert to radians
    pdf.textWithLink(watermarkText, textX, textY, {
      angle: angleInRadians,
      fontSize: 30,
      useUnderline: false,
    });
  
      // Download the PDF
      pdf.save("bill.pdf");
    });
    emptyForm();
    handleCancel();
  };
  



  return (
    <div className="stationMain">
      <Tooltip title="Completed" placement="top" onClick={handleOpen}>
        <div
          className="circle"
          style={{ backgroundColor: `${lightTheme.greenIcon}` }}
        >
          <img src={Tick} alt="tick" height={15} />
        </div>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="insideMainTO">
            <div className="crossIcon">
              <AiOutlineClose
                size={20}
                className="Icon"
                onClick={handleCancel}
              />
            </div>
            <p className="p2">
              Completed Order <span>{orderId}</span>
            </p>
            <div className="inputDiv">
              <div className="nameDiv">
                <div className="textAndError">
                  <p className="p5">Refined Oil</p>
                  {formDataError.refinedOil && (
                    <span className="error">{formDataError.refinedOil}</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="1234Kg"
                  name="refinedOil"
                  value={formData.refinedOil}
                  onChange={handleInputChange}
                />
              </div>
              <div className="nameDivv">
                <div className="textAndError">
                  <p className="p5">Raw Material</p>
                  {formDataError.rawMaterial && (
                    <span className="error">{formDataError.rawMaterial}</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="1234Kg"
                  name="rawMaterial"
                  value={formData.rawMaterial}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="inputDiv">
              <div className="nameDiv">
                <div className="textAndError">
                  <p className="p5">Number of Cans</p>
                  {formDataError.cans && (
                    <span className="error">{formDataError.cans}</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="4"
                  name="cans"
                  value={formData.cans}
                  onChange={handleInputChange}
                />
              </div>
              <div className="nameDivv">
              
                 <div className="paymentDiv">
                <p className="p5">Payment Methods</p>
                <div className="inputDiv1">
                  <div className="paymentDiv1">
                    <Select
                      value={paymentOptions.find(
                        (option) => option.value === formData.payment
                      )}
                      onChange={handleSelectPayment}
                      options={paymentOptions}
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="inputDiv">
              
              <div className="nameDivv">
                <button className="billBtn" onClick={(e) => handleBill(e)}>
                  <FaFileContract size={15} color="#6d8b50" />
                  Generate Bill
                </button>
                {billToggle && (
                  <button
                    className="cancelBtn"
                    onClick={() => setBillToggle(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            {billToggle && (
              <div className="billDiv" ref={divToCaptureRef}>
                <div className="insideBill">
                  <p className="p1">Order ID</p>
                  <p className="p2">{orderId}</p>
                </div>
                <div className="insideBill">
                  <p className="p1">Raw Material</p>
                  <p className="p2">
                    {formData.rawMaterial && formData.rawMaterial}Kg
                  </p>
                </div>
                <div className="insideBill">
                  <p className="p1">Refined Oil</p>
                  <p className="p2">
                    {formData.refinedOil && formData.refinedOil}Kg
                  </p>
                </div>
                <div className="insideBill">
                  <p className="p1">Number Of Cans</p>
                  <p className="p2">{formData.cans && formData.cans}</p>
                </div>
                <div className="Divider"></div>
                <div className="payment">
                  <p className="p1">Total Bill</p>
                  <p className="p2">123456</p>
                </div>
                <div className="Signature">
                  <p className="p1">{currentDate}</p>
                  <p className="p2">Signature_____</p>
                </div>
              </div>
            )}
            {billToggle && (
              <button className="saveBtnTO" onClick={handleDownload}>
                <HiOutlineDownload size={20} color="#6d8b50" />
                Download Bill
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
