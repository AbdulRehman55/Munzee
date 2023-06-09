import React from "react";
import {Container, LeaderboardTable, Loader} from "../../../../components";
import "../../style.scss";
import LeaderboardHeader from "../../header";
import { Grid } from "@mui/material";
import { ClientContext } from "../../../../context/ClientContext";

type LeaderboardEntry = Readonly<{
  rank: string;
  username: string;
  imageUrl: string;
  score: string;
}>;

const PhysicalPointsCapture = () => {
  const { client } = React.useContext(ClientContext);

  const [data, setData] = React.useState<
    Readonly<{
      yesterday: ReadonlyArray<LeaderboardEntry>;
      thisMonth: ReadonlyArray<LeaderboardEntry>;
      thisYear: ReadonlyArray<LeaderboardEntry>;
    }>
  >();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.leaderboards
      .getPlayers("capture", "physical")
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, [client]);

  return (
    <Container>
      <div className="leaderboard-container">
        <LeaderboardHeader
          title="Top Munzee Players"
          subtitle="Category: Physical Capture Points"
        />
        <div className="leaderboard-content-area">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              {loading ? <Loader /> :
                <LeaderboardTable
                  title="Yesterday"
                  data={data?.yesterday || []}
                />
              }
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              {loading ? <Loader /> :
                <LeaderboardTable
                  title="This Month"
                  data={data?.thisMonth || []}
                  showIcon
                />
              }
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              {loading ? <Loader /> :
                <LeaderboardTable
                  title="This Year"
                  data={data?.thisYear || []}
                  showIcon
                />
              }
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default PhysicalPointsCapture;
