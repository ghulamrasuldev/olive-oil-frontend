import React, { useState } from "react";
import "./orderManagement.scss";
import { Helmet } from "react-helmet-async";
import Theme from "../../Theme/Theme";
import Cards from "../../Components/Common/TopCards/Cards";
import { useTranslation } from "react-i18next";
import OrderProductionGraph from "./Graph/Index";
import Order from "../../Components/Common/Orders/Order";
import Slider from "../../Components/Common/Slider/slider";
import { Link, Outlet } from "react-router-dom";
import Form from "./orderForm/Form";
import { Fade } from "react-awesome-reveal";


const OrderManagement = () => {
  const lightTheme = Theme();
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Order Management</title>
        <meta
          name="Order Management"
          content="This is a Order Management page"
        />
      </Helmet>
      <div className="orderManagement">
        <div className="createOrderDiv">
          <p className="p1" style={{ color: `${lightTheme.blackText}` }}>
            {t("Mills.1")}
          </p>

          <Form />
        </div>

        <Cards />
        <OrderProductionGraph />
        <Fade>
        <Order qrcode={true} />
        </Fade>
      </div>
    </div>
  );
};

export default OrderManagement;
