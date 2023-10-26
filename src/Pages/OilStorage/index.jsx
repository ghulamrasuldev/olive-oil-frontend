import React, { useState } from "react";
import "./Style.scss";
import { Helmet } from "react-helmet-async";
import ProductionGraph from "../../Components/Common/ProductionGraphsTwo";
import WarehouseOilTable from "../../Components/Common/WarehouseOilTable";
import CustomSearchInput from "../../Components/Common/customSearch";
import { WarehouseOilTableData } from "../../Components/Common/Table/constant";
import DeletePopup from "../../Components/Common/DeletePopUp";
import { useSelector } from "react-redux";
import EditStock from "../warehouseManagement/EditStock";


const OilStorage = () => {
  const [searchBar, setSearchBar] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const isOpenEditOilStock = useSelector(
    (state) => state.selectedStock.isEditOpenOilStock
  );
  const address='/oil-storage'
  return (
    <div>
      <Helmet>
        <title>Oil Storage</title>
        <meta name="Oil Storage" content="This is a Oil Storage page" />
      </Helmet>
      <div className="oilStorage">
       
        <div className="graphs">
          <ProductionGraph />
        </div>
        <div className="inStockDiv">
          <p className="p1">In Stock</p>
          <div className="stockBtn">
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
              data={WarehouseOilTableData}
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

export default OilStorage;
