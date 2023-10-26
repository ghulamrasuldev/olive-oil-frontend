import React, { useState } from "react";
import "./Style.scss";
import ProductionGraph from "../../Components/Common/ProductionGraphsTwo";
import Search from "../../assets/icons/search.png";
import WarehouseOilTable from "../../Components/Common/WarehouseOilTable";
import { Link, Outlet } from "react-router-dom";
import CanBottle from "./CanAndBottle";
import SpareParts from "./SpareParts";
import CustomSearchInput from "../../Components/Common/customSearch";
import { Helmet } from "react-helmet-async";
import { WarehouseOilTableData } from "../../Components/Common/Table/constant";
import DeletePopup from "../../Components/Common/DeletePopUp";
import TransactionForm from "./addStock";
import EditStock from "./EditStock";
import { useSelector } from "react-redux";
import Adjustment from "./Adjustment";

const WareHouse = () => {
  const [searchBar, setSearchBar] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedLink, setSelectedLink] = useState("CanAndBottle");
  const isEditStockOpen = useSelector(
    (state) => state.selectedStock.isEditStockOpen
  );
  const address = "/warehouse-management";

  return (
    <div>
      <Helmet>
        <title>Warehouse Management</title>
        <meta
          name="Warehouse Management"
          content="This is a Warehouse Management page"
        />
      </Helmet>
      <div className="wareHouseMain">
        <div className="bottleAndSpare">
          <Link
            to="can-and-bottles"
            className={
              selectedLink === "CanAndBottle" ? "selected" : "notSelected"
            }
            onClick={() => setSelectedLink("CanAndBottle")}
          >
            Can And Bottle
          </Link>
          <Link to="spare-parts" className={
              selectedLink === "SparePart" ? "selected" : "notSelected"
            }
            onClick={() => setSelectedLink("SparePart")}>Spare Parts</Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default WareHouse;
