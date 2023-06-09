import React from "react";
import "./styles.scss";
import DropDownItems from "./DropDownItems";
import { menuItem } from "./index";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const SubMenuItem = ({ title, link, children, username }: menuItem): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const getItem = () => {
        if (children) {
            return (
                <DropDownItems items={children} title={title} link={link} username={username} />
            )
        } else {
            return  <Nav.Link
                        className={`menu-item ${(link.length > 0 && location.pathname.includes(link)) ? "active" : ""}`}
                        onClick={() => {
                                if(!children) {
                                        navigate(`/m/${username}${link}`);
                                    }
                                }}>
                        {title}
                    </Nav.Link>
        }
    }
    return (
        <>{getItem()}</>
    )
}

export default SubMenuItem;