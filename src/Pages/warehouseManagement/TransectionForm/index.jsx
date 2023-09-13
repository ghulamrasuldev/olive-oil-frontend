import React, { useState, useRef } from "react";
import "./Transection.scss"
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const TransectionForm = ({ setTransectionForm }) => {
  const navigate = useNavigate();
  
  const handleCancle = () => {
   
    setTransectionForm(false);
    navigate("/warehouse-management", { replace: true });
  };
  return (
    <div className="transectionForm">
     
      <div className="formDiv1">
        <p className="p1">Create New Customer</p>
        <IoMdClose
          color="black"
          size={20}
          onClick={handleCancle}
          className="icon"
        />
      </div>
      <div className="toggleDiv1">
        <div className="nameDiv1">
          <p className="p5">Transection id</p>
          <div className="inputDiv1">
            <div className="nameDiv1">
              <input type="text" />
            </div>
            
          
          </div>
       
        </div>
        <div className="nameDiv1">
          <p className="p5">Your Name(required)*</p>
          <div className="inputDiv1">
            <div className="nameDiv1">
              <input type="text" />
            </div>
            
          
          </div>
       
        </div>

        
      </div>
      <div className="toggleDiv1">
        <div className="nameDiv1">
          <p className="p5">Amount</p>
          <div className="inputDiv1">
            <div className="nameDiv1">
              <input type="text" />
            </div>
            
          
          </div>
       
        </div>
        <div className="nameDiv1">
          <p className="p5">Autherize By</p>
          <div className="inputDiv1">
            <div className="nameDiv1">
              <input type="text" />
            </div>
            
          
          </div>
       
        </div>

        
      </div>
      <div className="toggleDiv1">
        <div className="nameDiv1">
          <p className="p5">Linked Orders</p>
          <div className="inputDiv1">
            <div className="nameDiv1">
              <input type="text"  />
            </div>
            
          
          </div>
       
        </div>
        <div className="nameDiv1">
          <p className="p5">Payment Methods</p>
          <div className="inputDiv1">
            <div className="nameDiv1">
              <input type="text"/>
            </div>
            
          
          </div>
       
        </div>

        
      </div>

      <div className="buttons1">
      <p className="btnClose1" onClick={handleCancle}>Close</p>
        <p className="btnCreate1">Save</p>
      </div>
    </div>
  );
};

export default TransectionForm;
