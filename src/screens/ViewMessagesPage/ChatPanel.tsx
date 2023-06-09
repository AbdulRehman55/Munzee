import React, { useState } from "react";
import "./styles.scss";
import { Box, Button, Container } from "@mui/material";
import { viewMessagesLocales as v } from "./viewMessagesLocales";
import { ClientContext } from "../../context/ClientContext";
import { Flow } from "./TableListMessagesComponent";
import { Loader } from "../../components";

type Message = Readonly<{
  name: string;
  author: "me" | "user";
  time: string;
  message: string;
  avatar: string;
}>;

const ChatPanel = ({ flow }: { flow: Flow }): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [msgValue, setMsgValue] = useState("");
  const [messages, setMessages] = useState<ReadonlyArray<Message>>([]);
  const [lastSentTimestamp, setLastSentTimestamp] = useState(0);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    client?.flows
      .getFlowMessages(flow.flowId)
      .then((messages) => {
        setMessages(messages);
        setLoading(false);
      });
  }, [client, flow.flowId, lastSentTimestamp]);

  const getMsgs = () => {
    return messages.map((item) => {
      return (
        <div className={`msg-row ${item.name}`}>
          <p>
            {item.message}
            <span>{`sent ${item.time}`}</span>
          </p>
          <img src={item.avatar} alt={item.name} />
        </div>
      );
    });
  };

  const handleMarkUnread = async () => {
    const result = await client?.flows.markAsUnread(flow.flowId);
    if (result?.success) {
      // TODO: navigate back to flow list
    } else {
      // TODO: show error popup
    }
  };

  const handleArchive = async () => {
    const result = await client?.flows.archive(flow.flowId);
    if (result?.success) {
      // TODO: navigate back to flow list
    } else {
      // TODO: show error popup
    }
  };

  const handleSendMsg = async () => {
    const result = await client?.flows.sendMessage(flow.name, msgValue);
    if (result?.success) {
      setLastSentTimestamp(Date.now());
    } else {
      // TODO: show error popup
    }
  };

  return (
    <Box id="chat-panel">
      <Container className="chat-panel-wrapper">
        <form>
          <textarea
            placeholder="your response goes here..."
            value={msgValue}
            onChange={(e) => setMsgValue(e.target.value)}
          />
          <div className="btns-wrapper">
            <Box>
              <Button
                className="mark-unread-btn"
                onClick={() => handleMarkUnread()}
              >
                {v.markUnreadBtn}
              </Button>
              <Button className="archive-btn" onClick={() => handleArchive()}>
                {v.archiveBtn}
              </Button>
            </Box>
            <Button className="send-btn" onClick={() => handleSendMsg()}>
              {v.sendBtn}
            </Button>
          </div>
        </form>
        <Box className="messages">{loading ? <Loader /> : getMsgs()}</Box>
      </Container>
    </Box>
  );
};

export default ChatPanel;
