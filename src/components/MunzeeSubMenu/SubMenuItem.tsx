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
            return <Nav.Link onClick={() => {
                if(!children) {
                    navigate(`/m/${username}${link}`);
                }
            }}
                className={`menu-item ${(location.pathname == ('/m/'+ username + link)) ? "active" : ""}`}>
                {title}
            </Nav.Link>
        }
    }
    return (
        <>{getItem()}</>
    )
}

export default SubMenuItem;