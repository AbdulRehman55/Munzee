import { accordionSummaryClasses } from "@mui/material";
import Backend from "../munzee-backend";

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

class Statzee {
  constructor(private backend: Backend) {}

  getHomeStats = async (): Promise<
    Readonly<{
      captures: Readonly<{ overall: string; lastHour: string }>;
      munzees: Readonly<{ overall: string; lastHour: string }>;
      users: Readonly<{ overall: string; lastHour: string }>;
    }>
  > => {
    const overall = await this.backend.statzee.statsOverall({});
    const lastHour = await this.backend.statzee.statzeeGlobalLasthour({});
    return {
      captures: {
        overall: parseInt(overall.number_of_captures + "", 10).toLocaleString(),
        lastHour: parseInt(lastHour.captures + "", 10).toLocaleString(),
      },
      munzees: {
        overall: parseInt(
          overall.number_of_deployed_munzees + "",
          10
        ).toLocaleString(),
        lastHour: parseInt(lastHour.munzees + "", 10).toLocaleString(),
      },
      users: {
        overall: parseInt(overall.number_of_users + "", 10).toLocaleString(),
        lastHour: parseInt(lastHour.users + "", 10).toLocaleString(),
      },
    };
  };

  getPlayerDayStats = async (
    day: string,
    forUsername?: string
  ): Promise<PlayerDayStats | null> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return null;
    }
    const result = await this.backend.statzee.statzeePlayerDay({
      user_id: parseInt(user.uid + "", 10),
      username: forUsername || user.username,
      day,
    });
    const capturePoints = result.captures.reduce(
      (accum, value) => accum + parseInt("0" + value.points, 10),
      0
    );
    const passiveCapturePoints = result.passive_captures.reduce(
      (accum, value) => accum + parseInt("0" + value.points, 10),
      0
    );
    const deployPoints = result.deploys.reduce(
      (accum, value) => accum + parseInt("0" + value.points, 10),
      0
    );
    const passiveDeployPoints = result.passive_deploys.reduce(
      (accum, value) => accum + parseInt("0" + value.points, 10),
      0
    );
    const captureOnPoints = result.captures_on.reduce(
      (accum, value) => accum + parseInt("0" + value.points, 10),
      0
    );
    const referralPoints = result.referral.reduce(
      (accum, value) => accum + parseInt("0" + value.points, 10),
      0
    );
    const totalPoints =
      captureOnPoints +
      capturePoints +
      deployPoints +
      referralPoints +
      passiveCapturePoints +
      passiveDeployPoints;
    const captureIcons = result.captures.reduce((accum, value) => {
      if (accum[value.pin]) {
        accum[value.pin] += 1;
      } else {
        accum[value.pin] = 1;
      }
      return accum;
    }, {} as { [pin: string]: number });
    const deployIcons = result.deploys.reduce((accum, value) => {
      if (accum[value.pin]) {
        accum[value.pin] += 1;
      } else {
        accum[value.pin] = 1;
      }
      return accum;
    }, {} as { [pin: string]: number });
    const passiveCaptureIcons = result.passive_captures.reduce(
      (accum, value) => {
        if (accum[value.pin]) {
          accum[value.pin] += 1;
        } else {
          accum[value.pin] = 1;
        }
        return accum;
      },
      {} as { [pin: string]: number }
    );
    const passiveDeployIcons = result.passive_deploys.reduce((accum, value) => {
      if (accum[value.pin]) {
        accum[value.pin] += 1;
      } else {
        accum[value.pin] = 1;
      }
      return accum;
    }, {} as { [pin: string]: number });
    const captureOnIcons = result.captures_on.reduce((accum, value) => {
      if (accum[value.pin]) {
        accum[value.pin] += 1;
      } else {
        accum[value.pin] = 1;
      }
      return accum;
    }, {} as { [pin: string]: number });
    const referralIcons = result.referral.reduce((accum, value) => {
      if (accum[value.pin]) {
        accum[value.pin] += 1;
      } else {
        accum[value.pin] = 1;
      }
      return accum;
    }, {} as { [pin: string]: number });
    const archivedIcons = result.archived.reduce((accum, value) => {
      if (accum[value.pin]) {
        accum[value.pin] += 1;
      } else {
        accum[value.pin] = 1;
      }
      return accum;
    }, {} as { [pin: string]: number });
    return {
      totalPoints,
      overview: {
        captures: {
          points: capturePoints,
          percentage:
            ((capturePoints / totalPoints) * 100 || 0).toFixed(1) + "%",
        },
        passiveCaptures: {
          points: passiveCapturePoints,
          percentage:
            ((passiveCapturePoints / totalPoints) * 100 || 0).toFixed(1) + "%",
        },
        deploys: {
          points: deployPoints,
          percentage:
            ((deployPoints / totalPoints) * 100 || 0).toFixed(1) + "%",
        },
        passiveDeploys: {
          points: passiveDeployPoints,
          percentage:
            ((passiveDeployPoints / totalPoints) * 100 || 0).toFixed(1) + "%",
        },
        captureOns: {
          points: captureOnPoints,
          percentage:
            ((captureOnPoints / totalPoints) * 100 || 0).toFixed(1) + "%",
        },
        referrals: {
          points: referralPoints,
          percentage:
            ((referralPoints / totalPoints) * 100 || 0).toFixed(1) + "%",
        },
      },
      details: {
        captures: {
          munzeeIcons: Object.keys(captureIcons).map((k) => ({
            icon: k,
            amount: captureIcons[k],
          })),
          tableData: result.captures.map((c) => ({
            time: new Date(c.captured_at || "").toLocaleString(),
            munzee: c.friendly_name,
            pin: c.pin,
            link: `${window.location.origin}/m/${c.username}/${c.code}`,
            byUsername: c.username || "",
            byLink: `${window.location.origin}/m/${c.username}/`,
            points: parseInt(c.points + "", 10),
          })),
        },

        deploys: {
          munzeeIcons: Object.keys(deployIcons).map((k) => ({
            icon: k,
            amount: deployIcons[k],
          })),
          tableData: result.deploys.map((c) => ({
            time: new Date(c.deployed_at || "").toLocaleString(),
            munzee: c.friendly_name,
            pin: c.pin,
            link: `${window.location.origin}/m/${c.username}/${c.code}`,
            byUsername: c.username || "",
            byLink: `${window.location.origin}/m/${c.username}/`,
            points: parseInt(c.points + "", 10),
          })),
        },
        passiveCaptures: {
          munzeeIcons: Object.keys(passiveCaptureIcons).map((k) => ({
            icon: k,
            amount: passiveCaptureIcons[k],
          })),
          tableData: result.passive_captures.map((c) => ({
            time: new Date(c.captured_at || "").toLocaleString(),
            munzee: c.friendly_name,
            pin: c.pin,
            link: `${window.location.origin}/m/${c.username}/${c.code}`,
            byUsername: c.username || "",
            byLink: `${window.location.origin}/m/${c.username}/`,
            points: parseInt(c.points + "", 10),
          })),
        },
        passiveDeploys: {
          munzeeIcons: Object.keys(passiveDeployIcons).map((k) => ({
            icon: k,
            amount: passiveDeployIcons[k],
          })),
          tableData: result.passive_deploys.map((c) => ({
            time: new Date(c.deployed_at || "").toLocaleString(),
            munzee: c.friendly_name,
            pin: c.pin,
            link: `${window.location.origin}/m/${c.username}/${c.code}`,
            byUsername: c.username || "",
            byLink: `${window.location.origin}/m/${c.username}/`,
            points: parseInt(c.points + "", 10),
          })),
        },
        captureOns: {
          munzeeIcons: Object.keys(captureOnIcons).map((k) => ({
            icon: k,
            amount: captureOnIcons[k],
          })),
          tableData: result.captures_on.map((c) => ({
            time: new Date(c.captured_at || "").toLocaleString(),
            munzee: c.friendly_name,
            pin: c.pin,
            link: `${window.location.origin}/m/${c.username}/${c.code}`,
            byUsername: c.username || "",
            byLink: `${window.location.origin}/m/${c.username}/`,
            points: parseInt(c.points + "", 10),
          })),
        },
        referrals: {
          munzeeIcons: Object.keys(referralIcons).map((k) => ({
            icon: k,
            amount: referralIcons[k],
          })),
          tableData: result.referral.map((c) => ({
            time: new Date(c.captured_at || "").toLocaleString(),
            munzee: c.friendly_name,
            pin: c.pin,
            link: `${window.location.origin}/m/${c.username}/${c.code}`,
            byUsername: c.username || "",
            byLink: `${window.location.origin}/m/${c.username}/`,
            points: parseInt(c.points + "", 10),
          })),
        },
        archived: {
          munzeeIcons: Object.keys(archivedIcons).map((k) => ({
            icon: k,
            amount: archivedIcons[k],
          })),
          tableData: result.archived.map((c) => ({
            time: new Date(c.captured_at || "").toLocaleString(),
            munzee: c.friendly_name,
            pin: c.pin,
            link: `${window.location.origin}/m/${c.username}/${c.code}`,
            byUsername: c.username || "",
            byLink: `${window.location.origin}/m/${c.username}/`,
            points: parseInt(c.points + "", 10),
          })),
        },
      },
    };
  };
}

export default Statzee;
