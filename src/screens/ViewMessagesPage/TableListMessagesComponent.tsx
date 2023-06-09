import React from "react";
import "./styles.scss";
import { viewMessagesLocales as v } from "./viewMessagesLocales";
import { Link } from "@mui/material";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";

interface iProps {
  flows: ReadonlyArray<Flow>;
  onMessageClicked: (flow: Flow) => void;
}

export type Flow = Readonly<{
  flowId: string;
  name: string;
  avatar: string;
  lastMsg: string;
  lastTime: string;
  unread: boolean;
}>;

const TableListMessagesComponent = ({
  flows,
  onMessageClicked,
}: iProps): JSX.Element => {
  const getChatData = () => {
    return flows.map((item) => {
      return (
        <div className="table-row">
          <span>
            {item.unread ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
          </span>
          <Link href="#" onClick={() => onMessageClicked(item)}>
            <img src={item.avatar} />
            {` » ${item.name}`}
          </Link>
          <span className="msg-text">
            {`"${item.lastMsg}"`}
            <span>{item.lastTime}</span>
          </span>
        </div>
      );
    });
  };

  return (
    <div className="table">
      <div className="table-head">
        <span></span>
        <span>{v.playerTitle}</span>
        <span>{v.messageTitle}</span>
      </div>
      <div className="table-body">{getChatData()}</div>
    </div>
  );
};

export default TableListMessagesComponent;
