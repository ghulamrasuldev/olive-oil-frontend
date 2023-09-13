import React,{useState} from "react";
import "./Style.scss";
import ProductionGraph from "../../Components/Common/ProductionGraphsTwo";
import Search from "../../assets/icons/search.png";
import WarehouseOilTable from "../../Components/Common/WarehouseOilTable";
import { Link } from "react-router-dom";
import CanBottle from "./CanAndBottle";
import SpareParts from "./SpareParts";
import TransectionForm from "./TransectionForm";

const WareHouse = () => {
  const [searchBar, setSearchBar] = useState();
  const [showForm, setShowForm] = useState(false);
  const [sparePart, setSparePart] = useState(false);
  const [transectionForm, setTransectionForm] = useState(false);
  
  return (
    <div>
      <div className="wareHouseMain">
        <div className="bottleAndSpare">
          <Link to='can-bottle' onClick={() => {
            setShowForm(true)
            setSparePart(false)
          }}>Can and Bottle</Link>
          <Link to='spare-parts' onClick={() => {
            setShowForm(false)
            setSparePart(true)
          }}>Spare Parts</Link>
        </div>
        {
          showForm&&<CanBottle setShowForm={setShowForm}/>
        }
        {
          sparePart&&<SpareParts setSparePart={setSparePart}/>
        }
        <div className="graphs">
          <ProductionGraph />
        </div>
        <div className="inStockDiv">
          <p className="p1">In Stock</p>
          <div className="stockBtn">
            <button>Adjusment</button>
            <Link to="transection-form" onClick={() => {
           setTransectionForm(true)
          }}>+ Add New</Link>
                    <div className="searchDiv">
              <img src={Search} alt="search" height={20} />
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </div>
            {
          transectionForm&&<TransectionForm setTransectionForm={setTransectionForm}/>
        }
          </div>
        </div>
        
        <div className="tableDiv">
          <div className="mainTable">
            <WarehouseOilTable searchVal={searchBar}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouse;
