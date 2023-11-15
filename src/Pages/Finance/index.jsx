import React,{useState} from "react";
import "./Style.scss";
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveButtonFinance } from "../../Redux/slice/handleToggle";

const Finance = () => {
  const dispatch=useDispatch()
  // const [toggleBtn, setToggleBtn] = useState(0);
  const toggleBtn=useSelector((state)=>state.toggle.activeButtonIndexFinance)
    const handleButtonClick = (index) => {
      dispatch(setActiveButtonFinance(index))
  };
  
  
  return (
    <div>
      <Helmet>
        <title>Finance & Accounting</title>
        <meta
          name="Finance & Accounting"
          content="This is a Finance & Accounting page"
        />
      </Helmet>

      <div className="financeMain">
        <div className="buttonDiv">
          <Link
            to="overview"
            className={
              toggleBtn == 0 ? "selectedBtn firstSelected" : "notSelected"
            }
            onClick={() => handleButtonClick(0)}
          >
            Overview
          </Link>
          <Link
            to="Chart-accounts"
            className={toggleBtn == 1 ? "selectedBtn" : "notSelected"}
            onClick={() => handleButtonClick(1)}
          >
            Chart of Account
          </Link>
          <Link
            to="Ledger"
            className={toggleBtn == 2 ? "selectedBtn" : "notSelected"}
            onClick={() => handleButtonClick(2)}
          >
           Ledger
          </Link>
        </div>
          </div>
          <div className="financeChild">   
          <Outlet/>
          </div>
    </div>
  );
};

export default Finance;
