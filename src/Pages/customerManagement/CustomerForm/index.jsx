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
import { useDispatch, useSelector } from "react-redux";
import {
  openCustomerForm,
  closeCustomerForm,
} from "../../../Redux/slice/handleshortcuts";
import { SuccessMessage, ErrorMessage } from "../../../Helper/Message";
import apiService from "../../../Services/apiService";
import { setReload } from "../../../Redux/slice/authSlice";

const options = [
  { value: "Silver", label: "Silver" },
  { value: "Gold", label: "Gold" },
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

export default function CustomerForm({ address, authToken }) {
  const lightTheme = Theme();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const profileImg = useRef(null);
  const dispatch = useDispatch();
  const defaultValue = options[0];
  const [profile, setProfile] = useState();
  const reload = useSelector((state) => state.auth.reload);

  const open = useSelector((state) => state.shortcuts.isOpenC);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    city: "",
    nationalId: "",
    orderId: "",
    phoneNumber: "",
    oilProcessed: "",
    customerType: "",
    loyaltyProgram: "Silver",
  });
 
  const handleProfileClick = () => {
    profileImg.current.click();
  };

  const handleProfileImage = (event) => {
    const selectedImg = event.target.files[0];
    if (selectedImg) {
      setProfile(selectedImg.name);
    }
  };
  const handleCancel = () => {
    dispatch(closeCustomerForm());
    Empty();
    navigate(`${address}`, { replace: true });
  };
  const Empty = () => {
    setFormData({
      firstName: "",
      city: "",
      nationalId: "",
      orderId: "",
      phoneNumber: "",
      oilProcessed: "",
      customerType: "",
      loyaltyProgram: "",
    });
  };
  const handleOpenForm = () => {
    dispatch(openCustomerForm());
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const alphabetRegex = /^[A-Za-z]+$/;
    const numericRegex = /^[0-9-]+$/;
    const minLength = 2;

    const updateFormErrors = (fieldName, regex, errorMessage) => {
      if (!regex.test(value) || value.length < minLength) {
        setFormErrors({ ...formErrors, [fieldName]: errorMessage });
      } else {
        setFormErrors({ ...formErrors, [fieldName]: "" });
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

      // Add similar checks for other fields
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      loyaltyProgram: selectedOption.value, 
    });
  };
  const handlePhoneNumberChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  const CreateCustomer = async () => {
    if (
      !formData.firstName ||
      !formData.city ||
      !formData.orderId ||
      !formData.phoneNumber ||
      !formData.oilProcessed ||
      !formData.customerType
    ) {
      const emptyFields = [];
      if (!formData.firstName) emptyFields.push("First Name");
      if (!formData.city) emptyFields.push("City");
      if (!formData.orderId) emptyFields.push("Order Id");
      if (!formData.phoneNumber) emptyFields.push("Phone Number");
      if (!formData.oilProcessed) emptyFields.push("Oil Processed");
      if (!formData.customerType) emptyFields.push("Customer Type");

      ErrorMessage(
        `Please fill in the following fields: ${emptyFields.join(", ")}`
      );
      return;
    }

    if (Object.values(formErrors).some((error) => error)) {
      console.log("Validation errors:", formErrors.error);
      return;
    }



    try {
      const response = await apiService(
        "POST",
        "/customer/create-customer",
        {"x-usertoken":authToken},
        formData
        );
      if (response.success) {
        setFormData({
          firstName: "",
          city: "",
          nationalId: "",
          orderId: "",
          phoneNumber: "",
          oilProcessed: "",
          customerType: "",
          loyaltyProgram: "",
        })
        handleCancel();
        dispatch(setReload(!reload))
        SuccessMessage('Customer Created Successfully');
      } else {
        handleCancel();
        ErrorMessage(response.message)
      }
    } catch (error) {
      console.error("Request failed:", error);
      ErrorMessage(`Api Error ${error}`);
    }
  };

  return (
    <div>
      <Tooltip title="Create Customer" position="top">
        <Link to="create-customer" className="p2" onClick={handleOpenForm}>
          + Create New Customer
        </Link>
      </Tooltip>

      <Modal open={open} onClose={handleCancel} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <div className="customerForm">
              <div className="formDiv1">
                <p className="p1">Create New Customer</p>
                <IoMdClose
                  color="black"
                  size={20}
                  onClick={handleCancel}
                  className="icon"
                />
              </div>
              <div className="toggleDiv">
                <div className="nameDiv">
                  <div className="inputDiv">
                    <div className="nameDiv">
                      <div className="textAndError">
                        <p className="p5">Your Name</p>
                        {formErrors.firstName && (
                          <span className="error">{formErrors.firstName}</span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="nameDivv">
                      <div className="textAndError">
                        <p className="p5">Your City</p>
                        {formErrors.city && (
                          <span className="error">{formErrors.city}</span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="cnic">
                    <div className="textAndError">
                      <p className="p5">National ID(optional)</p>
                      {formErrors.nationalId && (
                        <span className="error">{formErrors.nationalId}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="xxxxx-xxxxxx-x"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="picAndphone">
                    {/* <div className="picDiv">
             <p className="p6">Upload Your Picture*</p>
             <div className="imgDiv">
               <p>{profile}</p>
               <img src={Camera} alt="camera" onClick={handleProfileClick} />
               <input
                 type="file"
                 style={{ display: "none" }}
                 onChange={handleProfileImage}
                 ref={profileImg}
                 accept="image/*"
               />
             </div>
           </div> */}
                    <div className="orderDiv">
                      <div className="textAndError">
                        <p className="p5">Order Id</p>
                        {formErrors.orderId && (
                          <span className="error">{formErrors.orderId}</span>
                        )}
                      </div>
                      <div className="inputDiv">
                        <div className="nameDiv">
                          <input
                            type="text"
                            placeholder="Order Id"
                            name="orderId"
                            value={formData.orderId}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="phoneDiv">
                      <p className="p6"> Phone Number</p>
                      <div className="phoneIn">
                        <PhoneInput
                          defaultCountry="SA"
                          placeholder="Phone Number"
                          value={formData.phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="address">
                    <div className="textAndError">
                      <p className="p5">Oil Processed</p>
                      {formErrors.oilProcessed && (
                        <span className="error">{formErrors.oilProcessed}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Oil Processed"
                      name="oilProcessed"
                      value={formData.oilProcessed}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="customerType">
                    <div className="textAndError">
                      <p className="p5">Customer's Type*</p>
                      {formErrors.customerType && (
                        <span className="error">{formErrors.customerType}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Farmers"
                      name="customerType"
                      value={formData.customerType}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="selectDiv">
                    <p className="p3">Loyalty Program*</p>
                    <Select
                      value={options.find(
                        (option) => option.value === formData.loyaltyProgram
                      )}
                      onChange={handleSelectChange}
                      options={options}
                      className="select"
                      defaultValue={defaultValue}
                    />
                  </div>
                </div>
              </div>

              <div className="buttons">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={CreateCustomer}>Create</button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
