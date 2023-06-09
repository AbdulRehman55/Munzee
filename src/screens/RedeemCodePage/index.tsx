import React from "react";
import "./styles.scss";
import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import {Loader, PageTitle} from "../../components";
import { redeemCodeLocales as r } from "./redeemCodeLocales";
import TabTable, { Item } from "./TabTable";
import { ClientContext } from "../../context/ClientContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Section = Readonly<{
  id: string;
  title: string;
  expiresAt?: Date;
}>;

const RedeemCodePage = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [value, setValue] = React.useState(0);
  const [sections, setSections] = React.useState<ReadonlyArray<Section>>([]);
  const [items, setItems] =
    React.useState<ReadonlyArray<Item & Readonly<{ section: string }>>>();
  const [changed, setChanged] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.redeem.getRedeemData().then((result) => {
      setItems(result.items);
      setSections(result.sections);
      setLoading(false);
    });
  }, [client, changed]);

  React.useEffect(() => {
    setValue(0);
  }, [sections.length]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onRedeem = React.useCallback(
    (id: string, quantity: number) => {
      client?.redeem.redeemItem(id, quantity).then((result) => {
        if (result.success) {
          setChanged(Date.now());
        }
        alert(result.message);
      });
    },
    [client]
  );

  const getCurrentTabPanel = () => {
    const tabTitle = sections[value]?.title || "";
    const tabId = sections[value]?.id || "";
    return (
      <TabPanel value={value} index={value}>
        <TabTable
          title={tabTitle}
          tableData={items?.filter((i) => i.section === tabId) || []}
          onRedeem={onRedeem}
        />
      </TabPanel>
    );
  };

  return (
    <Container id="redeem-code-page">
      <PageTitle title={r.redeem_code_title} />
      <div className="redeem-tabs">
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "fitContent",
            margin: "0 auto",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            {sections.map((s, i) => (
              <Tab label={s.title} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
        {loading ? <Loader /> : getCurrentTabPanel()}
      </div>
    </Container>
  );
};

export default RedeemCodePage;
