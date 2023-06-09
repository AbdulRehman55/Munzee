import React from "react";
import "./style.scss";
import LeaderboardMenu from "../menu";

interface Props {
  title?: string;
  subtitle?: string;
  menu?: boolean;
}

const LeaderboardHeader = ({ title, subtitle, menu }: Props) => {
  return (
    <div className="leaderboard-header-container">
      <h1>{title}</h1>
      <div className="row">
        <h3>{subtitle}</h3>
        {menu !== false && <LeaderboardMenu />}
      </div>
    </div>
  );
};

export default LeaderboardHeader;
