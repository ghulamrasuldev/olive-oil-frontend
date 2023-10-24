import React, { useRef, useState, useEffect } from "react";
import "./Style.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import Camera from "../../../../assets/icons/camera.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ErrorMessage, SuccessMessage } from "../../../../Helper/Message";
import apiService from "../../../../Services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { ReloadOrderBill } from "../../../../Redux/slice/authSlice";

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
];

export default function AddParts() {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const partImg = useRef(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const reloadSparePart = useSelector((state) => state.auth.reloadOrderBill);
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    unit: "",
    sparePart: "",
    sparePartImage: "",
    admin: "",
    productId:""
  });
  const [formDataError, setFormDataError] = useState({
    amount: "",
    unit: "",
    sparePart: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      admin: loginUser,
    });
  }, [loginUser]);
  useEffect(() => {
    setLoginUser(localStorage.getItem("userName"));
  }, [formData]);

  const parts = useSelector((state) => state.partData);
  const partOptions = parts.partData.map((part) => ({
    value: part.objectId,
    label: part.partName,
  }));


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const alphabetRegex = /^[A-Za-z]+$/;
    const numericRegex = /^\d+$/;

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
      case "amount":
        updateError("amount", numericRegex, "It should contain only number");
        break;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    emptyForm();
    handleClose();
    navigation("/warehouse-management/spare-parts", { replace: true });
  };

  const emptyForm = () => {
    setFormData({
      amount: "",
      unit: "",
      sparePart: "",
      sparePartImage: "",
      productId:""
    });
    setFormDataError({
      amount: "",
      sparePart: "",
    });
    setLoginUser("");
  };

  const handlePartChange = async (selectedOption) => {
    const authToken = localStorage.getItem("authToken");
    if (selectedOption) {
      setFormDataError({
        ...formDataError,
        sparePart: "",
      });
    }
    const partValue = selectedOption.label;
    const productID = selectedOption.value;
    setFormData((prevData) => ({
      ...prevData,
      sparePart: partValue,
      productId:productID
    }));

    const objectId = selectedOption.value;
    const response = await apiService(
      "GET",
      `/spareParts/findPart/${objectId}`,
      { "x-usertoken": authToken },
      {}
    );
    if (response.success) {
      const Unit = response.data.Unit;
      const sparePartImage = response.data.image;
      setFormData((prevData) => ({
        ...prevData,
        unit: Unit,
        sparePartImage: sparePartImage,
      }));
    }
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const requiredField = ["amount", "sparePart"];
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
      const response = await apiService(
        "POST",
        "/spareParts/add/spare-part-amount",
        {
          "x-usertoken": authToken,
        },
        formData
      );
      dispatch(ReloadOrderBill(!reloadSparePart));
      if (response.success) {
        SuccessMessage(response.message);
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
    <div className="partsMain">
      <Tooltip title="Add New" position="top">
        <Link to="add-parts" onClick={() => handleOpen()}>
          + Add New
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
            <div className="partsFormMain">
              <div className="formDiv1">
                <p className="p1">Add Amount</p>
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
                      <p className="p5">Spare Parts</p>
                      {formDataError.sparePart && (
                        <span className="error">{formDataError.sparePart}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <Select
                          value={partOptions.find(
                            (option) => option.label === formData.sparePart
                          )}
                          onChange={handlePartChange}
                          options={partOptions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="togglePartsDiv">
                  <div className="nameDiv1">
                    <div className="textAndError">
                      <p className="p5">Amount</p>
                      {formDataError.amount && (
                        <span className="error">{formDataError.amount}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <input
                          type="text"
                          name="amount"
                          placeholder="Amount of Spare Part"
                          value={formData.amount}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nameDiv1">
                    <div className="textAndError">
                      <p className="p5">Unit</p>
                      {formDataError.unit && (
                        <span className="error">{formDataError.unit}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <input
                          type="text"
                          name="unit"
                          placeholder="Measure unit"
                          value={formData.unit}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
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
