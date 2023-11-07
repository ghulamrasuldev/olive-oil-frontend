import React, { useState, useMemo } from "react";
import "./Style.scss";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import ProfileImg from "../../../../assets/icons/profileN.png";
import Calendar from "../../../../assets/icons/calendar.png";
import CalendarCom from "../../../../Components/Common/Calendar/Calendar";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import { Skeleton } from "@mui/material";

const Profile = ({ setShow }) => {
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const employeeData = useSelector((state) => state.auth.employeeData);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [curDate, setCurDate] = useState();
  const handleCancle = () => {
    setShow(true);
    navigate("/human-resources/employees", { replace: true });
  };

  return (
    <div className="profileMain">
      <div className="insidePro">
        <div className="backDiv">
          <BsFillArrowLeftSquareFill
            size={22}
            className="icon"
            onClick={handleCancle}
          />
          <p>Employee detail</p>
        </div>
        <div className="attachmentDiv">
          <a
            href={`${employeeData && employeeData.Attachment}`}
            className="attach"
          >
            Attachment
          </a>
          <MdDownload size={18} />
        </div>
      </div>

      <div className="bioInfo">
        <div className="infoDiv">
          <p className="p1">Basic Information</p>
          <div className="inputFields">
            <div className="fields">
              <div className="name">
                <p>First Name</p>
                <input
                  type="text"
                  placeholder="First Name"
                  value={employeeData && employeeData.fname}
                />
              </div>
              <div className="name">
                <p>Last Name</p>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={employeeData && employeeData.lname}
                />
              </div>
            </div>
            <div className="fields">
              <div className="name">
                <p>Employee Id</p>
                <input
                  type="text"
                  placeholder="xxxxxxx"
                  value={employeeData && employeeData.EmployeeId}
                />
              </div>
              <div className="name">
                <p>Email</p>

                <input
                  type="text"
                  placeholder="sample@gmail.com"
                  value={employeeData && employeeData.Mail}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="imgDiv">
          {employeeData && employeeData.image ? (
            <img src={employeeData.image} alt="profile" />
          ) : (
            <Skeleton variant="rect" width={200} height={200} />
          )}
        </div>
      </div>
      {showCalendar && (
        <CalendarCom
          setCurDate={setCurDate}
          setShow={setShowCalendar}
          showDate={true}
        />
      )}
      <div className="bioInfo">
        <div className="infoDiv">
          <p className="p1">Personal Details</p>
          <div className="inputFields">
            <div className="fields">
              <div className="name">
                <p>Address</p>
                <input
                  type="text"
                  placeholder="Address"
                  value={employeeData.Address}
                />
              </div>
              <div className="name">
                <p>Mobile Number</p>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={employeeData.Phone}
                />
              </div>
            </div>
            <div className="fields">
              <div className="birth">
                <p>Date Of Birth</p>
                <div className="birthMain">
                  <p>
                    {employeeData.Birth
                      ? `${employeeData.Birth}`
                      : "dd/mm/yyyy"}
                  </p>
                  <img
                    src={Calendar}
                    alt="calendar"
                    height={20}
                    onClick={() => setShowCalendar(true)}
                  />
                </div>
              </div>
              <div className="name">
                <p>Nationality</p>
                <Select
                  value={options.find(
                    (option) => option.value === employeeData.Nationality
                  )}
                  onChange={setSelectedOption}
                  options={options}
                  className="select"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Detail">
          <div className="insideDetail">
            <p>
              {employeeData
                ? `${employeeData.fname} ${employeeData.lname}`
                : ""}
            </p>
            <ul>
              <li> {employeeData ? `${employeeData.Mail}` : ""}</li>
              <li> {employeeData ? `${employeeData.Phone}` : ""}</li>
              <li>
                {" "}
                {employeeData
                  ? `${employeeData.Address}-${employeeData.Nationality}`
                  : ""}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
