import React, { useRef, useEffect, useState } from "react";
import "./styles.scss";

const LeaderboardMenu = () => {
  const [active, setActive] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActive("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div
      className={`leaderboard-dropdown pull-right ${active}`}
      ref={dropdownRef}
    >
      <button
        className="btn btn-default"
        onClick={() => {
          if (active === "open") {
            setActive("");
          } else {
            setActive("open");
          }
        }}
      >
        Select Category
        <span className="caret"></span>
      </button>
      <ul className="leaderboard-dropdown-menu">
        <li className="leaderboard-dropdown-submenu pull-left">
          <a href="#">All Points</a>
          <ul className="leaderboard-dropdown-menu">
            <li>
              <a href="/leaderboard/players/all/total">
                Total
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/all/capture">
                Capture
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/all/deploy">
                Deploy
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/all/capon">
                CapOn
              </a>
            </li>
          </ul>
        </li>
        <li className="leaderboard-dropdown-submenu pull-left">
          <a href="#">Physical Points</a>
          <ul className="leaderboard-dropdown-menu">
            <li>
              <a href="/leaderboard/players/physical/total">
                Total
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/physical/capture">
                Capture
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/physical/deploy">
                Deploy
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/physical/capon">
                CapOn
              </a>
            </li>
          </ul>
        </li>
        <li className="leaderboard-dropdown-submenu pull-left">
          <a href="#">Virtual Points</a>
          <ul className="leaderboard-dropdown-menu">
            <li>
              <a href="/leaderboard/players/virtual/total">
                Total
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/virtual/capture">
                Capture
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/virtual/deploy">
                Deploy
              </a>
            </li>
            <li>
              <a href="/leaderboard/players/virtual/capon">
                CapOn
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default LeaderboardMenu;
