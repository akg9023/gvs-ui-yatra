import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner(props) {
  return (
    <div className="spinner-container">
      <div style={{position:props.style.position,textAlign:props.style.textAlign}} className="loading-spinner">
      </div>
    </div>
  );
}