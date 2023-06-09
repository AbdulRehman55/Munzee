import React from "react";
import { Grid } from "@mui/material";
import {Container, LeaderboardTable, Loader} from "../../../components";
import LeaderboardHeader from "../header";
import { ClientContext } from "../../../context/ClientContext";
import "../style.scss";

type LeaderboardEntry = Readonly<{
  rank: string;
  username: string;
  imageUrl: string;
  score: string;
}>;

const Munzees = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [data, setData] = React.useState<
    Readonly<{
      yesterday: ReadonlyArray<LeaderboardEntry>;
      thisWeek: ReadonlyArray<LeaderboardEntry>;
      overall: ReadonlyArray<LeaderboardEntry>;
    }>
  >();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.leaderboards.getMunzees().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [client]);

  return (
    <Container>
      <div className="leaderboard-container">
        <LeaderboardHeader
          title="Top Munzees"
          subtitle="Keep track of the most active Munzee around the world."
          menu={false}
        />
        <div className="leaderboard-content-area">
          <Grid
            display="flex"
            justifyContent="center"
            container
            spacing={3}
            pt={1}
          >
            <Grid item xs={3.9}>
              {loading ? <Loader /> :
                <LeaderboardTable
                  title="Yesterday"
                  data={data?.yesterday || []}
                />
              }
            </Grid>
            <Grid item xs={3.9}>
              {loading ? <Loader /> : <LeaderboardTable title="This Week" data={data?.thisWeek || []} /> }
            </Grid>
            <Grid item xs={3.9}>
              {loading ? <Loader /> : <LeaderboardTable title="Overall" data={data?.overall || []} /> }
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};
export default Munzees;
