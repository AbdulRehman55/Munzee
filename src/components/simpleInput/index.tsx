import React from "react";
import "./style.scss";

interface Iprops {
  placeholder: string;
  title: string;
  label: string;
}

const SimpleInput = ({ placeholder, title, label }: Iprops): JSX.Element => {
  return (
    <div className="simple-input-container">
      <p>
        {title}
        <input type="text" placeholder={placeholder}></input>
        <input type="button" value={label}></input>
      </p>
    </div>
  );
};

export default SimpleInput;
