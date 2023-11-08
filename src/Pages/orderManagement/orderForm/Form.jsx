import React, { useState, useRef, useEffect } from "react";
import "./Style.scss";
import { IoMdClose } from "react-icons/io";
import Tick from "../../../assets/icons/Tick.png";
import Select from "react-select";
import Camera from "../../../assets/icons/camera.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Fade, Tooltip } from "@mui/material";
import Theme from "../../../Theme/Theme";
import apiService from "../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../Helper/Message";
import { useDispatch, useSelector } from "react-redux";
import { ReloadOrder } from "../../../Redux/slice/authSlice";
const options = [
  { value: "Organic", label: "Organic" },
  { value: "In Organic", label: "In Organic" },
];

const loyalty = [
  { value: "Gold", label: "Gold" },
  { value: "Silver", label: "Silver" },
  { value: "Platinum", label: "Platinum" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxHeight: "80vh",
  borderRadius: " 10px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.52)",
  padding: "15px 0",
  overflowY: "scroll",
  scrollbarWidth: "none" /* Firefox */,
  msOverflowStyle: "none" /* IE/Edge */,
  "&::-webkit-scrollbar": {
    width: "0px",
    background: "transparent" /* Hide scrollbar in Chrome/Safari/Webkit */,
  },
};

export default function Form() {
  const lightTheme = Theme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fileInputRef = useRef(null);
  const profileImg = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [register, setRegister] = useState(false);
  const [profile, setProfile] = useState();
  const lines = useSelector((state) => state.lineData.linesData);
  const [formErrorsOrder, setformErrorsOrder] = useState({
    orderId: "",
    weight: "",
    oliveFruit: "",
    customerId: "",
    lineNumber: "",
  });
  const [formDataOrder, setformDataOrder] = useState({
    orderId: "",
    weight: "",
    customerId: "",
    oliveFruit: null,
    lineNumber:""
  });
  const [formErrorsCustomer, setFormErrorsCustomer] = useState({
    firstName: "",
    city: "",
    nationalId: "",
    orderId: "",
    phoneNumber: "",
    oilProcessed: "",
    customerType: "",
    loyaltyProgram: "",
  });
  const [formDataCustomer, setFormDataCustomer] = useState({
    firstName: "",
    city: "",
    nationalId: "",
    orderId: "",
    phoneNumber: "",
    oilProcessed: "",
    customerType: "",
    loyaltyProgram: null,
  });

  const reloadOrder=useSelector((state)=>state.auth.reloadOrder)

  const linesOptions = lines.map((line) => ({
    label: line.Line,
    value:line.Line
  }))

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileClick = () => {
    profileImg.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Handle the selected file as needed (e.g., upload it)
      console.log(selectedFile);
    }
  };
  const handleProfileImage = (event) => {
    const selectedImg = event.target.files[0];
    if (selectedImg) {
      setProfile(selectedImg.name);
      console.log(selectedImg);
    }
  };
  const handleCancel = () => {
    handleClose();
    emptyForm();
    navigate("/order-management", { replace: true });
  };

  const handleInputChangeOrder = (event) => {
    const { name, value } = event.target;

    const customerIdRegex = /^arb-\d{4}-\d{3}$/;
    const alphabetRegex = /^[A-Za-z]+$/;
    const numericRegex = /^[0-9-]+$/;
    const minLength = 1;

    const updateformErrorsOrder = (fieldName, regex, errorMessage) => {
      if (!regex.test(value) || value.length < minLength) {
        setformErrorsOrder({ ...formErrorsOrder, [fieldName]: errorMessage });
      } else {
        setformErrorsOrder({ ...formErrorsOrder, [fieldName]: "" });
      }
    };

    switch (name) {
      case "orderId":
        updateformErrorsOrder(
          "orderId",
          numericRegex,
          "It should contain only numbers or -"
        );
        break;

      case "weight":
        updateformErrorsOrder(
          "weight",
          numericRegex,
          "It should contain only numbers or -"
        );
        break;
      case "customerId":
        updateformErrorsOrder(
          "customerId",
          customerIdRegex,
          "It should like this arb-year-000"
        );
        break;
      case "lineNumber":
        updateformErrorsOrder(
          "lineNumber",
          numericRegex,
          "It should contain Number only"
        );
        break;
    }

    setformDataOrder({
      ...formDataOrder,
      [name]: value,
    });
  };

  const handleSelectChangeOrder = (selectedOption) => {
    if (!selectedOption) {
      setformErrorsOrder({
        ...formErrorsOrder,
        oliveFruit: "Please select an option",
      });
    } else {
      setformErrorsOrder({ ...formErrorsOrder, oliveFruit: "" });
    }

    setformDataOrder({
      ...formDataOrder,
      oliveFruit: selectedOption ? selectedOption.value : null,
    });
  };
  const handleSelectChangeLine = (selectedOption) => {
    if (!selectedOption) {
      setformErrorsOrder({
        ...formErrorsOrder,
        lineNumber: "Please select an option",
      });
    } else {
      setformErrorsOrder({ ...formErrorsOrder, lineNumber: "" });
    }

    setformDataOrder({
      ...formDataOrder,
      lineNumber: selectedOption ? selectedOption.value : null,
    });
  };

  const handleInputCustomer = (event) => {
    const { name, value } = event.target;

    const alphabetRegex = /^[A-Za-z]+$/;
    const numericRegex = /^[0-9-]+$/;
    const minLength = 2;

    const updateFormErrors = (fieldName, regex, errorMessage) => {
      if (!regex.test(value)) {
        setFormErrorsCustomer({
          ...formErrorsCustomer,
          [fieldName]: errorMessage,
        });
      } else {
        setFormErrorsCustomer({ ...formErrorsCustomer, [fieldName]: "" });
      }
    };

    switch (name) {
      case "firstName":
        updateFormErrors(
          "firstName",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;

      case "city":
        updateFormErrors(
          "city",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;

      case "nationalId":
        updateFormErrors(
          "nationalId",
          numericRegex,
          "It should contain only numbers or -"
        );
        break;

      case "orderId":
        updateFormErrors(
          "orderId",
          numericRegex,
          "It should contain only numbers or -"
        );
        break;

      case "oilProcessed":
        updateFormErrors(
          "oilProcessed",
          numericRegex,
          "It should contain only numbers or -"
        );
        break;

      case "customerType":
        updateFormErrors(
          "customerType",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;
    }

    setFormDataCustomer({
      ...formDataCustomer,
      [name]: value,
    });
  };

  const handleSelectCustomer = (selectedOption) => {
    if (!selectedOption) {
      setFormErrorsCustomer({
        ...formErrorsCustomer,
        loyaltyProgram: "Please select an option",
      });
    } else {
      setFormErrorsCustomer({ ...formErrorsCustomer, loyaltyProgram: "" });
    }
    setFormDataCustomer({
      ...formDataCustomer,
      loyaltyProgram: selectedOption.value, 
    });
  };
  const handlePhoneNumberCustomer = (value) => {
    setFormDataCustomer({
      ...formDataCustomer,
      phoneNumber: value,
    });
  };

  const emptyForm = () => {
    setformDataOrder({
      orderId: "",
      weight: "",
      customerId: "",
      oliveFruit: null,
     lineNumber:""
    });

    setformErrorsOrder({
      orderId: "",
      weight: "",
      oliveFruit: "",
      customerId: "",
      lineNumber:""
    })
    setFormDataCustomer({
      firstName: "",
      city: "",
      nationalId: "",
      orderId: "",
      phoneNumber: "",
      oilProcessed: "",
      customerType: "",
      loyaltyProgram: null,
    });
    setFormErrorsCustomer({
      firstName: "",
      city: "",
      nationalId: "",
      orderId: "",
      phoneNumber: "",
      oilProcessed: "",
      customerType: "",
      loyaltyProgram: "",
    })
   
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    // request when customer is register
    if (register) {
      // request when the customer is not register
      const customerFieldError = {};
      const customerFields = [
        "firstName",
        "city",
        "orderId",
        "phoneNumber",
        "oilProcessed",
        "customerType",
        "loyaltyProgram",
      ];
      customerFields.forEach((field) => {
        if (!formDataCustomer[field]) {
          customerFieldError[field] = `${field} is required`;
        }
      });

      const fieldErrors = {};
      const requiredFields = ["weight", "oliveFruit","lineNumber"];
      requiredFields.forEach((field) => {
        if (!formDataOrder[field]) {
          fieldErrors[field] = `${field} is required`;
        }
      });

      if (
        Object.keys(customerFieldError).length > 0 ||
        Object.keys(fieldErrors).length > 0
      ) {
        setFormErrorsCustomer((prevErr) => ({
          ...prevErr,
          ...customerFieldError,
        }));
        setformErrorsOrder((prevErrors) => ({
          ...prevErrors,
          ...fieldErrors,
        }));
        return;
      }

      const orderAndCustomer = {
        orderData: formDataOrder,
        customerData: formDataCustomer,
      };

      const orderResponse = await apiService(
        "POST",
        "/order/create-order",
        {"x-usertoken":authToken},
        orderAndCustomer
      );
      if (orderResponse.success) {
        setRegister(false);
        emptyForm();
        handleCancel();
        SuccessMessage(orderResponse.message);
        dispatch(ReloadOrder(!reloadOrder))
        return;
      } else {
        emptyForm();
        handleCancel();
        ErrorMessage(orderResponse.message);
        return;
      }
    }

    const fieldErrors = {};
    const requiredFields = ["orderId", "weight", "customerId", "oliveFruit","lineNumber"];
    requiredFields.forEach((field) => {
      if (!formDataOrder[field]) {
        fieldErrors[field] = `${field} is required`;
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      setformErrorsOrder((prevErrors) => ({
        ...prevErrors,
        ...fieldErrors,
      }));
      return;
    }
    const orderResponse = await apiService(
      "POST",
      "/order/create-order",
      {"x-usertoken":authToken},
      formDataOrder
    );
    if (orderResponse.success) {
      dispatch(ReloadOrder(!reloadOrder))
      emptyForm();
      handleCancel();
      setRegister(false);
      SuccessMessage(orderResponse.message);
    } else {
   
      emptyForm();
      handleCancel();
      ErrorMessage(orderResponse.message);
    }
  };

  useEffect(() => {}, [formErrorsOrder, formErrorsCustomer]);

  return (
    <div>
      <Tooltip title="New Order" position="top">
        <Link to="./new-order" className="p2" onClick={handleOpen}>
          + Create New Order
        </Link>
      </Tooltip>

      <Modal open={open} onClose={handleCancel} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <div className="formMain">
              <div className="formDiv1">
                <div className="insideFormDiv1">
                  <div className="cusInp">
                    <div className="textAndError">
                      <label htmlFor="cusID">Customer ID</label>
                      {formErrorsOrder.customerId && (
                        <span className="error">
                          {formErrorsOrder.customerId}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Please Enter your ID"
                      id="cusID"
                      name="customerId"
                      value={formDataOrder.customerId}
                      onChange={handleInputChangeOrder}
                      disabled={register}
                    />
                  </div>
                  <div className="checkDiv">
                    <div
                      className="checkBox"
                      onClick={() => setRegister(!register)}
                    >
                      {register && <img src={Tick} alt="tick" height={25} />}
                    </div>
                    <p className="p1">Not Register?</p>
                  </div>
                </div>
                <IoMdClose
                  color="black"
                  size={20}
                  onClick={handleCancel}
                  className="icon"
                />
              </div>
              {register && (
                <div className="toggleDiv">
                  <div className="nameDiv">
                    <div className="inputDiv">
                      <div className="nameDiv">
                        <div className="textAndError">
                          <p className="p5">Your name(required)*</p>
                          {formErrorsCustomer.firstName && (
                            <span className="error">
                              {formErrorsCustomer.firstName}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={formDataCustomer.firstName}
                          onChange={handleInputCustomer}
                        />
                      </div>
                      <div className="nameDivv">
                        <div className="textAndError">
                          <p className="p5">City</p>
                          {formErrorsCustomer.city && (
                            <span className="error">
                              {formErrorsCustomer.city}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="City"
                          name="city"
                          value={formDataCustomer.city}
                          onChange={handleInputCustomer}
                        />
                      </div>
                    </div>
                    <div className="cnic">
                      <div className="textAndError">
                        <p className="p5">National ID(optional)</p>
                        {formErrorsCustomer.nationalId && (
                          <span className="error">
                            {formErrorsCustomer.nationalId}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="xxxxx-xxxxxx-x"
                        name="nationalId"
                        value={formDataCustomer.nationalId}
                        onChange={handleInputCustomer}
                      />
                    </div>
                    <div className="picAndphone">
                      {register && (
                        <div className="picDiv">
                          <div className="textAndError">
                            <div className="textAndError">
                              <p className="p4">Order Id</p>
                              {formErrorsCustomer.orderId && (
                                <span className="error">
                                  {formErrorsCustomer.orderId}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="wandp">
                            <input
                              type="text"
                              name="orderId"
                              placeholder="Order ID"
                              value={formDataCustomer.orderId}
                              onChange={handleInputCustomer}
                            />
                          </div>
                        </div>
                      )}
                      <div className="phoneDiv">
                        <div className="textAndError">
                          <p className="p6"> Phone number</p>
                          {formErrorsCustomer.phoneNumber && (
                            <span className="error">
                              {formErrorsCustomer.phoneNumber}
                            </span>
                          )}
                        </div>
                        <div className="phoneIn">
                          <PhoneInput
                            defaultCountry="SA"
                            placeholder="phone number"
                            value={formDataCustomer.phoneNumber}
                            onChange={handlePhoneNumberCustomer}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="address">
                      <div className="textAndError">
                        <p className="p5">Oil Processed</p>
                        {formErrorsCustomer.oilProcessed && (
                          <span className="error">
                            {formErrorsCustomer.oilProcessed}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Oil Processed"
                        name="oilProcessed"
                        value={formDataCustomer.oilProcessed}
                        onChange={handleInputCustomer}
                      />
                    </div>
                    <div className="address">
                      <div className="textAndError">
                        <p className="p5">Customer Type</p>
                        {formErrorsCustomer.customerType && (
                          <span className="error">
                            {formErrorsCustomer.customerType}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Farmer"
                        name="customerType"
                        value={formDataCustomer.customerType}
                        onChange={handleInputCustomer}
                      />
                    </div>
                    <div className="loyaltyDiv">
                      <div className="selectDiv">
                        <div className="textAndError">
                          <p className="p3">Loyalty Program*</p>

                          {formErrorsCustomer.loyaltyProgram && (
                            <span className="error">
                              {formErrorsCustomer.loyaltyProgram}
                            </span>
                          )}
                        </div>
                        <Select
                          value={loyalty.find(
                            (option) =>
                              option.value === formDataCustomer.loyaltyProgram
                          )}
                          onChange={handleSelectCustomer}
                          options={loyalty}
                          className="select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="formDiv2">
                <p className="p2">Order Detail</p>
                <div className="mainFormDiv2">
                  <div className="selectDiv">
                    <div className="textAndError">
                      <p className="fruit">Type of olive fruits</p>
                      {formErrorsOrder.oliveFruit && (
                        <span className="error">
                          {formErrorsOrder.oliveFruit}
                        </span>
                      )}
                    </div>

                    <Select
                      value={options.find(
                        (option) => option.value === formDataOrder.oliveFruit
                      )}
                      onChange={handleSelectChangeOrder}
                      options={options}
                      className="select"
                    />
                  </div>
                  <div className="picDiv">
                    <div className="textAndError">
                      <p className="p4">Weight</p>
                      {formErrorsOrder.weight && (
                        <span className="error">{formErrorsOrder.weight}</span>
                      )}
                    </div>
                    <div className="wandp">
                      <input
                        type="text"
                        name="weight"
                        placeholder="weight"
                        value={formDataOrder.weight}
                        onChange={handleInputChangeOrder}
                      />
                      {/* <img src={Camera} alt="camera" onClick={handleFileClick} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              /> */}
                    </div>
                  </div>
                </div>
                <div className="mainFormDiv2">
                  {!register && (
                    <div className="picDiv">
                      <div className="textAndError">
                        <p className="p4">Order Id</p>
                        {formErrorsOrder.orderId && (
                          <span className="error">
                            {formErrorsOrder.orderId}
                          </span>
                        )}
                      </div>
                      <div className="wandp">
                        <input
                          type="text"
                          name="orderId"
                          placeholder="Order ID"
                          value={formDataOrder.orderId}
                          onChange={handleInputChangeOrder}
                        />
                      </div>
                    </div>
                  )}
                  <div className="picDiv">
                      <div className="textAndError">
                        <p className="p4">Line Number</p>
                        {formErrorsOrder.lineNumber && (
                          <span className="error">
                            {formErrorsOrder.lineNumber}
                          </span>
                        )}
                      </div>
                      {/* <div className="wandp">
                        <input
                          type="text"
                          name="lineNumber"
                          placeholder="Line Number"
                          value={formDataOrder.lineNumber}
                          onChange={handleInputChangeOrder}
                        />
                      </div> */}
                    <Select
                      value={options.find(
                        (option) => option.value === lines.Line
                      )}
                      onChange={handleSelectChangeLine}
                      options={linesOptions}
                      className="select"
                    />
                    </div>
                </div>
              </div>
              <div className="buttons">
                <button onClick={handleCancel}>Cancle</button>
                <button onClick={(e) => handleSubmit(e)}>Create</button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
