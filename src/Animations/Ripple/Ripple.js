import React from "react";
import "./Ripple.css";

const Ripple = ({ size = 20 }) => {
  return (
    <div className="lds-ripple" style={{ width: size, height: size }}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Ripple;
