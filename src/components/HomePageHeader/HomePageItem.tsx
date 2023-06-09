import React from "react";
import "./styles.scss";
import { itemDataType } from "./homePageStructure";
import { Tooltip, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import DropDownItems from "./DropDownItems";
import Nav from "react-bootstrap/Nav";
interface ItemProps {
    id: number;
    itemData: itemDataType;
}
const HomePageItem = ({ id, itemData }: ItemProps):JSX.Element => {
    const location = useLocation();

    if (itemData.childrenItems){
        return (
            <DropDownItems items={itemData.childrenItems} title={itemData.title} link={itemData.link} icon={itemData.icon}/>
        )
    } else {
        return <Nav.Link href={itemData.childrenItems ? "#" : itemData.link}
                                 className={`menu-item ${(itemData.link.length > 0 && location.pathname.includes(itemData.link)) ? "active" : ""}`}>
                    <Tooltip title={itemData.title}>
                        <Box className="icon-wrapper">
                            {itemData?.icon ? itemData?.icon : <span>Icon</span>}
                        </Box>
                    </Tooltip>
               </Nav.Link>

    }
}

export default HomePageItem;