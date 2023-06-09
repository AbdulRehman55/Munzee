import React, {useState} from "react";
import "./styles.scss";
import { Box, Container, Typography, Link, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import skylandImg from "../../assets/images/skyland.png";
import { tabsData } from "./tabsData";
import { CapturesPanel, EntryPanel, NotesPanel } from "./PanelsContent";

const EventPage = ():JSX.Element => {

    const [tabValue, setTabValue] = useState("captures");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
    const getTabs = () => {
        return tabsData.map((item, index) => {
            return <Tab className="user-stat-tab" label={item.count + " " + item.title} value={item.id} />
        });
    };

    return (
        <Box id="event-page">
            <header>
                <Container className="header-wrapper">
                    <div className="header-content">
                        <img src={skylandImg} />
                        <Typography className="title">
                            <Link href="/m/some-event/event-id">Skyland</Link>
                            <span>Undeployed 6 days ago</span>
                        </Typography>
                    </div>
                    <Link className="deployed-by" href="/m/some-clan/">
                        <span>Deployed by</span>
                        <img src={skylandImg}/>
                        <span>Devzee</span>
                    </Link>
                </Container>
            </header>
            <Container className="event-page-wrapper">
                <TabContext value={tabValue}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" className="tabs-block">
                        {getTabs()}
                    </TabList>
                    <TabPanel value="captures" className="tab-panel"><CapturesPanel /></TabPanel>
                    <TabPanel value="entry" className="tab-panel"><EntryPanel /></TabPanel>
                    <TabPanel value="rovers" className="tab-panel">rovers</TabPanel>
                    <TabPanel value="photos" className="tab-panel">photos</TabPanel>
                    <TabPanel value="notes" className="tab-panel"><NotesPanel /></TabPanel>
                </TabContext>
            </Container>
        </Box>
    )
}

export default EventPage;