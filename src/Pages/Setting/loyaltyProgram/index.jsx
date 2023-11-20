import React, { useEffect, useState } from "react";
import "./style.scss";
import { BiSolidEdit } from "react-icons/bi";
import UpdateLoyaltyProgram from "./DialogBox";
import apiService from "../../../Services/apiService";

const LoyaltyProgram = () => {
  const [data, setData] = useState([]);
  const getPercentage = async () => {
    try {
      setData([]);
      const res = await apiService(
        "GET",
        "/Loyalty/loyalty-percentage",
        {},
        {}
      );
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      console.log("Error in fetching the percentage", error);
    }
  };
  useEffect(() => {
    getPercentage();
  }, []);

  return (
    <div className="loyaltyProgramMain">
      {data &&
        data.map((item, index) => {
          return (
            <div className="div1">
              <div className="iconDiv">
                <UpdateLoyaltyProgram
                  program={item.program}
                  reloadData={getPercentage}
                />
              </div>
              <div className="textDiv">
                <p>
                  {item.program} <spam>{item.percentage}.0%</spam>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LoyaltyProgram;
