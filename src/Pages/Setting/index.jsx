import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PartsForm from "./addparts";
import ProductTable from "./ProductTable";
import ProductionLines from "./ProductionLine";
import ProductionLineTable from "./ProductionLineTable";
import { Fade } from "react-awesome-reveal";
import LoyaltyProgram from "./loyaltyProgram";
import ProcessingPrice from "./ProcessingPrice";
import apiService from "../../Services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { MdSend } from "react-icons/md";
import { ErrorMessage, SuccessMessage } from "../../Helper/Message";
import { ReloadProductTable } from "../../Redux/slice/authSlice";

const Setting = () => {
  const accordianStyle = {
    margin: "15px 20px 20px 30px",
    width: "94%",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    boxShadow: "5px 5px 4px 0px rgba(238, 238, 238, 0.52)",
  };
  const headStyle = {
    fontWeight: "600",
  };
  const NestedAccordianStyle = {
    margin: "15px 20px 20px 30px",
    width: "94%",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    // boxShadow: "5px 5px 4px 0px rgba(238, 238, 238, 0.52)",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  };
  const priceStyle = {
    color: "rgb(60, 126, 156)",
  };
  const priceDiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const iconDiv = {
    display: "flex",
    justifyContent: "flex-end",
  };
  const sellableDiv = {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  };
  const heading = {
    fontSize: "15px",
    fontWeight: "600",
    margin: "5px",
  };
  const headingValue = {
    fontSize: "14px",
    fontWeight: "500",
    color: "rgb(60, 126, 156)",
  };
  const inputStyle = {
    width: "25%",
    padding: "8px 5px",
    border: "1px solid rgba(144, 166, 123, 1)",
    fontSize: "14px",
    fontFamily: "400",
    borderRadius: "10px",
    outline: "none",
  };
  const [data, setData] = useState([]);
  const sellableData = useSelector((state) => state.partData.sellableParts);
  const dispatch = useDispatch();
  const reloadProductTable = useSelector(
    (state) => state.auth.reloadProductTable
  );
  const [inputValues, setInputValues] = useState([]);
  const [formError, setFormError] = useState(null);

  const getPrices = async () => {
    try {
      const res = await apiService("GET", "/Processing/olive-price", {}, {});

      if (res.success) {
        const price = res.data[0].price;
        setData(price);
      }
    } catch (error) {
      console.log("Error in getting the processing prices", error);
    }
  };

  useEffect(() => {
    getPrices();
  }, []);

  const handleInputChange = (event, itemId, sparePart) => {
    const { value } = event.target;

    const itemIndex = inputValues.findIndex((item) => item._id === itemId);

    if (itemIndex !== -1) {
      setInputValues((prevValues) => [
        ...prevValues.slice(0, itemIndex),
        { _id: itemId, SparePart: sparePart, value: value },
        ...prevValues.slice(itemIndex + 1),
      ]);
    } else {
      setInputValues((prevValues) => [
        ...prevValues,
        { _id: itemId, SparePart: sparePart, value: value },
      ]);
    }
  };

  const handleInventoryPricesForm = async () => {
    if (inputValues.length > 0) {
      const authToken = localStorage.getItem("authToken");
      const res = await apiService(
        "POST",
        "/Inventory/product-prices",
        { "x-usertoken": authToken },
        inputValues
      );
      if (res.success) {
        SuccessMessage(res.message);
        dispatch(ReloadProductTable(!reloadProductTable));
        setFormError(null);
        setInputValues([]);
      } else {
        ErrorMessage(res.message);
      }
    } else {
      setFormError("Please enter values before submitting.");
    }
  };
  return (
    <div className="mainSetting">
      <Accordion style={accordianStyle} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={headStyle}>Warehouse Inventory</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="btnDiv">
            <div className="partsForm">
              <PartsForm />
            </div>
            <Fade>
              <ProductTable />
            </Fade>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={accordianStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={headStyle}>Production Lines</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProductionLines />
          <div>
            <Fade>
              {/* <p className='pt'>Production Lines Table</p> */}
              <div className="productTable">
                <ProductionLineTable />
              </div>
            </Fade>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={accordianStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={headStyle}>Loyalty Program</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Fade>
            <LoyaltyProgram />
          </Fade>
        </AccordionDetails>
      </Accordion>
      <Accordion style={accordianStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={headStyle}>Standard Prices</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Nested Accordion */}
          <Accordion style={NestedAccordianStyle} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <p style={headStyle}>Processing Prices</p>
            </AccordionSummary>
            <AccordionDetails>
              <div style={iconDiv}>
                <ProcessingPrice reloadData={getPrices} />
              </div>
              <div style={priceDiv}>
                <p>Olive's Processing Price </p>

                <p>
                  <span style={priceStyle}>{data ? `${data}` : "Nill"}/</span>
                  Kg
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion style={NestedAccordianStyle}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <p style={headStyle}>Inventory Prices</p>
            </AccordionSummary>
            <AccordionDetails>
              {sellableData &&
                sellableData.map((item) => (
                  <div key={item._id} style={sellableDiv}>
                    <p style={heading}>
                      Product:{" "}
                      <span style={headingValue}>{item.SparePart}</span>
                    </p>

                    <p style={heading}>
                      Quantity:{" "}
                      <span style={headingValue}>{item.Quantity}</span>
                    </p>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      value={
                        (inputValues.find((i) => i._id === item._id) || {})
                          .value || ""
                      }
                      onChange={(e) =>
                        handleInputChange(e, item._id, item.SparePart)
                      }
                      style={inputStyle}
                    />
                    <p style={heading}>
                      / <span style={headingValue}>{item.Unit}</span>
                    </p>
                  </div>
                ))}
              {formError && <p style={{ color: "red" }}>{formError}</p>}
              <Button
                variant="contained"
                onClick={handleInventoryPricesForm}
                startIcon={<MdSend />}
                style={{
                  marginTop: "16px",
                  backgroundColor: "rgba(144, 166, 123, 1)",
                  borderRadius: "8px",
                }}
              >
                Submit
              </Button>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Setting;
