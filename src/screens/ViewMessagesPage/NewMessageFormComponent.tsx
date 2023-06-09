import React, { useState } from "react";
import "./styles.scss";
import { viewMessagesLocales as v } from "./viewMessagesLocales";
import { Button } from "@mui/material";
import { ClientContext } from "../../context/ClientContext";

const NewMessageFormComponent = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [playerValue, setPlayerValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const handleSendMessage = () => {
    client?.flows.sendMessage(playerValue, messageValue).then((result) => {
      if (result.success) {
        // TODO: redirect to message flow view
      } else {
        // TODO: show error popup
      }
    });
  };

  return (
    <form>
      <div className="input-block">
        <div className="input-wrapper player">
          <label>{v.playerTitle}</label>
          <input
            value={playerValue}
            onChange={(e) => setPlayerValue(e.target.value)}
            placeholder="send to..."
          />
        </div>
        <div className="input-wrapper message">
          <label>{v.messageTitle}</label>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            placeholder="your text goes here..."
          />
        </div>
      </div>
      <Button onClick={handleSendMessage} className="send-btn">
        {v.sendBtn}
      </Button>
    </form>
  );
};

export default NewMessageFormComponent;
