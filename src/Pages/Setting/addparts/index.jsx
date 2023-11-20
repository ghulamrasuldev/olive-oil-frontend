import React, { useRef, useState } from "react";
import "./Style.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Collapse, Tooltip, Zoom } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import Camera from "../../../assets/icons/camera.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ErrorMessage, SuccessMessage } from "../../../Helper/Message";
import apiService from "../../../Services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { ReloadProductTable } from "../../../Redux/slice/authSlice";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const unitOptions = [
  {
    label: "Quantity",
    value: "Quantity",
  },
  {
    label: "Kg",
    value: "Kg",
  },
  {
    label: "Litter",
    value: "Litter",
  },
];

export default function PartsForm() {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const partImg = useRef(null);
  const dispatch = useDispatch();
  const reloadProductTable = useSelector(
    (state) => state.auth.reloadProductTable
  );

  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const LoginAdmin = localStorage.getItem("userName");
  const [formData, setFormData] = useState({
    partName: "",
    unit: "",
    selectedImg: "",
    quantity: "",
    admin: LoginAdmin,
    sellable: "",
  });
  const [formDataError, setFormDataError] = useState({
    partName: "",
    unit: "",
    sellable: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const alphabetRegex = /^[A-Za-z]+$/;

    const updateError = (fieldName, regex, error) => {
      if (!regex.test(value)) {
        setFormDataError({
          ...formDataError,
          [fieldName]: error,
        });
      } else {
        setFormDataError({ ...formDataError, [fieldName]: "" });
      }
    };

    switch (name) {
      case "partName":
        updateError(
          "partName",
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

  const handleUnit = (selectedOption) => {
    if (selectedOption) {
      setFormDataError({
        ...formDataError,
        unit: "",
      });
    }
    setFormData({
      ...formData,
      unit: selectedOption.value,
    });
  };

  const handleCancel = () => {
    emptyForm();
    removeSelectedImage();
    handleClose();
    navigation("/setting", { replace: true });
  };

  const handleProfileClick = () => {
    partImg.current.click();
  };

  const handleProfileImage = (event) => {
    const selectedImg = event.target.files[0];
    if (selectedImg) {
      setFormData({
        ...formData,
        selectedImg: selectedImg,
      });
      const imageUrl = URL.createObjectURL(selectedImg);
      setSelectedImageUrl(imageUrl);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImageUrl("");
    setFormData({
      ...formData,
      selectedImg: "",
    });
  };

  const emptyForm = () => {
    setFormData({
      partName: "",
      unit: "",
      selectedImg: "",
      quantity: "",
      sellable:"",
    });
    setFormDataError({
      partName: "",
      unit: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const requiredField = ["partName", "unit", "sellable"];
      const fieldError = {};
      requiredField.forEach((field) => {
        if (!formData[field]) {
          fieldError[field] = `${field} is required`;
        }
      });
      if (Object.keys(fieldError).length > 0) {
        setFormDataError((prev) => ({
          ...prev,
          ...fieldError,
        }));
        return;
      }
      const DataToSend = new FormData();
      DataToSend.append("sparePart", formData.partName);
      DataToSend.append("unit", formData.unit);
      DataToSend.append("quantity", formData.quantity);
      DataToSend.append("admin", formData.admin);
      DataToSend.append("sellable", formData.sellable);
      if (formData.selectedImg) {
        DataToSend.append("image", formData.selectedImg);
      }
      const response = await apiService(
        "POST",
        "/spareParts/add/spare-parts",
        {
          "x-usertoken": authToken,
        },
        DataToSend
      );

      if (response.success) {
        SuccessMessage(response.message);
        dispatch(ReloadProductTable(!reloadProductTable));
        handleCancel();
      } else {
        ErrorMessage(response.message);
        handleCancel();
      }
    } catch (error) {
      console.log("apiError", error);
      ErrorMessage(error);
    }
  };

  return (
    <div className="partsMainS">
      <Tooltip title="Add New" position="top">
        <Link to="add-spare-parts" onClick={() => handleOpen()}>
          + Add Inventory
        </Link>
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
            <div className="partsFormMainS">
              <div className="formDiv1">
                <p className="p1">Add Spare Parts</p>
                <IoMdClose
                  color="black"
                  size={20}
                  onClick={handleCancel}
                  className="icon"
                />
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="togglePartsDiv">
                  <div className="nameDiv1">
                    <div className="textAndError">
                      <p className="p5">Spare Part Name</p>
                      {formDataError.partName && (
                        <span className="error">{formDataError.partName}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <input
                          type="text"
                          name="partName"
                          placeholder="Nuts"
                          value={formData.partName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nameDiv1">
                    <div className="textAndError">
                      <p className="p5">Unit Options</p>
                      {formDataError.unit && (
                        <span className="error">{formDataError.unit}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <Select
                          value={unitOptions.find(
                            (option) => option.value === formData.unit
                          )}
                          onChange={handleUnit}
                          options={unitOptions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mainImgAndSell">
                  <div className="selectedImgDiv">
                    <div className="picDiv">
                      <p className="p6">Upload Your Picture*</p>
                      <div className="imgDiv">
                        <p>{formData.selectedImg.name}</p>
                        <img
                          src={Camera}
                          alt="camera"
                          onClick={handleProfileClick}
                        />

                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleProfileImage}
                          ref={partImg}
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sellable">
                    <div className="textAndError">
                      <p className="p5">Sellable?</p>
                      {formDataError.sellable && (
                        <span className="error">{formDataError.sellable}</span>
                      )}
                    </div>
                    <RadioGroup
                      aria-label="sellable"
                      name="sellable"
                      value={formData.sellable}
                      onChange={handleInputChange}
                      row
                      className="radioGroup"
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </div>
                </div>
                <div className="selectedImg">
                      {selectedImageUrl && (
                        <div style={{ position: "relative" }}>
                          <img src={selectedImageUrl} alt="camera" />
                          <span
                            className="removeIcon"
                            onClick={removeSelectedImage}
                          >
                            <AiOutlineCloseCircle size={20} color="red" />
                          </span>
                        </div>
                      )}
                    </div>
                <div className="buttons1">
                  <p className="btnClose1" onClick={handleCancel}>
                    Close
                  </p>
                  <button type="submit" className="btnCreate1">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
