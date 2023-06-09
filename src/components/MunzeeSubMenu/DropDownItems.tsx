import React from "react";
import "./styles.scss";
import { menuItem } from "./index";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, useNavigate } from "react-router-dom";

interface ItemsProps {
    items: menuItem[];
    title: string;
    link: string;
    username?: string;
}
const DropDownItems = ({ items, title, link, username }: ItemsProps): JSX.Element => {

    const location = useLocation();
    const navigate = useNavigate();

    const getItems = () => {
        return items.map((item: menuItem) => {
            return <NavDropdown.Item onClick={() => {
                navigate(`/m/${username}${item.link}`);
            }}>
                {item.title}
            </NavDropdown.Item>
        })
    }

    return (
        <NavDropdown title={title} className={`menu-item ${(link.length > 0 && location.pathname.includes(link)) ? "active" : ""}`}>
            {getItems()}
        </NavDropdown>
    );
}

export default DropDownItems;