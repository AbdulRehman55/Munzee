import React from "react";
import { ClansTable, Container, Loader } from "../../components";
import { Grid } from "@mui/material";
import { ClientContext } from "../../context/ClientContext";
import "./style.scss";

type ClanLeaderboardEntry = Readonly<{
  rank: string;
  name: string;
  imageUrl: string;
  totalPoints: string;
  levelReached: string;
}>;

const Clans = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [leaderboard, setLeaderboard] = React.useState<
    ReadonlyArray<ClanLeaderboardEntry>
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.clans.getLeaderboard().then((result) => {
      setLeaderboard(result);
      setLoading(false);
    });
  }, [client]);

  return (
    <Container>
      <div className="clans-container">
        <Grid container display="flex" justifyContent="center" pt={3}>
          <Grid item xs={12}>
            {
              loading ? <Loader /> :
                  <ClansTable
                      title={"Clan Leaderboards"}
                      columns={["Rank", "Logo", "Clan", "Total Points", "Level"]}
                      data={leaderboard}
                  />
            }
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default Clans;
