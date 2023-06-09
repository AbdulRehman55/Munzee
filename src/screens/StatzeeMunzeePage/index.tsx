import React, { useContext } from "react";
import "./styles.scss";
import { Container, Box, Typography } from "@mui/material";
import { PageTitle } from "../../components";
import { ClientContext } from "../../context/ClientContext";

type HomeStats = Readonly<{
  captures: Readonly<{ overall: string; lastHour: string }>;
  munzees: Readonly<{ overall: string; lastHour: string }>;
  users: Readonly<{ overall: string; lastHour: string }>;
}>;

const StatzeeMunzeePage = (): JSX.Element => {
  const { client } = useContext(ClientContext);

  const [homeStats, setHomeStats] = React.useState<HomeStats>();

  React.useEffect(() => {
    client?.statzee.getHomeStats().then((result) => setHomeStats(result));
  }, [client]);

  return (
    <Container id="statzee-munzee-page">
      <PageTitle
        title="STATzee"
        details="Welcome to the home of munzee statistics."
      />
      <Box>
        <Typography>
          You can find <span>{homeStats?.munzees.overall}</span> munzees
          worldwide,
        </Typography>
        <Typography>
          <span>{homeStats?.munzees.lastHour}</span> of them were deployed
          during the last hour.
        </Typography>
      </Box>
      <Box>
        <Typography>
          On these munzees, <span>{homeStats?.captures.overall}</span> captures
          were made,
        </Typography>
        <Typography>
          <span>{homeStats?.captures.lastHour}</span> of them during the last
          hour.
        </Typography>
      </Box>
      <Box>
        <Typography>
          <span>{homeStats?.users.overall}</span> players are enjoying this
          game,
        </Typography>
        <Typography>
          <span>{homeStats?.users.lastHour}</span> of them signed up during the
          last hour.
        </Typography>
      </Box>
    </Container>
  );
};

export default StatzeeMunzeePage;
