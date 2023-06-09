import React from "react";
import "./styles.scss";

interface Iprops {
  className: string;
  value: string;
  label?: string;
  placeholder: string;
  onChange?: (e: any) => void;
  type?: string;
}

const Input = ({
  className,
  label,
  onChange,
  value,
  placeholder,
  type,
}: Iprops): JSX.Element => {
  return (
    <>
      <p className="inputlabel">{label}</p>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        type={type}
      />
    </>
  );
};

export default Input;
