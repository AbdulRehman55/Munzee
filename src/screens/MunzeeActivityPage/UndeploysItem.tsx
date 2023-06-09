import React from "react";
import "./styles.scss";
import techIssuesCardImg from "../../assets/images/tech_issues_card.png";
import { archivedLocales as a } from "../ArchivedPage/archivedLocales";
import userIconImg from "../../assets/images/ua6vz.png";
import { Typography } from "@mui/material";
import { Munzee } from "../../munzee-backend/types";
import { Link } from "react-router-dom";
import { timeAgoFromTimeStamp, userAvatar } from "../../utils/functions/functions";

// export interface undeploysItemType {
//     title: string;
//     details: string[];
//     lastCapturedTime?: string;
//     lastCapturedBy?: string;
// }

const UndeploysItem = (munzee: Munzee): JSX.Element => {

    const getLastCapturedContent = () => {
        if (parseInt(munzee.last_captured_at ?? '0') != 0) {
            return (
                <>
                    <Link to={`m/${munzee.last_captured_username}`}><img src={userAvatar(munzee.last_captured_by_id ?? 0)} alt="User icon" /></Link>
                    <Typography>{a.lastCaptured} <span>{timeAgoFromTimeStamp(parseInt(munzee.last_captured_at ?? '0'))}</span><span> by <Link to={`/m/${munzee.last_captured_username}/`}>{munzee.last_captured_username}</Link></span></Typography>
                    <Typography>{a.lastCapturedBy} <Link to={`/m/${munzee.last_captured_username}/`}>{munzee.last_captured_username}</Link></Typography>
                </>
            )
        } else {
            return (
                <span className="never-captured">{a.neverCaptured}</span>
            )
        }
    };

    const getDetailsContent = () => {
        return <>
            <span>{munzee.number_of_captures} {munzee.number_of_captures == 1 ? "capture" : "captures"}</span>
            {munzee.undeployed_days && <span>{munzee.undeployed_days == 0 ? "today" : `${munzee.undeployed_days} ${munzee.undeployed_days == 1 ? 'day' : 'days'} ago`}</span>}
        </>
    };

    return (
        <div className='undeploys-item'>
            <div className="title">
                <Link to={munzee.url ?? ""}><img src={munzee.pin_icon} alt="Pin" /></Link>
                <Link to={munzee.url ?? ""}>{munzee.friendly_name}</Link>
            </div>
            <div className="details">
                {getDetailsContent()}
            </div>
            <div className="last-captured">
                {getLastCapturedContent()}
            </div>
        </div>
    )
}

export default UndeploysItem;