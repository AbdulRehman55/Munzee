import React from "react";
import { Grid, Stack } from "@mui/material";
import {
  Container,
  PageTitleSecondary,
  PaginationButton,
  StatzeeReferralTable as ReferralTable,
  ArchivedTable,
  CapturesTable,
  PassiveCapturesTable,
  DeployTable,
  PassiveDeployTable,
  CapturesOnMunzeesTable,
} from "../../components";
import ReactECharts from "echarts-for-react";
import "./style.scss";
import { ClientContext } from "../../context/ClientContext";
import { useParams, useNavigate } from "react-router-dom";

type OverviewItem = Readonly<{
  points: number;
  percentage: string;
}>;

type DetailItem = Readonly<{
  munzeeIcons: ReadonlyArray<
    Readonly<{
      icon: string;
      amount: number;
    }>
  >;
  tableData: ReadonlyArray<
    Readonly<{
      time: string;
      munzee: string;
      pin: string;
      link: string;
      byUsername: string;
      byLink: string;
      points: number;
    }>
  >;
}>;

type PlayerDayStats = Readonly<{
  totalPoints: number;
  overview: Readonly<{
    captures: OverviewItem;
    passiveCaptures: OverviewItem;
    deploys: OverviewItem;
    passiveDeploys: OverviewItem;
    captureOns: OverviewItem;
    referrals: OverviewItem;
  }>;
  details: Readonly<{
    captures: DetailItem;
    passiveCaptures: DetailItem;
    deploys: DetailItem;
    passiveDeploys: DetailItem;
    captureOns: DetailItem;
    referrals: DetailItem;
    archived: DetailItem;
  }>;
}>;

const PlayerDay = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);
  const navigate = useNavigate();
  const { date } = useParams();

  const [stats, setStats] = React.useState<PlayerDayStats>();

  React.useEffect(() => {
    if (!date) {
      return;
    }
    client?.statzee
      .getPlayerDayStats(date)
      .then((result) => setStats(result || undefined));
  }, [client, date]);

  const option = {
    title: {
      text: `Total Points: ${stats?.totalPoints}`,
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return `${params.name} <br/>Points: <b>${params.value}</b><br/>Percentage: <b>${params.data.percentage}</b>`;
      },
    },
    series: [
      {
        type: "pie",
        radius: "55%",
        center: ["50%", "65%"],
        data: [
          {
            value: stats?.overview.captures.points,
            name: "Capture Points",
            percentage: stats?.overview.captures.percentage,
            itemStyle: { color: "#2f7ed8" },
          },
          {
            value: stats?.overview.passiveCaptures.points,
            name: "Passive Capture Points",
            percentage: stats?.overview.passiveCaptures.percentage,
            itemStyle: { color: "#94c133" },
          },
          {
            value: stats?.overview.deploys.points,
            name: "Deploy Points",
            percentage: stats?.overview.deploys.percentage,
            itemStyle: { color: "#2fc133" },
          },
          {
            value: stats?.overview.passiveDeploys.points,
            name: "Passive Deploy Points",
            percentage: stats?.overview.passiveDeploys.percentage,
            itemStyle: { color: "#94c1d8" },
          },
          {
            value: stats?.overview.captureOns.points,
            name: "Capture On Points",
            percentage: stats?.overview.captureOns.percentage,
            itemStyle: { color: "#33c6e7" },
          },
          {
            value: stats?.overview.referrals.points,
            name: "Reference Points",
            percentage: stats?.overview.referrals.percentage,
            itemStyle: { color: "#947e33" },
          },
        ],
        itemStyle: {
          normal: {
            borderWidth: 0,
          },
          emphasis: {
            borderWidth: 10,
            borderColor: "#c0e5ed",
            borderType: "solid",
          },
        },
        label: {
          color: "black",
          fontWeight: 600,
          formatter: function (params: any) {
            return `${params.name}: ${params.value}`;
          },
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: "black",
          },
        },
      },
    ],
  };

  const onNext = () => {
    if (date) {
      const d = new Date(date);
      d.setDate(d.getDate() + 1);
      navigate(
        `/player/day/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      );
    }
  };
  const onPrev = () => {
    if (date) {
      const d = new Date(date);
      d.setDate(d.getDate() - 1);
      navigate(
        `/player/day/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      );
    }
  };

  return (
    <Container>
      <div className="player-day-wrapper">
        <PageTitleSecondary
          title="One Day In Your Munzee Life"
          subtitle={date}
          flexDirection="col"
        />
        <Stack direction="row" justifyContent="space-between" pt={3}>
          <PaginationButton
            title="Previous"
            iconPosition="left"
            className="fa fa-arrow-left"
            onClick={onPrev}
          />
          <PaginationButton
            title="Next"
            iconPosition="right"
            className="fa fa-arrow-right"
            onClick={onNext}
          />
        </Stack>
        <ReactECharts option={option} />

        <PageTitleSecondary
          title={`Captures (${stats?.details.captures.tableData.length || 0})`}
        />
        <Grid>
          <CapturesTable
            munzeeIcons={stats?.details.captures.munzeeIcons || []}
            tableData={stats?.details.captures.tableData || []}
          />
        </Grid>
        <PageTitleSecondary
          title={`Passive Captures (${
            stats?.details.passiveCaptures.tableData.length || 0
          })`}
        />
        <Grid>
          <PassiveCapturesTable
            munzeeIcons={stats?.details.passiveCaptures.munzeeIcons || []}
            tableData={stats?.details.passiveCaptures.tableData || []}
          />
        </Grid>
        <PageTitleSecondary
          title={`Deploys (${stats?.details.deploys.tableData.length || 0})`}
        />
        <Grid>
          <DeployTable
            munzeeIcons={stats?.details.deploys.munzeeIcons || []}
            tableData={stats?.details.deploys.tableData || []}
          />
        </Grid>
        <PageTitleSecondary
          title={`Passive Deploys (${
            stats?.details.passiveDeploys.tableData.length || 0
          })`}
        />
        <Grid>
          <PassiveDeployTable
            munzeeIcons={stats?.details.passiveDeploys.munzeeIcons || []}
            tableData={stats?.details.passiveDeploys.tableData || []}
          />
        </Grid>
        <PageTitleSecondary
          title={`Captures on your munzees (${
            stats?.details.captureOns.tableData.length || 0
          })`}
        />
        <Grid>
          <CapturesOnMunzeesTable
            munzeeIcons={stats?.details.captureOns.munzeeIcons || []}
            tableData={stats?.details.captureOns.tableData || []}
          />
        </Grid>
        <PageTitleSecondary
          title={`Referral Points (${
            stats?.details.referrals.tableData.length || 0
          })`}
        />
        <Grid py={4}>
          <ReferralTable
            munzeeIcons={stats?.details.referrals.munzeeIcons || []}
            tableData={stats?.details.referrals.tableData || []}
          />
        </Grid>
        <PageTitleSecondary
          title={`Archived munzees (${
            stats?.details.archived.tableData.length || 0
          })`}
        />
        <Grid py={3}>
          <ArchivedTable
            munzeeIcons={stats?.details.archived.munzeeIcons || []}
            tableData={stats?.details.archived.tableData || []}
          />
        </Grid>
        <Stack direction="row" justifyContent="space-between" pt={3}>
          <PaginationButton
            title="Previous"
            iconPosition="left"
            className="fa fa-arrow-left"
            onClick={onPrev}
          />
          <PaginationButton
            title="Next"
            iconPosition="right"
            className="fa fa-arrow-right"
            onClick={onNext}
          />
        </Stack>
      </div>
    </Container>
  );
};

export default PlayerDay;
