import React from "react";
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
        <p className="tab">Assest</p>
        <p className="tab">Assest</p>
        </div>
        <div className="newTab">
          <AccountTab/>
        </div>
      </div>
      {/* <div className="div2">
        <div className="filters">
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
        </div>
        <div className="tableDiv">
          <TableCom
            searchVal={name}
            activeBtn={setActive}
            data={accountTableData}
          />
        </div>
      </div> */}
    </div>
  );
};

export default Account;
