import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ErrorMessage, SuccessMessage } from "../../../../Helper/Message";
// import apiService from "../../../Services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAddBox } from "react-icons/md";

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

export default function AccountTab() {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  //   const lines = useSelector((state) => state.auth.linesData);
  const [toggleDetail, setToggleDetails] = useState(false);
  const [formData, setFormData] = useState({
    tabName: "",
    name: "",
    id: "",
    comment: "",
  });
  const [formDataError, setFormDataError] = useState({
    tabName: "",
    name: "",
    id: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const pattern = /^[a-zA-Z]+/;
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
      case "tabName":
        updateError("tabName", pattern, "it contains only alphabets");
        break;
      case "name":
        updateError("name", pattern, "it contains only alphabets");
        break;
      case "id":
        updateError("id", numbers, "it contains only numbers");
        break;
      case "comment":
        updateError("comment", pattern, "it contains only alphabets");
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
    navigation("/finance/Chart-accounts", { replace: true });
  };

  const emptyForm = () => {
    setFormData({
      tabName: "",
      name: "",
      id: "",
      comment: "",
    });
    setFormDataError({
      tabName: "",
      name: "",
      id: "",
      comment: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");

      const requiredField = ["tabName"];
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
      console.log(formData);
      //   const response = await apiService(
      //     "POST",
      //     "/order/create-production-line",
      //     {
      //       "x-usertoken": authToken,
      //     },
      //     formData
      //   );

      //   if (response.success) {
      //     dispatch(LinesData(!lines));
      //     SuccessMessage(response.message);
      //     handleCancel();
      //   } else {
      //     ErrorMessage(response.message);
      //     handleCancel();
      //   }
    } catch (error) {
      console.log("apiError", error);
      ErrorMessage(error);
    }
  };

  return (
    <div className="AddTabMain">
      <Tooltip title="New Tab" position="top">
        <div className="newTab">
          <MdOutlineAddBox size={15} className="addIcon" />
          <Link to="add-account-tab" onClick={() => handleOpen()}>
            New Tab
          </Link>
        </div>
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
            <div className="tabsFormMain">
              <div className="formDiv1">
                <p className="p1">Add Account Tab</p>
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
                      <p className="p5">Tab Name</p>
                      {formDataError.tabName && (
                        <span className="error">{formDataError.tabName}</span>
                      )}
                    </div>
                    <div className="inputDiv1">
                      <div className="nameDiv1">
                        <input
                          type="text"
                          name="tabName"
                          placeholder="Assests"
                          value={formData.tabName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tabDetails">
                    <p
                      className="toggleTab"
                      onClick={() => setToggleDetails(!toggleDetail)}
                    >
                      Add Tab's Details
                    </p>
                    <div className={toggleDetail ? "mainDetail show" : "hide"}>
                      <div className="detailForm">
                        <div className="nameDiv1">
                          <div className="textAndError">
                            <p className="p5">Name</p>
                            {formDataError.name && (
                              <span className="error">
                                {formDataError.name}
                              </span>
                            )}
                          </div>
                          <div className="inputDiv1">
                            <div className="nameDiv1">
                              <input
                                type="text"
                                name="name"
                                placeholder="Cash"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="nameDiv1">
                          <div className="textAndError">
                            <p className="p5">Id</p>
                            {formDataError.id && (
                              <span className="error">{formDataError.id}</span>
                            )}
                          </div>
                          <div className="inputDiv1">
                            <div className="nameDiv1">
                              <input
                                type="text"
                                name="id"
                                placeholder="0000"
                                value={formData.id}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="nameDiv1">
                        <div className="textAndError">
                          <p className="p5">Comment</p>
                          {formDataError.comment && (
                            <span className="error">
                              {formDataError.comment}
                            </span>
                          )}
                        </div>
                        <div className="inputDiv1">
                          <div className="nameDiv1">
                            <input
                              type="text"
                              name="comment"
                              placeholder="comment"
                              value={formData.comment}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
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
