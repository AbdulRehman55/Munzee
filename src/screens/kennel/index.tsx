import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  PageTitleSecondary,
  Panel,
  KennelTable,
} from "../../components";
import { ClientContext } from "../../context/ClientContext";
import { Rover } from "../../munzee-backend/types";
import "./style.scss";

type Data = {
  at_player: ReadonlyArray<{
    name: string;
    total_miles: number;
    score: string;
    level: number;
    global_rank: string;
    logo: string;
    username: string;
    rover_id: string;
  }>;
  own: ReadonlyArray<Rover>;
};

const Kennel = () => {
  const { user, backend } = useContext(ClientContext);
  const [data, setData] = useState<Data>({ at_player: [], own: [] });

  useEffect(() => {
    const kennelData = async () => {
      if (user) {
        const result = await backend?.rover.userKennel({
          user_id: user?.userId ?? 0,
        });
        if (result) {
          const filteredPlayerData = result.at_player?.map((item) => ({
            name: item.name,
            total_miles: item.total_miles,
            score: item.score,
            level: item.level_info.level,
            global_rank: item.global_rank,
            logo: item.logo,
            username: item.username,
            rover_id: item.rover_id,
          }));
          setData({
            at_player: filteredPlayerData as ReadonlyArray<any>,
            own: result.own as ReadonlyArray<Rover>,
          });
        }
      }
    };

    kennelData();
  }, [user]);
  return (
    <Container>
      <div className="kennel-container">
        <PageTitleSecondary title="Kennel" />
        <Container>
          <div className="table-wrapper">
            <Panel
              theme="dark"
              text={`Rovers currently with ${user?.username}`}
            />
            <KennelTable
              columns={[
                "Rover",
                "Total Miles",
                "Score",
                "Level",
                "Global Rank",
              ]}
              data={data?.at_player}
            />
          </div>

          {(data?.own || []).length > 0 ? (
            <KennelTable
              columns={[
                "Rover",
                "Total Miles",
                "Score",
                "Level",
                "Global Rank",
              ]}
              ownData={data?.own}
            />
          ) : (
            <Panel
              text={`${user?.username} doesn't own a Rover`}
              theme="light"
            />
          )}
        </Container>
      </div>
    </Container>
  );
};

export default Kennel;
