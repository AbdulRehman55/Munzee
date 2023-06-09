import React from "react";
import "./styles.scss";
import { subMenuStructure } from "./subMenuStructure";
import SubMenuItem from "./SubMenuItem";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClientContext } from "../../context/ClientContext";

export interface menuItem {
  title: string;
  link: string;
  children?: menuItem[]
  username?: string
}

const HomePageMenu = ():JSX.Element => {

  const { user, publicProfile } = React.useContext(ClientContext);

  const getItems = () => {
    return subMenuStructure.map((item: menuItem) => {
      if(user?.userId != publicProfile?.userId) {
        if(item.link == "/undeploys" || item.link == "/archived") { return <></> }
      }
      return (
          <SubMenuItem title={item.title}
                       link={item.link}
                       children={item.children && item.children}
                       username={publicProfile?.username}
          />
      )
    });
  };

  return (
      <menu id="sub-menu-green">
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

export default HomePageMenu;