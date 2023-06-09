import React from "react";
import "./styles.scss";
import { photosItemType } from "../../screens/Feed/PhotosFeed";
import { Container } from "@mui/material";
import { timeAgoFromTimeStamp, userAvatar } from "../../utils/functions/functions";
import { Link } from "react-router-dom";

const PhotosFeedItem = ({
    pathSmall,
    photo,
    timestamp,
    user,
    munzeeData
}: photosItemType): JSX.Element => {

    const userLink = `/m/${user.username}`;
    const munzeeCode = munzeeData != undefined ? munzeeData.code : "/";

    return (
        <div className="photos-feed-item">
            <Link to={userLink}><img src={userAvatar(parseInt(user.userId))} alt="User Avatar" /></Link>
            <div className="photos-wrapper">
                <Link to={`${munzeeCode}photos/`}><img src={pathSmall + photo} alt="Users photo" /></Link>
                <Container>
                    <span className="user-name">
                        <Link to={userLink}>{user.username}</Link>
                        <span> added a photo at</span>
                    </span>
                    <Link to={munzeeCode} className="user-reply">
                        <img src={munzeeData.pinIcon} alt="User avatar" />
                        {munzeeData.friendlyName}
                    </Link>
                </Container>
                <span className="time">{timeAgoFromTimeStamp(timestamp * 1000)}</span>
            </div>
        </div>
    )
}

export default PhotosFeedItem;