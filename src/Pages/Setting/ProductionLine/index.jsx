import React, { useEffect, useRef, useState } from "react";
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
import Camera from "../../../assets/icons/camera.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ErrorMessage, SuccessMessage } from "../../../Helper/Message";
import apiService from "../../../Services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { LinesData, ReloadProductTable } from "../../../Redux/slice/authSlice";
import { ImStatsDots } from "react-icons/im";

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

export default function ProductionLines() {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const lines = useSelector((state) => state.auth.linesData);
  const [formData, setFormData] = useState({
    line: "",
    capacity: "",
    target: "",
    admin: "",
  });
  const [formDataError, setFormDataError] = useState({
    line: "",
    capacity: "",
    target: "",
  });

  useEffect(() => {
    const LoginAdmin = localStorage.getItem("userName");
    setFormData({
      ...formData,
      admin:LoginAdmin
    })
  }, [formData.admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const pattern = /^[A-Za-z]+-\d+$/;
    const numbers = /^\d+$/;
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
      case "line":
        updateError("line", pattern, "Correct format e.g Line-01");
        break;
      case "capacity":
        updateError("capacity", numbers, "it should contain only numbers");
        break;
      case "target":
        updateError("target", numbers, "it should contain only numbers");
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
    navigation("/setting", { replace: true });
  };

  const emptyForm = () => {
    setFormData({
      line: "",
      capacity: "",
      target: "",
    });
    setFormDataError({
      line: "",
      capacity: "",
      target: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const LoginAdmin = localStorage.getItem("userName");
      setFormData({
        ...formData,
        admin: LoginAdmin,
      });
      const requiredField = ["line", "capacity", "target"];
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
        "/order/create-production-line",
        {
          "x-usertoken": authToken,
        },
        formData
      );

      if (response.success) {
        dispatch(LinesData(!lines));
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
      <Tooltip title="Production Line" position="top">
        <Link to="add-production-line" onClick={() => handleOpen()}>
          <ImStatsDots size={13} /> Lines
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
                <p className="p1">Add Production Line</p>
                <IoMdClose
                  color="black"
                  size={20}
                  onClick={handleCancel}
                  className="icon"
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="togglePartsDiv">
                  <div className="nameDiv1">
                    <div className="textAndError">
                      <p className="p5">Line</p>
                      {formDataError.line && (
                        <span className="error">{formDataError.line}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <input
                          type="text"
                          name="line"
                          placeholder="Line-01"
                          value={formData.line}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nameDiv1">
                    <div className="textAndError">
                      <p className="p5">Line capacity</p>
                      {formDataError.capacity && (
                        <span className="error">{formDataError.capacity}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <input
                          type="text"
                          name="capacity"
                          placeholder="567890"
                          value={formData.capacity}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="togglePartsDiv">
                  <div className="nameDiv1">
                    <div className="textAndError">
                      <p className="p5">Actual Target</p>
                      {formDataError.target && (
                        <span className="error">{formDataError.target}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="target">
                        <input
                          type="text"
                          name="target"
                          placeholder="987654"
                          value={formData.target}
                          onChange={handleInputChange}
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
