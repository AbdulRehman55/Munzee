import React from "react";
import "./styles.scss";
import { activityItemType, feedItemType } from "../../screens/Feed/ActivityFeed";
import { feedLocales } from "../../screens/Feed/feedLocales";
import { Flag, Create, Public, EditOutlined, BuildOutlined, VisibilityOff, EmojiEvents as Trophy, SportsScore, CameraAlt, Hotel } from "@mui/icons-material";
import { timeAgoFromTimeStamp, userAvatar } from "../../utils/functions/functions";
import { Link } from "@mui/material";
import { APP_CONFIG } from "../../config/config";


const ActivityFeedItem = ({
    currentUser,

    itemId,
    itemType,
    points,
    timestamp,
    userData,
    munzeeData,

    notes,
    captureId,
    roverId,
    badgeId,
    newLevel,
    logo,
    name,
    typeId,
    typeName,
    totalCaptures,
    totalPoints,
    text,
    message,
    photo
}: activityItemType): JSX.Element => {
    var icon = <></>;

    const userId = userData != undefined ? userData.user_id : 0;
    const username = userData != undefined ? userData.username : "";
    const userLink = `/m/${userData != undefined ? userData.username : ""}`;
    const munzeeCode = `${munzeeData != undefined ? munzeeData.code : ''}`;

    if (itemType == feedItemType.deploy || itemType == feedItemType.capture || itemType == feedItemType.captureOn) {
        if (itemType == feedItemType.deploy) {
            icon = <Public fontSize="inherit" />
        } else {
            icon = <Flag fontSize="inherit" />
        }
        //for feedItemType.capture may be user data change so need to test
        return (
            <div className="activity-feed-item">
                <div className="info-block">
                    <a href={userLink}><img src={userAvatar(userId)} alt="User Avatar" /></a>
                    <div className="info-wrapper">
                        <span>
                            <a href={munzeeCode}>{icon}</a>
                            <span>
                                <a href={userLink}>{username}</a>
                            </span> {itemType}
                        </span>
                        <span>{timeAgoFromTimeStamp(timestamp * 1000)}</span>
                    </div>
                </div>
                <div className="right-side">
                    <a className="type-block" href={munzeeCode}>
                        {munzeeData && <img src={munzeeData?.pinIcon} alt="Munzee Type" />}
                        {munzeeData && <span>{munzeeData?.friendlyName}</span>}
                    </a>
                    <div className="points-block">
                        <span>{points}</span>
                        <span>{feedLocales.activityFeedPoints}</span>
                    </div>
                </div>
            </div>
        )
    } else {
        let tmpUserImage = '';
        let tmpUserName = '';
        let tmpUserLink = '';
        let tmpUserPostFix = '';
        let tmpMessage: undefined | any = undefined;

        let isDislayReplay = false;
        let replayIcon = '';
        let replayName = '';
        let replayLink = '';
        if (itemType == feedItemType.entry) {
            if (typeId == 3) {
                icon = <VisibilityOff fontSize="inherit" />
            } else if (typeId == 4) {
                icon = <BuildOutlined fontSize="inherit" />
            } else {
                icon = <EditOutlined fontSize="inherit" />
            }
            tmpUserImage = userAvatar(userId)
            tmpUserName = username;
            tmpUserLink = `/m/${username}`;
            tmpUserPostFix = " wrote";

            tmpMessage = <span>{`"${notes}"`}</span>

            isDislayReplay = munzeeData != undefined;
            if (isDislayReplay) {
                replayIcon = munzeeData?.pinIcon ?? ""
                replayName = munzeeData?.friendlyName ?? ""
                replayLink = munzeeCode;
            }
        } else if (itemType == feedItemType.badge) {
            icon = <Trophy fontSize="inherit" />
            tmpUserImage = logo ?? "";
            tmpUserLink = `/m/${username}/badges`;
            tmpUserPostFix = "Congratulations!"

            tmpMessage = <span>You've earned the <i>"{name}"</i> badge!</span>
        } else if (itemType == feedItemType.level) {
            icon = <Trophy fontSize="inherit" />
            tmpUserImage = userAvatar(currentUser?.userId)
            tmpUserLink = `/m/${currentUser?.username}`;
            tmpUserPostFix = "Congratulations!"

            tmpMessage = <span>You've reached level {newLevel}</span>
        } else if (itemType == feedItemType.roverGoalReached) {
            icon = <SportsScore fontSize="inherit" />
            tmpUserImage = APP_CONFIG.IMAGE_BASE_URL + "rover/rover.png";
            tmpUserLink = `/r/${roverId}`;
            tmpUserPostFix = "Great news!"

            tmpMessage = <span>Your rover <i>"{name}"</i> reached its goal!</span>
        } else if (itemType == feedItemType.photoAdded) {
            icon = <CameraAlt fontSize="inherit" />
            tmpUserImage = APP_CONFIG.IMAGE_BASE_URL + "munzees/small/" + photo;
            tmpUserLink = munzeeCode;
            tmpUserPostFix = "Photo uploaded!"

            tmpMessage = <span><a href={`/m/${username}`}>{username}</a> added a new photo at <i><a href={tmpUserLink}>{munzeeData?.friendlyName}</a></i></span>
        } else if (itemType == feedItemType.blastCapture) {
            //Add Validatin for profile_user_id == current_user_id
            
            icon = <Trophy fontSize="inherit" />
            tmpUserImage = APP_CONFIG.IMAGE_BASE_URL + "new_badges/small/blastcapture.png";
            tmpUserLink = `/m/${currentUser?.username}/blasts/`;
            tmpUserPostFix = "Congratulations!"

            tmpMessage = <span>You've blasted {totalCaptures} munzees and got {totalPoints} points!</span>
        } else if (itemType == feedItemType.archived) {
            icon = <Hotel fontSize="inherit" />
            tmpUserImage = APP_CONFIG.IMAGE_BASE_URL + "pins/timeshareroom.png";
            tmpUserLink = munzeeCode;
            tmpUserPostFix = message ?? ""
        } else {
            <div className="entry-holder">
            </div>
        }
        return <div className="entry-holder">
            <a href={tmpUserLink}><img src={tmpUserImage} alt="Logo" /></a>
            <div className="comment-wrapper">
                <span className="user-name">
                    {icon}
                    {tmpUserName}
                    <span>{tmpUserPostFix}</span>
                </span>

                {tmpMessage}

                {/* <span className="user-comment"> */}
                {/* {`"${tmpMessage}" - `} */}
                {/* <span>General Comment</span> */}
                {/* </span> */}

                {isDislayReplay && <a href={replayLink} className="user-reply">
                    <img src={replayIcon} alt="User avatar" />
                    {replayName}
                </a>}
                <span className="time">{timeAgoFromTimeStamp(timestamp * 1000)}</span>
            </div>
        </div>
    }

}

export default ActivityFeedItem;