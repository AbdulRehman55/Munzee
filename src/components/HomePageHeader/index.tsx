import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logos/munzee-logo.svg';
import HomePageItem from "./HomePageItem";
import { mockData } from "./homePageStructure";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ProfileMenu from "./ProfileMenu";

const HomePageHeader = (): JSX.Element => {
    return (
        <header className="home-page-header">
            <div className="home-page-header-wrapper content-wrapper">
                <div className="logo">
                    <Link to="/home">
                        <img src={logo} alt="logo"></img>
                    </Link>
                </div>
                <div className="menu-items">
                    <Navbar expand="lg">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                { mockData.map((item, index) =>
                                    <HomePageItem id={index} itemData={item} />)
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <ProfileMenu />
            </div>
        </header>
    );
}

export default HomePageHeader;