import React from "react";
import "./styles.scss";
import { Button } from "@mui/material";

interface iProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const MapGreenButton = ({
  id,
  title,
  isActive,
  onClick,
}: iProps): JSX.Element => {
  return (
    <Button
      className={`map-green-btn ${isActive && "active"}`}
      onClick={onClick}
      id={id}
    >
      {title}
    </Button>
  );
};

export default MapGreenButton;
