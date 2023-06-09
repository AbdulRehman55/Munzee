import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  PageTitleSecondary,
  Panel,
  CoinsTable,
  PaginationButton,
} from "../../../components";
import { Grid, Stack } from "@mui/material";
import { ClientContext } from "../../../context/ClientContext";
import {
  Discover,
  DiscoverCoin,
  DiscoverTypes,
} from "../../../munzee-backend/coins";
import "./style.scss";

const DiscoveredCoins = () => {
  const { backend, user } = useContext(ClientContext);
  const [coinsData, setCoinsData] = useState<DiscoverCoin[]>([]);
  const [coinsType, setCoinsType] = useState<DiscoverTypes[]>([]);

  useEffect(() => {
    if (user) {
      const discoveredCoinsData = async () => {
        const result: Discover | undefined = await backend?.coins.coinDiscover({
          user_id: user?.userId,
          page: 0,
        });
        if (result) {
          setCoinsData(result.coins);
        }
      };
      const discoveredCoinsType = async () => {
        const result: any = await backend?.coins.coinDiscoverTypes({
          user_id: user?.userId,
        });

        if (result) {
          setCoinsType(result);
        }
      };

      discoveredCoinsData();
      discoveredCoinsType();
    }
  }, [user]);

  return (
    <Container>
      <div className="coins-container">
        <PageTitleSecondary title="Discovered Coins" />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <div className="table-wrapper">
                <Panel theme="dark" text="Coin Types" />
                <CoinsTable columns={["Type", "Coins"]} coinTypes={coinsType} />
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="table-wrapper">
                <Panel theme="dark" text="Coins" />
                <CoinsTable columns={["Coin", "Owner"]} coins={coinsData} />
              </div>
              <Stack direction="row" justifyContent="space-between" pt={3}>
                <PaginationButton
                  iconPosition="left"
                  title="Older"
                  disabled
                  className="fa fa-arrow-left"
                />
                <PaginationButton
                  iconPosition="right"
                  title="Newer"
                  disabled
                  className="fa fa-arrow-right"
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Container>
  );
};

export default DiscoveredCoins;
