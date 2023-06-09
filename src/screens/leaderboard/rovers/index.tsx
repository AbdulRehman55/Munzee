import React from "react";
import {PageTitle, RoversTable, Container, Loader} from "../../../components";
import { Grid } from "@mui/material";
import { ClientContext } from "../../../context/ClientContext";
import "../style.scss";

type LeaderboardEntry = Readonly<{
  rank: string;
  username: string;
  imageUrl: string;
  score: string;
  by: string;
  miles: string;
}>;

const Rovers = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [data, setData] = React.useState<ReadonlyArray<LeaderboardEntry>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.leaderboards.getRovers().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [client]);

  return (
    <Container>
      <div className="leaderboard-container">
        <PageTitle title="Top Rovers" />
        <Grid container display="flex" justifyContent="center">
          <Grid xs={8}>
            {loading ? <Loader /> :
              <RoversTable
                columns={["Rank", "Rover", "Miles", "Score"]}
                data={data}
              />
            }
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default Rovers;
