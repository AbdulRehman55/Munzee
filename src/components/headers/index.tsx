import React, { useState, useEffect } from "react";
import { Container } from "../index";
import logo from "../../assets/images/logos/munzee-logo.svg";
import "./styles.scss";
import { Button } from "../index";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropDown, setDropDown] = useState(false);
  const [navMenu, setNavMenu] = useState(false);

  useEffect(() => {
    if (navMenu) {
      setNavMenu(false);
    }
    window.scroll(0, 0);
  }, [location]);

  return (
    <div className="header">
      <Container>
        <div className="navbar">
          <div className="logo" onClick={() => (window.location.href = "/")}>
            <img src={logo} alt="logo" />
          </div>
          <div onClick={() => setNavMenu(!navMenu)} className="collapse">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="tabs">
            <ul className="links">
              <li
                className={`list ${location.pathname === "/game" && "active"}`}
              >
                <Link to="game">Game</Link>
              </li>
              <li className="list">
                <Link to="types">Types</Link>
              </li>
              <li className="list">
                <Link to="https://store.freezetag.com/" target={"_blank"}>
                  Store
                </Link>
              </li>
              <li className="list">
                <Link
                  to="https://munzee.zendesk.com/hc/en-us"
                  target={"_blank"}
                >
                  Help
                </Link>
              </li>
              <li className="list">
                <Link
                    to="https://www.munzeeblog.com/"
                    target={"_blank"}
                >
                  Blog
                </Link>
              </li>
              <li
                className={`list ${dropDown ? "active" : ""}`}
                onClick={() => setDropDown(!dropDown)}
              >
                {/* <Link to="/"> */}
                <a href="javascript:void(0)">
                  Company <span className="caret"></span>{" "}
                </a>
                {/* </Link> */}
                {dropDown && (
                  <ul className="dropdownmenu">
                    <li className="dropdownlist">
                      <Link to="company/about">About</Link>
                    </li>
                    <li className="dropdownlist">
                      <Link to="company/team">Team</Link>
                    </li>
                    <li className="dropdownlist">
                      <Link to="company/contact">Contact</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
            <div className="buttons">
              <Button
                onClick={() => navigate("/download")}
                className="primaryButton btn-success btn"
              >
                Download
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="secondaryButton btn"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        {navMenu && (
          <div className="tabsmenu">
            <ul className="menulist">
              <li className="list">
                <Link to="game">Game</Link>
              </li>
              <li className="list">
                <Link to="/">Types</Link>
              </li>
              <li className="list">
                <Link to="https://store.freezetag.com/" target={"_blank"}>
                  Store
                </Link>
              </li>
              <li className="list">
                <Link
                  to="https://munzee.zendesk.com/hc/en-us"
                  target={"_blank"}
                >
                  Help
                </Link>
              </li>
              <li
                className={`list ${dropDown ? "active" : ""}`}
                onClick={() => setDropDown(!dropDown)}
              >
                <a href="javascript:void(0)">
                  Company <span className="caret"></span>
                </a>
                {dropDown && (
                  <ul className="menudropdown">
                    <li className="menudropdownlist">
                      {" "}
                      <Link to="/">About</Link>
                    </li>
                    <li className="menudropdownlist">
                      {" "}
                      <Link to="/">Team</Link>
                    </li>
                    <li className="menudropdownlist">
                      {" "}
                      <Link to="/">Contact</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
            <div className="menubuttons">
              <Button
                className="primaryButton btn-success btn"
                onClick={() => navigate("/download")}
              >
                Download
              </Button>
              <Button
                className="secondaryButton btn"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;
