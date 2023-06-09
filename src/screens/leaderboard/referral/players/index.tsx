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

const Players = () => {
  const { client } = React.useContext(ClientContext);

  const [data, setData] = React.useState<
    Readonly<{
      thisMonth: ReadonlyArray<LeaderboardEntry>;
      overall: ReadonlyArray<LeaderboardEntry>;
    }>
  >();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.leaderboards.getReferralPlayers().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [client]);

  return (
    <Container>
      <div className="leaderboard-container">
        <LeaderboardHeader
          title="Number Of Referral"
          subtitle="Measure your number of Munzee referral with the rest of the world."
          menu={false}
        />
        <div className="leaderboard-content-area">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              {loading ? <Loader /> :
                <LeaderboardTable
                  screen="referral"
                  title="This Month"
                  data={data?.thisMonth || []}
                  imgDimension={42}
                />
              }
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              {loading ? <Loader /> :
                <LeaderboardTable
                  screen="referral"
                  title="OverAll"
                  data={data?.overall || []}
                  imgDimension={42}
                />
              }
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default Players;
