import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  PageTitleSecondary,
  Panel,
  OwnCoinsTable,
} from "../../../components";
import { Stack } from "@mui/material";
import { ClientContext } from "../../../context/ClientContext";
import { Link } from "react-router-dom";
import "./style.scss";

type Coin = Readonly<{
  logo: string;
  type_name: string;
  code: string;
  total_visits: number;
  name: string;
}>;

const OwnCoins = () => {
  const { backend, user } = useContext(ClientContext);
  const [data, setData] = useState<ReadonlyArray<Coin>>([]);

  useEffect(() => {
    if (user) {
      const userCoinsData = async () => {
        var result = await backend?.coins?.userCoins({
          user_id: user?.userId ?? 0,
        });
        if (result) {
          setData(result);
        }
      };
      userCoinsData();
    }
  }, [user]);
  return (
    <Container>
      <div className="own-coins-container">
        <PageTitleSecondary title="Coins" />
        <Stack textAlign="end" pt={3}>
          <Link to="/coin/link/" className="link">
            Activate New Coin
          </Link>
        </Stack>
        <Container>
          <div className="table-wrapper">
            <Panel theme="dark" text={`${user?.username}'s own Coins`} />
            <OwnCoinsTable
              ownCoins={data}
              columns={["Coin", "Type", "Code", "Munzees Visited"]}
            />
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default OwnCoins;
