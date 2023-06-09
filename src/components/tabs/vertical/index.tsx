import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";

interface Item {
  title: string;
  route: string;
}

interface Props {
  data: Item[];
}

const VerticalTabs = ({ data }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="vertical-tabs-container">
      {data?.map((item, index) => {
        return (
          <p
            key={`verticalTab:${index}`}
            className={pathname === item?.route ? "active" : "unactive"}
            onClick={() => {
              navigate(item?.route);
            }}
          >
            {item?.title}
          </p>
        );
      })}
    </div>
  );
};

export default VerticalTabs;
