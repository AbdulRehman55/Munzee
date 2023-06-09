import React from "react";
import "./styles.scss";
import userIconImg from "../../assets/images/ua6vz.png";
import { archivedLocales as a } from "./archivedLocales";
import techIssuesCardImg from "../../assets/images/tech_issues_card.png";
import { Typography } from "@mui/material";

export type itemProps = Readonly<{
  title: string;
  archivedAt: string;
  deployedAt: string;
  livedDays: number;
  numCaptures: number;
  lastCaptureAt?: string;
  lastCaptureBy?: string;
  points: number;
}>;

const ArchivedItem = (itemData: itemProps): JSX.Element => {
  const {
    title,
    archivedAt,
    deployedAt,
    livedDays,
    numCaptures,
    lastCaptureAt,
    lastCaptureBy,
    points,
  } = itemData;
  const getLastCapturedContent = () => {
    if (lastCaptureAt) {
      return (
        <>
          <img src={userIconImg} alt="User icon" />
          <Typography>
            {a.lastCaptured} <span>{lastCaptureAt}</span>
          </Typography>
          <Typography>
            {a.lastCapturedBy} <a href="#">{lastCaptureBy}</a>
          </Typography>
        </>
      );
    } else {
      return <span className="never-captured">{a.neverCaptured}</span>;
    }
  };

  return (
    <div className="archived-item">
      <div className="title">
        <img src={techIssuesCardImg} alt="User Avatar" />
        <a href="#">{title}</a>
      </div>
      <div className="details">
        <span>{archivedAt}</span>
        <span>{deployedAt}</span>
        <span>lived {livedDays} days</span>
        <span>{`${numCaptures} captures`}</span>
      </div>
      <div className="last-captured">{getLastCapturedContent()}</div>
      <div className="points-block">
        <span>{points}</span>
        <span>{a.points}</span>
      </div>
    </div>
  );
};

export default ArchivedItem;
