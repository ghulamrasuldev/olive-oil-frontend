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
import apiService from "../../../../Services/apiService";
import { TabsData } from "../../../../Redux/slice/authSlice";

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
  const tabsData = useSelector((state) => state.auth.tabsData);
  const [toggleDetail, setToggleDetails] = useState(false);

  const [formData, setFormData] = useState({
    tabName: "",
    tabDetails: [],
    currentTabDetail: { name: "", id: "", comment: "" },
  });
  const [formDataError, setFormDataError] = useState({
    tabName: "",
    tabDetails: [],
    currentTabDetail: { name: "", id: "", comment: "" },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const pattern = /^[a-zA-Z\s,.-]+$/;
    const numbers = /^\d+$/;
    const updateError = (fieldName, regex, error) => {
      if (!regex.test(value)) {
        setFormDataError((prev) => {
          if (fieldName === "tabName") {
            return {
              ...prev,
              [fieldName]: error,
            };
          } else {
            return {
              ...prev,
              currentTabDetail: {
                ...prev.currentTabDetail,
                [fieldName]: error,
              },
            };
          }
        });
      } else {
        setFormDataError((prev) => {
          if (fieldName === "tabName") {
            return {
              ...prev,
              [fieldName]: "",
            };
          } else {
            return {
              ...prev,
              currentTabDetail: {
                ...prev.currentTabDetail,
                [fieldName]: "",
              },
            };
          }
        });
      }
    };

    switch (name) {
      case "tabName":
        updateError("tabName", pattern, "it contains only alphabets");
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;
      case "name":
        updateError("name", pattern, "it contains only alphabets");
        setFormData((prev) => ({
          ...prev,
          currentTabDetail: {
            ...prev.currentTabDetail,
            [name]: value,
          },
        }));
        break;
      case "id":
        updateError("id", numbers, "it contains only numbers");
        setFormData((prev) => ({
          ...prev,
          currentTabDetail: {
            ...prev.currentTabDetail,
            [name]: value,
          },
        }));
        break;
      case "comment":
        updateError("comment", pattern, "it contains only alphabets");
        setFormData((prev) => ({
          ...prev,
          currentTabDetail: {
            ...prev.currentTabDetail,
            [name]: value,
          },
        }));
        break;
      default:
        break;
    }
  };

  const handleAddTabDetail = () => {
    if (
      formData.currentTabDetail.name.trim() !== "" ||
      formData.currentTabDetail.id.trim() !== "" ||
      formData.currentTabDetail.comment.trim() !== ""
    ) {
      setFormData((prev) => ({
        ...prev,
        tabDetails: [...(prev.tabDetails || []), { ...prev.currentTabDetail }],
        currentTabDetail: { name: "", id: "", comment: "" },
      }));
      setFormDataError((prev) => ({
        ...prev,
        tabDetails: [
          ...(prev.tabDetails || []),
          { name: "", id: "", comment: "" },
        ],
      }));
    }
  };

  const handleCancel = () => {
    emptyForm();
    handleClose();
    setToggleDetails(false);
    navigation("/finance/Chart-accounts", { replace: true });
  };

  const emptyForm = () => {
    setFormData({
      tabName: "",
      tabDetails: [],
      currentTabDetail: { name: "", id: "", comment: "" },
    });
    setFormDataError({
      tabName: "",
      tabDetails: [],
      currentTabDetail: { name: "", id: "", comment: "" },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const fieldError = {};

      if (!formData.tabName.trim()) {
        fieldError.tabName = "Tab Name is Required";
      }
      // if (toggleDetail) {
      //   const tabDetailsRequiredFields = ["name", "id", "comment"];

      //   if (formData.tabDetails && formData.tabDetails.length > 0) {
      //     formData.tabDetails.forEach((detail, index) => {
      //       tabDetailsRequiredFields.forEach((field) => {
      //         if (!detail[field].trim()) {
      //           fieldError[field] = `${field} is required for tab details`;
      //         }
      //       });
      //     });
      //   } else {
      //     fieldError.tabDetails = "field is required";
      //   }
      // if (formData.tabDetails && formData.tabDetails.length > 0) {
      //   console.log("hererr");
      //   formData.tabDetails.forEach((detail) => {
      //     tabDetailsRequiredFields.forEach((field) => {
      //       if (!detail[field].trim()) {
      //         setFormDataError((prev) => ({
      //           ...prev,
      //           tabDetails: `${field} is required for tab details`,
      //         }));
      //       }
      //     });
      //   });
      // } else {
      //   console.log("122122");
      //   setFormDataError((prev) => ({
      //     ...prev,
      //     tabDetails: "Tab details are required",
      //   }));
      // }
      // }

      setFormDataError(fieldError);

      if (Object.keys(fieldError).length > 0) {
        return;
      }

      if (
        (formData.tabDetails && formData.tabDetails.length > 0) ||
        (formData.currentTabDetail&&(formData.currentTabDetail.name||formData.currentTabDetail.id||formData.currentTabDetail.comment))
      ) {
        if (
          formData.currentTabDetail.name.trim() !== "" ||
          formData.currentTabDetail.id.trim() !== "" ||
          formData.currentTabDetail.comment.trim() !== ""
        ) {
          // setFormData(async (prev) => {
          //   const updatedState = {
          //     ...prev,
          //     tabDetails: [
          //       ...(prev.tabDetails || []),
          //       { ...prev.currentTabDetail },
          //     ],
          //     currentTabDetail: { name: "", id: "", comment: "" },
          //   };

          //   // console.log("Updated State:", updatedState);
          //   console.log("oneee");

          //   const response = await apiService(
          //     "POST",
          //     "/Finance/Account-tab",
          //     {
          //       "x-usertoken": authToken,
          //     },
          //     updatedState
          //   );

          //   if (response.success) {
          //     // dispatch(LinesData(!lines));
          //     SuccessMessage(response.message);
          //     handleCancel();
          //     return;
          //   } else {
          //     ErrorMessage(response.message);
          //     handleCancel();
          //   }
          //   console.log('still in');
          // });
          const updatedState = {
            ...formData,
            tabDetails: [
              ...(formData.tabDetails || []),
              { ...formData.currentTabDetail },
            ],
            currentTabDetail: { name: "", id: "", comment: "" },
          };

          const response = await apiService(
            "POST",
            "/Finance/Account-tab",
            {
              "x-usertoken": authToken,
            },
            updatedState
          );

          if (response.success) {
            dispatch(TabsData(!tabsData));
            SuccessMessage(response.message);
            handleCancel();
          } else {
            ErrorMessage(response.message);
            handleCancel();
          }
        }
      } else {
        const response = await apiService(
          "POST",
          "/Finance/Account-tab",
          {
            "x-usertoken": authToken,
          },
          { tabName: formData.tabName,current:formData.currentTabDetail, toggleDiv: toggleDetail }
        );

        if (response.success) {
          dispatch(TabsData(!tabsData));
          SuccessMessage(response.message);
          handleCancel();
        } else {
          ErrorMessage(response.message);
          handleCancel();
        }
      }
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
                          placeholder="Asset"
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
                            {formDataError.currentTabDetail?.name && (
                              <span className="error">
                                {formDataError.currentTabDetail?.name}
                              </span>
                            )}
                          </div>
                          <div className="inputDiv1">
                            <div className="nameDiv1">
                              <input
                                type="text"
                                name="name"
                                placeholder="Cash"
                                value={formData.currentTabDetail?.name}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="nameDiv1">
                          <div className="textAndError">
                            <p className="p5">Id</p>
                            {formDataError.currentTabDetail?.id && (
                              <span className="error">
                                {formDataError.currentTabDetail?.id}
                              </span>
                            )}
                          </div>
                          <div className="inputDiv1">
                            <div className="nameDiv1">
                              <input
                                type="text"
                                name="id"
                                placeholder="0000"
                                value={formData.currentTabDetail?.id}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="nameDiv1">
                        <div className="textAndError">
                          <p className="p5">Comment</p>
                          {formDataError.currentTabDetail?.comment && (
                            <span className="error">
                              {formDataError.currentTabDetail?.comment}
                            </span>
                          )}
                        </div>
                        <div className="inputDiv1">
                          <div className="nameDiv1">
                            <input
                              type="text"
                              name="comment"
                              placeholder="comment"
                              value={formData.currentTabDetail?.comment}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      {((formData.tabDetails &&
                        formData.tabDetails.length > 0) ||
                        (formData.currentTabDetail&&(formData.currentTabDetail.name||formData.currentTabDetail.id||formData.currentTabDetail.comment))) && (
                        <p className="addMore" onClick={handleAddTabDetail}>
                          Add More
                        </p>
                      )}
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
