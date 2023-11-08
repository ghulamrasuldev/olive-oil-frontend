import React from "react";
import NavBar from "../../Components/NavBar/navBar";
import Cards from "../../Components/Common/TopCards/Cards";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ProductionGraph from "../../Components/Common/ProductionGraphs";
import Reports from "./GenerateReport";
import "./dashboard.scss";
import GraphCalendar from "./graphAndCalendar";
import Order from "../../Components/Common/Orders/Order"; 
import Theme from '../../Theme/Theme'
import { Fade } from "react-awesome-reveal";
import { Slide } from "react-awesome-reveal";

const Dashboard = () => {
  const lightTheme = Theme();
  const {t, i18n } = useTranslation();

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard&Analytics</title>
        <meta name="Dashboard&Analytics" content="This is a Dashboard page" />
      </Helmet>
      <div className="dashboardMain">
      <p style={{ color: `${lightTheme.blackText}`,marginLeft:'25px' }}>{t('Mills.1')}</p>
        <Cards />
        <div className="graphAndReport">
          <GraphCalendar />
          <Reports />
        </div>
        <div>
          <Fade>
          <Order qrcode={false} />
          </Fade>
        </div>
        <button onClick={() => handleLanguage("en")}>English</button>
        <button onClick={() => handleLanguage("arb")}>Arabic</button>
      </div>
    </div>
  );
};

export default Dashboard;
