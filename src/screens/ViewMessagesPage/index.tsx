import React, { useState } from "react";
import "./styles.scss";
import { Container, Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { viewMessagesLocales as v } from "./viewMessagesLocales";
import { Forum, Inventory, Restore } from "@mui/icons-material";
import NewMessageFormComponent from "./NewMessageFormComponent";
import TableListMessagesComponent from "./TableListMessagesComponent";
import { Flow } from "./TableListMessagesComponent";
import ChatPanel from "./ChatPanel";
import { ClientContext } from "../../context/ClientContext";
import { Loader } from "../../components";

const AllTab = ({
  onMessageClicked,
}: {
  onMessageClicked: (flow: Flow) => void;
}): JSX.Element => {
  const { client } = React.useContext(ClientContext);
  const [msgData, setMsgData] = React.useState<ReadonlyArray<Flow>>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    client?.flows.getAllFlows().then((flows) => {
      setMsgData(flows);
      setLoading(false);
    });
  }, [client]);

  return (
    <Box className="all-tab">
      <NewMessageFormComponent />
      {
        loading ? <Loader /> :
            <TableListMessagesComponent
                flows={msgData}
                onMessageClicked={onMessageClicked}
            />
      }
    </Box>
  );
};

const ArchTab = ({
  onMessageClicked,
}: {
  onMessageClicked: (flow: Flow) => void;
}): JSX.Element => {
  const { client } = React.useContext(ClientContext);
  const [msgData, setMsgData] = React.useState<ReadonlyArray<Flow>>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    client?.flows.getArchivedFlows().then((flows) => {
      setMsgData(flows);
      setLoading(false);
    });
  }, [client]);

  return (
    <Box className="all-tab">
      <NewMessageFormComponent />
      {
        loading ? <Loader /> :
            <TableListMessagesComponent
                flows={msgData}
                onMessageClicked={onMessageClicked}
            />
      }
    </Box>
  );
};

const ViewMessagesPage = (): JSX.Element => {
  const [value, setValue] = useState("all");
  const [flow, setFlow] = useState<Flow>();
  const tabsIcons = [<Forum />, <Inventory />, <Restore />];
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getTabs = () => {
    return v.tabs.map((item, index) => {
      return <Tab label={item.title} value={item.id} icon={tabsIcons[index]} />;
    });
  };

  const handleOpenChat = (flow: Flow) => {
    setValue("chat");
    setFlow(flow);
  };

  return (
    <Box id="view-messages-page">
      <Box className="title-block">
        <Container className="title-wrapper">
          <h2>
            {value === "chat" ? `Conversations » ${flow?.name}` : v.pageTitle}
          </h2>
        </Container>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            className="tabs-block"
          >
            {getTabs()}
          </TabList>
          <TabPanel value="all" className="tab-panel">
            <AllTab onMessageClicked={handleOpenChat} />
          </TabPanel>
          <TabPanel value="arch" className="tab-panel">
            <ArchTab onMessageClicked={handleOpenChat} />
          </TabPanel>
          <TabPanel value="chat">
            {flow ? <ChatPanel flow={flow} /> : null}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ViewMessagesPage;
