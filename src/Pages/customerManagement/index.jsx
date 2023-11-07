import React, { useState } from "react";
import "./Style.scss";
import { Helmet } from "react-helmet-async";
import Theme from "../../Theme/Theme";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cards from "../../Components/Common/TopCards/Cards";
import ProductionGraph from "../../Components/Common/ProductionGraphsTwo";
import Search from "../../assets/icons/search.png";
import CustomerTable from "./Table/index";
import CustomerForm from "./CustomerForm/index";
import CustomSearchInput from "../../Components/Common/customSearch";
import DeletePopup from "../../Components/Common/DeletePopUp";
import { Fade } from "react-awesome-reveal";


const CustomerManagement = () => {
  const { t } = useTranslation();
  const lightTheme = Theme();
  const [searchBar, setSearchBar] = useState();
  const [showForm, setShowForm] = useState(0);
  const[showDelete,setShowDelete]=useState(false)
  const address = "/customer-management";

  const authToken=localStorage.getItem('authToken')
  
  return (
    <div>
      <Helmet>
        <title>Customer Management</title>
        <meta
          name="Customer Management"
          content="This is a Customer Management page"
        />
      </Helmet>
      <div className="customerManagement">
        <div className="createCustomerDiv">
          <p className="p1" style={{ color: `${lightTheme.blackText}` }}>
            {t("Mills.1")}
          </p>
          
          <CustomerForm address={address} authToken={authToken} />
        </div>

        <Cards />
        <ProductionGraph />
          <Fade>
        <div className="customerTableMain">
          <p className="p1">Customers</p>
          <CustomSearchInput
            placeholder="search customer"
            onSearchChange={setSearchBar}
            iconShow={true}
          />
        </div>
        <div className="customerTable">
          <CustomerTable searchBar={searchBar} setShowDelete={setShowDelete} />
        </div>
          </Fade>
      </div>
    </div>
  );
};

export default CustomerManagement;
