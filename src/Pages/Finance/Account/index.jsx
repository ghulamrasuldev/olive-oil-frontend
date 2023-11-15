import React, { useEffect } from "react";
import "./Style.scss";
import { Link } from "react-router-dom";
import Arrow from "../../../assets/icons/filldarrow.png";
import Pencil from "../../../assets/icons/pencil.png";
import Printer from "../../../assets/icons/greenPrinter.png";
import Setting from "../../../assets/icons/settingGreen.png";
import { useState } from "react";
import Select from "react-select";
import TableCom from "./Table";
import AccountForm from "./AccountForm";
import CustomSearchInput from "../../../Components/Common/customSearch";
import { accountTableData } from "../../../Components/Common/Table/constant";
import AccountTab from "./Tabs";
import apiService from "../../../Services/apiService";
import DeletePopUp from "../../../Components/Common/DeletePopUp";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import TabDetailCom from "./Tabs/InsideTab/InsideTab";

const options = [
  { label: "action1", value: "action1" },
  { label: "action2", value: "action2" },
];
const Account = () => {
  const [selcetedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [active, setActive] = useState(true);
  const address = "/finance/Chart-accounts";
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const tabsData = useSelector((state) => state.auth.tabsData);

  const getTabs = async () => {
    try {
      const response = await apiService(
        "GET",
        "/Finance/get/Account-tab",
        {},
        {}
      );
      if (response.success) {
        setTabs(response.data);
        if (response.data.length > 0) {
          setSelectedTab(response.data[0]._id);
        }
      }
    } catch (error) {
      console.log("Error in getting tabs", error);
    }
  };

  useEffect(() => {
    getTabs();
  }, [tabsData]);

  const reloadData = () => {
    setSelectedTab(null);
    getTabs();
  };

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <div className="accountMain">
      <div className="div1">
        <p className="p1">Chart Of Accounts</p>
        {/* <div className="btns">
          <Link>Run Report</Link>
          <AccountForm address={address}/>
        </div> */}
      </div>
      <div className="tabsMain">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <p
              key={tab._id}
              className={`tab ${
                selectedTab === tab._id ? "selected" : "notSelected"
              } ${index === 0 ? "borderClass" : ""}`}
              onClick={() => handleTabClick(tab._id)}
            >
              {tab.tabName}
            </p>
          ))}
        </div>
        <div className="newTab">
          <AccountTab />
        </div>
      </div>
      <div className="div2">
        {/* <div className="filters">
          <div className="filter">
            <div className="batchActionBtn">
              <div className="batchAction" onClick={() => setShow(!show)}>
                <p className="p1">Batch Action</p>
                <img src={Arrow} alt="Arrow" height={8} />
              </div>
              {show && <button disabled={active}>InActive</button>}
            </div>
            <CustomSearchInput
              placeholder="search by name"
              onSearchChange={setName}
              iconShow={false}
            />
            <Select
              value={selcetedOption}
              onChange={setSelectedOption}
              options={options}
              placeholder="All"
            />
          </div>
          <div className="icons">
            <img src={Pencil} alt="pencil" height={20} />
            <img src={Printer} alt="printer" height={20} />
            <img src={Setting} alt="Setting" height={20} />
          </div>
        </div> */}
        <div className="tableDiv">
          <div className="actionDiv">
            <DeletePopUp
              id={selectedTab}
              reloadData={reloadData}
              url={"/Finance/delete-tab"}
              message={"Are you sure to delete the whole tab?"}
            />
            
            <TabDetailCom selectedTab={selectedTab} />
          </div>
          <div className="table">
          <TableCom
            searchVal={name}
            activeBtn={setActive}
            data={accountTableData}
            selectedTab={selectedTab}
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
