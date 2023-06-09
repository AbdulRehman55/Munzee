import React from "react";
import "./styles.scss";
import { munzeeSubMenuStructure } from "./munzeeSubMenuStructure";
import SubMenuItem from "./SubMenuItem";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useParams } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";

export interface menuItem {
  title: string;
  link: string;
  children?: menuItem[]
  username?: string
}

const MunzeeSubMenu = ():JSX.Element => {
  const { munzeeId } = useParams();
  const { user, publicProfile } = React.useContext(ClientContext);

  const getItems = () => {
    return munzeeSubMenuStructure.map((item: menuItem) => {
      if(user?.userId != publicProfile?.userId) {
        if(item.link == "/undeploys" || item.link == "/archived") { return <></> }
      }
      return (
          <SubMenuItem title={item.title}
                       link={`/${munzeeId}${item.link}`}
                       children={item.children && item.children}
                       username={publicProfile?.username}
          />
      )
    });
  };

  return (
      <menu id="sub-menu">
        <div className="sub-menu-wrapper">
            <Navbar expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {getItems()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
      </menu>
  )
}

export default MunzeeSubMenu;