import React, { useState, useEffect, useContext } from "react";
import { Container, Panel, OwnCoinsTable } from "../../../components";
import { ClientContext } from "../../../context/ClientContext";
import { DiscoverRequest } from "../../../munzee-backend/coins";
import "./style.scss";

const DiscoveredRequest = () => {
  const { backend, user } = useContext(ClientContext);
  const [data, setData] = useState<ReadonlyArray<DiscoverRequest>>([]);

  useEffect(() => {
    if (user) {
      const requestCoinsData = async () => {
        var result = await backend?.coins.coinDiscoverRequests();
        if (result) {
          setData(result);
        }
      };
      requestCoinsData();
    }
  }, [user]);
  return (
    <Container>
      <div className="own-coins-container">
        <div className="page-header">
          <h2>
            Coin Discover Requests
            <small>
              <i></i>
            </small>
            <div className="pull-right">
              <a id="approve_all" className="btn" type="button" href="#">
                <i className="fa fa-check-circle"></i> Approve All
              </a>
            </div>
          </h2>
        </div>
        <Container>
          <div className="table-wrapper">
            <Panel theme="dark" text="Requests Awaiting Your Approval" />
            <OwnCoinsTable
              icons
              requestCoins={data}
              columns={["Coin", "Player", "Discovered"]}
            />
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default DiscoveredRequest;
