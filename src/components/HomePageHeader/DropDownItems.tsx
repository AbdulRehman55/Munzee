import React, { useState } from "react";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import { itemDataType } from "./homePageStructure";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Tooltip, Box } from "@mui/material";

interface iProps {
    items: itemDataType[];
    title: string;
    link: string;
    icon: ReactNode;
}

const DropDownItems = ({ items, title, link, icon }: iProps):JSX.Element => {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const showDropdown = ()=>{
        setShow(!show);
    }
    const hideDropdown = () => {
        setShow(false);
    }

    const getItems = () => {
        return items.map( (item: itemDataType) => {
            return (
                <NavDropdown.Item href={item.link}>
                    {item.childrenItems ?
                        <NavDropdown title={item.title}
                                     className="menu-item"
                                     show={show}
                                     onMouseEnter={showDropdown}
                                     onMouseLeave={hideDropdown}>
                            {item.childrenItems.map(subItem => {
                                return <NavDropdown.Item href={subItem.link}>{subItem.title}</NavDropdown.Item>
                            })}
                        </NavDropdown>
                        : item.title}
                </NavDropdown.Item>
            )
        })
    }

    return(
        <NavDropdown title={<Tooltip title={title}><Box className="icon-wrapper">{icon}</Box></Tooltip>} className={`menu-item ${(link.length > 0 && location.pathname.includes(link)) ? "active" : ""}`}>
            {getItems()}
        </NavDropdown>
    );
}

export default DropDownItems;