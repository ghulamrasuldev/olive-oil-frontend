import React, { useState, useRef, useEffect, useMemo } from "react";
import "./Style.scss";
import { IoMdClose } from "react-icons/io";
import AttachementImg from "../../../../assets/icons/attachment.png";
import CalendarCom from "../../../../Components/Common/Calendar/Calendar";
import Calendar from "../../../../assets/icons/calendar.png";
import Camera from "../../../../assets/icons/camera.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Fade, Tooltip } from "@mui/material";
import Theme from "../../../../Theme/Theme";
import {
  openEmployeeForm,
  closeEmployeeForm,
} from "../../../../Redux/slice/handleshortcuts";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../../../../Services/apiService";
import { ErrorMessage, SuccessMessage } from "../../../../Helper/Message";
import { ReloadEmployeeTable } from "../../../../Redux/slice/authSlice";
import Select from "react-select";
import countryList from "react-select-country-list";

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

export default function AddEmployee({ address }) {
  const lightTheme = Theme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Attachement = useRef(null);
  const profileImg = useRef(null);
  const options = useMemo(() => countryList().getData(), []);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [date, setCurDate] = useState();
  const [attach, setAttach] = useState();
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [showPersonalDetail, setShowPersonalDetail] = useState(false);
  const open = useSelector((state) => state.shortcuts.isOpenE);
  const reloadEmployee = useSelector((state) => state.auth.reloadEmployeeTable);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    department: "",
    designation: "",
    date: "",
    role: "",
    salaryType: "",
    salary: "",
    holiday: "",
    selectedImg: "",
    phone: "",
    address: "",
    mail: "",
    nationality: "",
    dob:"",
  });
  const [formDataError, setFormDataError] = useState({
    fname: "",
    lname: "",
    department: "",
    designation: "",
    date: "",
    role: "",
    salaryType: "",
    salary: "",
    holiday: "",
    phone: "",
    address: "",
    mail: "",
    nationality: "",
    dob:"",

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const alphabetRegex = /^[A-Za-z\s]+$/;
    const numericRegex = /^\d+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      case "fname":
        updateError("fname", alphabetRegex, "It should contain only alphabets");
        break;
      case "lname":
        updateError("lname", alphabetRegex, "It should contain only alphabets");
        break;
      case "designation":
        updateError(
          "designation",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;
      case "department":
        updateError(
          "department",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;
      case "role":
        updateError("role", alphabetRegex, "It should contain only alphabets");
        break;
      case "salaryType":
        updateError(
          "salaryType",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;
      case "holiday":
        updateError("holiday", numericRegex, "It should contain only numbers");
        break;
      case "salary":
        updateError("salary", numericRegex, "It should contain only number");
        break;
      case "phone":
        updateError("phone", numericRegex, "It should contain only number");
        break;
      case "address":
        updateError(
          "address",
          alphabetRegex,
          "It should contain only alphabets"
        );
        break;
      case "mail":
        updateError("mail", emailRegex, "Enter Valid Email");
        break;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = () => {
    Attachement.current.click();
  };

  const handleAttachement = (event) => {
    const selectedImg = event.target.files[0];
    if (selectedImg) {
      setAttach(selectedImg);
    }
  };
  const handleProfileClick = () => {
    profileImg.current.click();
  };

  const removeAttachment = () => {
    setAttach("");
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

  const handleOpenForm = () => {
    dispatch(openEmployeeForm());
  };
  const handleCancel = () => {
    dispatch(closeEmployeeForm());
    setEmptyCheck(true);
    // Empty();
    removeSelectedImage();
    removeAttachment();
    navigate(`${address}`, { replace: true });
  };
  const handleSelectNationality = (selectedOption) => {
    if (selectedOption) {
      setFormDataError((prev) => ({
        ...prev,
        nationality: '', 
      }));
      setFormData({
        ...formData,
        nationality: selectedOption.value,
      });
    }
  };
  

  // const Empty = () => {
  //   setFormData({
  //     fname: "",
  //     lname: "",
  //     department: "",
  //     designation: "",
  //     date: "",
  //     role: "",
  //     salaryType: "",
  //     salary: "",
  //     holiday: "",
  //     selectedImg: "",
  //   });
  //   setFormDataError({
  //     fname: "",
  //     lname: "",
  //     department: "",
  //     designation: "",
  //     date: "",
  //     role: "",
  //     salaryType: "",
  //     salary: "",
  //     holiday: "",
  //   });
  //   setCurDate("");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const requiredField = [
        "fname",
        "lname",
        "department",
        "designation",
        "role",
        "date",
        "salaryType",
        "salary",
        "holiday",
        "mail",
        "phone",
        "address",
        "nationality",
        "dob"
      ];
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
        if (!formData.mail || !formData.phone || !formData.nationality|| !formData.address) {
          // Set showPersonalDetail to true
          setShowPersonalDetail(true);
        }
        
        return;
      }

      const DataToSend = new FormData();
      DataToSend.append("fname", formData.fname);
      DataToSend.append("lname", formData.lname);
      DataToSend.append("department", formData.department);
      DataToSend.append("designation", formData.designation);
      DataToSend.append("date", formData.date);
      DataToSend.append("role", formData.role);
      DataToSend.append("salaryType", formData.salaryType);
      DataToSend.append("salary", formData.salary);
      DataToSend.append("holiDay", formData.holiday);
      DataToSend.append("phone", formData.phone);
      DataToSend.append("mail", formData.mail);
      DataToSend.append("nationality", formData.nationality);
      DataToSend.append("address", formData.address);
      DataToSend.append("dob", formData.dob);
      if (formData.selectedImg) {
        DataToSend.append("selectedImg", formData.selectedImg);
      }
      if (attach) {
        DataToSend.append("attach", attach);
      }

      const response = await apiService(
        "POST",
        "/HumanResource/employees/new-employee",
        {
          "x-usertoken": authToken,
        },
        DataToSend
      );
      if (response.success) {
        SuccessMessage(response.message);
        dispatch(ReloadEmployeeTable(!reloadEmployee));
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

  useEffect(() => {
    setFormData({
      ...formData,
      date: date,
    });
  }, [date]);
  return (
    <div>
      <Tooltip title="New Employee" position="top">
        <Link to="add-employee" onClick={() => handleOpenForm()}>
          + Add New
        </Link>
      </Tooltip>

      <Modal open={open} onClose={handleCancel} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <div className="addEmployee">
              <div className="insideEmp">
                <div className="formDiv1">
                  <p className="p1">Add Employee*</p>
                  {selectedImageUrl ? (
                    <div className="mainProfile">
                      <div
                        className="profileImg"
                        style={{ backgroundImage: `url(${selectedImageUrl})` }}
                      >
                        {" "}
                        <span
                          className="removeIcon"
                          onClick={removeSelectedImage}
                        >
                          <AiOutlineCloseCircle size={20} color="red" />
                        </span>
                      </div>
                      <IoMdClose
                        color="#90A67B"
                        size={20}
                        onClick={handleCancel}
                        className="icon"
                      />
                    </div>
                  ) : (
                    <div className="selectedImgDiv">
                      <div className="picDiv">
                        <p className="p6">
                          {formData.selectedImg ? "" : "Profile Picture*"}
                        </p>
                        <div className="imgDiv">
                          <img
                            src={Camera}
                            alt="camera"
                            onClick={handleProfileClick}
                          />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleProfileImage}
                            ref={profileImg}
                            accept="image/*"
                          />
                        </div>
                      </div>
                      <IoMdClose
                        color="#90A67B"
                        size={20}
                        onClick={handleCancel}
                        className="icon"
                      />
                    </div>
                  )}
                </div>

                <div className="toggleDiv">
                  <div className="personal">
                    <p
                      className="personalBtn"
                      onClick={() => setShowPersonalDetail(!showPersonalDetail)}
                    >
                      {showPersonalDetail?'Hide Personal Detail':'Show Personal Detail'}
                    </p>
                    <div
                      className={`detailDiv ${
                        showPersonalDetail ? "show" : "hide"
                      }`}
                    >
                      <div className="nameDiv">
                        <div className="inputDiv">
                          <div className="nameDiv">
                            <div className="textAndError">
                              <p className="p5">Phone*</p>
                              {formDataError.phone && (
                                <span className="error">
                                  {formDataError.phone}
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              placeholder="123456789"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="nameDivv">
                            <div className="textAndError">
                              <p className="p5">E-mail*</p>
                              {formDataError.mail && (
                                <span className="error">
                                  {formDataError.mail}
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              placeholder="sampe@gmail.com"
                              name="mail"
                              value={formData.mail}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="nameDiv">
                        <div className="inputDiv">
                          <div className="nameDiv">
                            <div className="textAndError">
                              <p className="p5">Address*</p>
                              {formDataError.address && (
                                <span className="error">
                                  {formDataError.address}
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              placeholder="xyz"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="nameDivv">
                          <div className="textAndError">
                          <p className="p5">Nationality*</p>
                            {formDataError.nationality && (
                              <span className="error">
                                {formDataError.nationality}
                              </span>
                            )}
                            </div>
                            
                            <Select
                              value={options.find(option => option.value === formData.nationality)}
                              onChange={handleSelectNationality}
                              options={options}
                              className="select"
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="nameDiv">
                        <div className="inputDiv">
                          <div className="nameDiv">
                            <div className="textAndError">
                              <p className="p5">Date Of Birth*</p>
                              {formDataError.dob && (
                                <span className="error">
                                  {formDataError.dob}
                                </span>
                              )}
                            </div>
                            <input
                              type="date"
                              name="dob"
                              value={formData.dob}
                              onChange={handleInputChange}
                            />
                          </div>
                         
                        </div>
                      </div>
                    
                    
                    </div>
                  </div>
                  <div className="nameDiv">
                  
                    <div className="inputDiv">
                      <div className="nameDiv">
                      <div className="textAndError">
                      <p className="p5">Name*</p>
                      {formDataError.fname && (
                        <span className="error">{formDataError.fname}</span>
                      )}
                    </div>
                        <input
                          type="text"
                          placeholder="First Name"
                          name="fname"
                          value={formData.fname}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="nameDivv">
                        <div className="textAndError">
                        <p className="p5">Last Name</p>
                          {formDataError.lname && (
                            <span className="error">{formDataError.lname}</span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="lname"
                          value={formData.lname}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nameDiv">
                    <div className="inputDiv">
                      <div className="nameDiv">
                        <div className="textAndError">
                          <p className="p5">Department*</p>
                          {formDataError.department && (
                            <span className="error">
                              {formDataError.department}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="nameDivv">
                        <div className="textAndError">
                          <p className="p5">Designation*</p>
                          {formDataError.designation && (
                            <span className="error">
                              {formDataError.designation}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Designation"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nameDiv">
                    <div className="inputDiv">
                      <div className="nameDiv">
                        <div className="textAndError">
                          <p className="p5">Joining Date</p>
                          {formDataError.date && (
                            <span className="error">{formDataError.date}</span>
                          )}
                        </div>
                        <div className="calendarDiv">
                          <p>{date && date}</p>
                          <img
                            src={Calendar}
                            alt="calendar"
                            height={30}
                            onClick={() => setShowCalendar(!showCalendar)}
                          />
                        </div>
                      </div>

                      <div className="nameDivv">
                        <div className="textAndError">
                          <p className="p5">Role*</p>
                          {formDataError.role && (
                            <span className="error">{formDataError.role}</span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nameDiv">
                    <div className="inputDiv">
                      <div className="nameDiv">
                        <div className="textAndError">
                          <p className="p5">Salary Type*</p>
                          {formDataError.salaryType && (
                            <span className="error">
                              {formDataError.salaryType}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Fixed Salary"
                          name="salaryType"
                          value={formData.salaryType}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="nameDivv">
                        <div className="textAndError">
                          <p className="p5">salary*</p>
                          {formDataError.salary && (
                            <span className="error">
                              {formDataError.salary}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="155050.00"
                          name="salary"
                          value={formData.salary}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="holiday">
                    <div className="textAndError">
                      <p className="p5">Allowed Holiday*</p>
                      {formDataError.holiday && (
                        <span className="error">{formDataError.holiday}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Allowed Holiday"
                      name="holiday"
                      value={formData.holiday}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="attachement" onClick={handleClick}>
                    <img src={AttachementImg} alt="attch" />
                    <p>{attach ? `${attach.name}` : "Attachement"}</p>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleAttachement}
                      ref={Attachement}
                      accept="image/*, application/pdf"
                    />
                    {attach && (
                      <span
                        className="removeIcon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAttachment();
                        }}
                      >
                        <AiOutlineCloseCircle size={20} color="red" />
                      </span>
                    )}
                  </div>
                  {showCalendar && (
                    <div>
                      <CalendarCom
                        showDate={false}
                        setShow={setShowCalendar}
                        setCurDate={setCurDate}
                      />
                    </div>
                  )}
                  <div className="saveBtnAE">
                    <button onClick={handleSubmit}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
