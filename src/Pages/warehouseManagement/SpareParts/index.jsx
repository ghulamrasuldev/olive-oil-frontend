
import React, { useState } from "react";
import "./Style.scss";
import ProductionGraph from "../../../Components/Common/ProductionGraphsTwo";
import Search from "../../../assets/icons/search.png";
import WarehouseOilTable from "../../../Components/Common/WarehouseOilTable";
import { Link, Outlet } from "react-router-dom";
import CanBottle from "../CanAndBottle";
import SpareParts from "../SpareParts";
import CustomSearchInput from "../../../Components/Common/customSearch";
import { Helmet } from "react-helmet-async";
import { WarehouseOilTableData } from "../../../Components/Common/Table/constant";
import DeletePopup from "../../../Components/Common/DeletePopUp";
import TransactionForm from "../addStock";
import EditStock from "../EditStock";
import { useSelector } from "react-redux";
import Adjustment from "../Adjustment";
import AddParts from "./AddParts";

const SparePartsComponent = () => {
  const [searchBar, setSearchBar] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const isEditStockOpen = useSelector(
    (state) => state.selectedStock.isEditStockOpen
  );
  const address = "/warehouse-management";

  return (
    <div>
      
      <div className="SparePartsMain">
        <div className="graphs">
          <ProductionGraph />
        </div>
        <div className="inStockDiv">
          <p className="p1">In Stock</p>
          <div className="stockBtn">
            {/* <TransactionForm /> */}
            <AddParts/>
            <CustomSearchInput
              placeholder="search"
              onSearchChange={setSearchBar}
              iconShow={true}
            />
          </div>
        </div>
        <div className="tableDiv">
          <div className="mainTable">
            <WarehouseOilTable
              searchVal={searchBar}
              // data={WarehouseOilTableData}
              setShowDelete={setShowDelete}
              address={address}
              check={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparePartsComponent;

