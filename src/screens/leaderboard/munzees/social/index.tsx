import React from "react";
import {
  Container,
  PageTitleSecondary,
  MunzeeTable,
  Loader,
} from "../../../../components";
import { Grid } from "@mui/material";
import { ClientContext } from "../../../../context/ClientContext";
import "./style.scss";

type LeaderboardEntry = Readonly<{
  rank: string;
  username: string;
  imageUrl: string;
  score: string;
  player: string;
}>;

const MunzeesSocial = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<ReadonlyArray<LeaderboardEntry>>([]);

  React.useEffect(() => {
    client?.leaderboards.getSocials().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [client]);

  return (
    <Container>
      <div className="munzee-social-container">
        <PageTitleSecondary title="Top Social Munzees" />
        <Grid container display="flex" justifyContent="center" pt={3}>
          <Grid item xs={8}>
            {loading ? <Loader /> : <MunzeeTable title="Overall" data={data} />}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default MunzeesSocial;
