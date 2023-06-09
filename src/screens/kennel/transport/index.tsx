import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  PageTitleSecondary,
  KennelTable,
  PaginationButton,
} from "../../../components";
import { Stack } from "@mui/material";
import { ClientContext } from "../../../context/ClientContext";
import "./style.scss";

type Data = {
  rovers: ReadonlyArray<{
    log_at: string;
    miles: string;
    rover_id: string;
    rover_info: {
      total_miles: string;
      score: string;
      level: number;
      global_rank: string;
      logo: string;
      name: string;
      username: string;
    };
  }>;
};

const KennelTransport = () => {
  const { user, backend } = useContext(ClientContext);
  const [data, setData] = useState<Data>({ rovers: [] });

  useEffect(() => {
    const kennelTransportData = async () => {
      if (user) {
        const result = await backend?.rover.userKennelTransported({
          user_id: user?.userId ?? 0,
          page: 0,
        });
        if (result) {
          if (result) {
            const filteredData = result.rovers?.map((item) => ({
              log_at: item.log_at,
              miles: item.miles,
              total_miles: item.rover_info.total_miles,
              score: item.rover_info.score,
              level: item.rover_info.level_info.level,
              global_rank: item.rover_info.global_rank,
              logo: item.rover_info.logo,
              username: item.rover_info.username,
              name: item.rover_info.name,
              rover_id: item.rover_id,
            }));

            setData({ rovers: filteredData as ReadonlyArray<any> });
          }
        }
      }
    };

    kennelTransportData();
  }, [user]);

  return (
    <Container>
      <div className="kennel-transport-container">
        <PageTitleSecondary title="Transported Rovers" />
        <Container>
          <div className="table-wrapper">
            <KennelTable
              columns={[
                "Rover",
                "Miles Transported",
                "Total Miles",
                "Score",
                "Level",
                "Global Rank",
              ]}
              data={data?.rovers}
            />
          </div>
        </Container>
        <Stack direction="row" justifyContent="space-between" mt={3} pb={10}>
          <PaginationButton
            title="Older"
            iconPosition="left"
            className="fa fa-arrow-left"
            disabled
          />
          <PaginationButton
            title="Newer"
            iconPosition="right"
            className="fa fa-arrow-right"
            disabled
          />
        </Stack>
      </div>
    </Container>
  );
};

export default KennelTransport;
