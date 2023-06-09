import React, { useState, useEffect, useContext } from "react";
import {
  Panel,
  Container,
  PageTitleSecondary,
  PaginationButton,
  ReferralTable,
} from "../../components";
import { ClientContext } from "../../context/ClientContext";
import { Grid, Stack } from "@mui/material";
import { ReferralPoints } from "../../munzee-backend/types";
import { Link } from "react-router-dom";
import { getAvatarUrl } from "../../munzee-client/utils";
import "./style.scss";

interface IReferralTable {
  awarded_at: string;
  points: string;
  notes: string;
  new_username: string;
  new_user_id: string;
}

const Referral = () => {
  const { backend, user } = useContext(ClientContext);
  const [tableData, setTableData] = useState<IReferralTable[]>([]);
  const [data, setData] = useState<ReferralPoints>();

  const referralCodeUrl =
    "data:image/png;base64,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";

  useEffect(() => {
    if (user) {
      const userReferralData = async () => {
        var result: Readonly<ReferralPoints> | undefined =
          await backend?.user.userReferralPoints({
            user_id: user?.userId ?? 0,
            page: 0,
          });
        if (result) {
          setData(result);
          setTableData(result.feed);
        }
      };
      userReferralData();
    }
  }, [user]);
  return (
    <Container>
      <div className="referral-container">
        <PageTitleSecondary title="Referral Program" />
        <Grid container>
          <Grid item xs={4} pt={2.5}>
            <div id="qrcode" className="text-center">
              <img src={referralCodeUrl} alt="" />
            </div>
            <p className="text-center">Your Personal Referral Code</p>
            <div className="panel-box">
              <Grid xs={11} mb={1}>
                <Panel
                  theme="dark"
                  text={`${
                    data?.introduced_players?.length ?? 0
                  } Introduced Players`}
                />
              </Grid>
              <div className="center">
                {(data?.introduced_players || []).length > 0 ? (
                  data?.introduced_players.map((player, index) => (
                    <Link
                      to={`/m/${player.username}`}
                      className="link"
                      key={index}
                    >
                      <img
                        alt=""
                        className="user-photo"
                        src={getAvatarUrl(+Number(player.user_id))}
                      />
                    </Link>
                  ))
                ) : (
                  <p>
                    <i>You enjoy Munzee? Go spread the word!</i>
                  </p>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={8} pt={2.5}>
            <div className="paragraph">
              Earn points by introducing new players. Just let them scan your
              personal referral code! If a player with less than 10 captures
              scans your referral code, you'll immediately be awarded 10 points
              and the newly introduced player gets 50 points as a good start
              into their Munzee life. If they continue playing, you'll receive
              10 points again with every 100 caps of the introduced player.
              Thanks for spreading the word!
            </div>
            <Stack px={3} pt={2}>
              <Panel
                theme="dark"
                text={`${data?.points} Referral Points Earned`}
              />
              <ReferralTable
                columns={["Points", "Notes", "Date"]}
                data={tableData}
              />
              <Stack direction="row" justifyContent="space-between" pt={3}>
                <PaginationButton
                  disabled
                  title="Older"
                  iconPosition="left"
                  className="fa fa-arrow-left"
                />
                <PaginationButton
                  disabled
                  title="Newer"
                  iconPosition="right"
                  className="fa fa-arrow-right"
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Referral;
