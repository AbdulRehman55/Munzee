import React from "react";
import "./styles.scss";
import { entriesItemType } from "../../screens/Feed/EntriesFeed";
import { VisibilityOff as EyeSlash, BuildOutlined as Wrench, EditOutlined as Pencil } from "@mui/icons-material";
import { timeAgoFromTimeStamp, userAvatar } from "../../utils/functions/functions";

const EntriesFeedItem = ({
  typeId,
  typeName,
  timestamp,
  notes,
  user,
  munzeeData
}: entriesItemType): JSX.Element => {
  
  const icon = typeId == 3 ? <EyeSlash fontSize="inherit" /> : typeId == 4 ? <Wrench fontSize="inherit" /> : <Pencil fontSize="inherit" />
  const userLink = `/m/${user.username}`;
  const munzeeCode = munzeeData != undefined ? munzeeData.code : undefined;

  return (
    <div className="entries-feed-item">
      <a href={userLink}><img src={userAvatar(user.userId)} alt="User Avatar" /></a>
      <div className="comment-wrapper">
        <span className="user-name">
          <a href={munzeeCode}>{icon}</a>
          <a href={userLink}>{user.username}</a>
          <span>wrote</span>
        </span>
        <span className="user-comment">
          {`"${notes}" - `}
          {(typeId == 3 || typeId == 4) ?
            <span className="label label-danger"><i>{typeName}</i></span> :
            <i>{typeName}</i>}
        </span>
        <a href={munzeeCode} className="user-reply">
          <img src={munzeeData.pinIcon} alt="User avatar" />
          {munzeeData.friendlyName}
        </a>
        <span className="time">{timeAgoFromTimeStamp(timestamp * 1000)}</span>
      </div>
    </div>
  )
}

export default EntriesFeedItem;