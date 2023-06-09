import Backend from "../munzee-backend";
import { getAvatarUrl } from "./utils";

type LeaderboardEntry = {
  rank: string;
  username: string;
  imageUrl: string;
  score: string;
};

class Leaderboards {
  constructor(private backend: Backend) {}

  getPlayers = async (
    points: "total" | "capture" | "capon" | "deploy",
    types: "physical" | "virtual" | "all"
  ): Promise<
    Readonly<{
      yesterday: ReadonlyArray<LeaderboardEntry>;
      thisMonth: ReadonlyArray<LeaderboardEntry>;
      lastMonth: ReadonlyArray<LeaderboardEntry>;
      thisYear: ReadonlyArray<LeaderboardEntry>;
      // overall: ReadonlyArray<LeaderboardEntry>;
    }>
  > => {
    // const now = new Date();
    const limit = 100;
    // Yesterday
    const yesterdayLeaderboard =
      await this.backend.leaderboards.leaderboardPlayers4_0("yesterday", {
        points,
        types,
        limit,
      });
    // let yesterdayStart = new Date(now.getTime());
    // yesterdayStart.setDate(now.getDate() - 1);
    // const yesterdayEnd = new Date(yesterdayStart.getTime());
    // const yesterdayLeaderboard =
    //   await this.backend.leaderboards.leaderboardPlayers({
    //     start: this.dateToString(yesterdayStart),
    //     end: this.dateToString(yesterdayEnd),
    //     limit,
    //   });
    // // This week
    // const thisWeekEnd = new Date(now.getTime());
    // let thisWeekStart = new Date(now.getTime());
    // thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    // const thisWeekLeaderboard =
    //   await this.backend.leaderboards.leaderboardPlayers({
    //     start: this.dateToString(thisWeekStart),
    //     end: this.dateToString(thisWeekEnd),
    //     limit,
    //   });
    // This month
    const thisMonthLeaderboard =
      await this.backend.leaderboards.leaderboardPlayers4_0("thismonth", {
        points,
        types,
        limit,
      });
    // const thisMonthEnd = new Date(now.getTime());
    // let thisMonthStart = new Date(now.getTime());
    // thisMonthStart.setDate(1);
    // const thisMonthLeaderboard =
    //   await this.backend.leaderboards.leaderboardPlayers({
    //     start: this.dateToString(thisMonthStart),
    //     end: this.dateToString(thisMonthEnd),
    //     limit,
    //   });
    // Last month
    const lastMonthLeaderboard =
      await this.backend.leaderboards.leaderboardPlayers4_0("lastmonth", {
        points,
        types,
        limit,
      });
    // let lastMonthEnd = new Date(now.getTime());
    // lastMonthEnd.setDate(0);
    // let lastMonthStart = new Date(now.getTime());
    // lastMonthStart.setMonth(lastMonthEnd.getMonth());
    // lastMonthStart.setDate(1);
    // const lastMonthLeaderboard =
    //   await this.backend.leaderboards.leaderboardPlayers({
    //     start: this.dateToString(lastMonthStart),
    //     end: this.dateToString(lastMonthEnd),
    //     limit,
    //   });
    // This year
    const thisYearLeaderboard =
      await this.backend.leaderboards.leaderboardPlayers4_0("thisyear", {
        points,
        types,
        limit,
      });
    // Overall
    // const overallLeaderboard =
    //   await this.backend.leaderboards.leaderboardPlayers({
    //     limit,
    //   });
    //
    return {
      yesterday: yesterdayLeaderboard.leaderboard.map((e, i) => ({
        username: e.username,
        score: parseInt(e.score_in_range + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(e.user_id),
        rank: `#${i + 1}`,
      })),
      thisMonth: thisMonthLeaderboard.leaderboard.map((e, i) => ({
        username: e.username,
        score: parseInt(e.score_in_range + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(e.user_id),
        rank: `#${i + 1}`,
      })),
      lastMonth: lastMonthLeaderboard.leaderboard.map((e, i) => ({
        username: e.username,
        score: parseInt(e.score_in_range + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(e.user_id),
        rank: `#${i + 1}`,
      })),
      thisYear: thisYearLeaderboard.leaderboard.map((e, i) => ({
        username: e.username,
        score: parseInt(e.score_in_range + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(e.user_id),
        rank: `#${i + 1}`,
      })),
      // overall: overallLeaderboard.map((i) => ({
      //   username: i.username,
      //   score: parseInt(i.score_in_range + "", 10).toLocaleString(),
      //   imageUrl: i.user_image,
      //   rank: `#${i.global_rank}`,
      // })),
    };
  };

  getReferralPoints = async (): Promise<
    Readonly<{
      thisMonth: ReadonlyArray<LeaderboardEntry>;
      overall: ReadonlyArray<LeaderboardEntry>;
    }>
  > => {
    const limit = 100;
    const username = (await this.backend.getCurrentUserInfo())?.username || "";
    // This month
    const thisMonthLeaderboard =
      await this.backend.leaderboards.leaderboardPlayersReferralPoints({
        ...this.getThisMonthRange(),
        limit,
        username,
      });
    // Overall
    const overallLeaderboard =
      await this.backend.leaderboards.leaderboardPlayersReferralPoints({
        ...this.getOverallRange(),
        limit,
        username,
      });
    //
    return {
      thisMonth: (thisMonthLeaderboard || []).map((e) => ({
        username: e.username,
        score: parseInt(e.points + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(parseInt(e.user_id, 10)),
        rank: `#${parseInt(e.rank + "", 10)}`,
      })),
      overall: (overallLeaderboard || []).map((e) => ({
        username: e.username,
        score: parseInt(e.points + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(parseInt(e.user_id, 10)),
        rank: `#${parseInt(e.rank + "", 10)}`,
      })),
    };
  };

  getReferralPlayers = async (): Promise<
    Readonly<{
      thisMonth: ReadonlyArray<LeaderboardEntry>;
      overall: ReadonlyArray<LeaderboardEntry>;
    }>
  > => {
    const limit = 100;
    const username = (await this.backend.getCurrentUserInfo())?.username || "";
    // This month
    const thisMonthLeaderboard =
      await this.backend.leaderboards.leaderboardPlayersReferralPlayers({
        ...this.getThisMonthRange(),
        limit,
        username,
      });
    // Overall
    const overallLeaderboard =
      await this.backend.leaderboards.leaderboardPlayersReferralPlayers({
        ...this.getOverallRange(),
        limit,
        username,
      });
    //
    return {
      thisMonth: (thisMonthLeaderboard || []).map((e) => ({
        username: e.username,
        score: parseInt(e.points + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(parseInt(e.user_id, 10)),
        rank: `#${parseInt(e.rank + "", 10)}`,
      })),
      overall: (overallLeaderboard || []).map((e) => ({
        username: e.username,
        score: parseInt(e.points + "", 10).toLocaleString(),
        imageUrl: getAvatarUrl(parseInt(e.user_id, 10)),
        rank: `#${parseInt(e.rank + "", 10)}`,
      })),
    };
  };

  getMunzees = async (): Promise<
    Readonly<{
      yesterday: ReadonlyArray<LeaderboardEntry>;
      thisWeek: ReadonlyArray<LeaderboardEntry>;
      overall: ReadonlyArray<LeaderboardEntry>;
    }>
  > => {
    const limit = 100;
    const username = (await this.backend.getCurrentUserInfo())?.username || "";
    // Yesterday
    const yesterdayLeaderboard =
      await this.backend.leaderboards.leaderboardMunzees({
        ...this.getYesterdayRange(),
        limit,
        username,
      });
    // This week
    const thisWeekLeaderboard =
      await this.backend.leaderboards.leaderboardMunzees({
        ...this.getThisWeekRange(),
        limit,
        username,
      });
    // Overall
    const overallLeaderboard =
      await this.backend.leaderboards.leaderboardMunzees({
        limit,
        username,
      });
    //
    return {
      yesterday: (yesterdayLeaderboard || []).map((e, i) => ({
        username: e.munzee_data.friendly_name,
        score: parseInt(e.number_captured + "", 10).toLocaleString(),
        imageUrl: e.pin_icon,
        rank: `#${parseInt(i + 1 + "", 10)}`,
      })),
      thisWeek: (thisWeekLeaderboard || []).map((e, i) => ({
        username: e.munzee_data.friendly_name,
        score: parseInt(e.number_captured + "", 10).toLocaleString(),
        imageUrl: e.pin_icon,
        rank: `#${parseInt(i + 1 + "", 10)}`,
      })),
      overall: (overallLeaderboard || []).map((e, i) => ({
        username: e.munzee_data.friendly_name,
        score: parseInt(e.number_captured + "", 10).toLocaleString(),
        imageUrl: e.pin_icon,
        rank: `#${parseInt(i + 1 + "", 10)}`,
      })),
    };
  };

  getSocials = async (): Promise<
    ReadonlyArray<LeaderboardEntry & Readonly<{ player: string }>>
  > => {
    const limit = 100;
    const username = (await this.backend.getCurrentUserInfo())?.username || "";
    const overallLeaderboard =
      await this.backend.leaderboards.leaderboardMunzeesSocial({
        limit,
        username,
      });
    //
    return (overallLeaderboard || []).map((e, i) => ({
      username: e.munzee_data.friendly_name,
      score: parseInt(e.number_captured + "", 10).toLocaleString(),
      imageUrl: e.pin_icon,
      rank: `#${parseInt(i + 1 + "", 10)}`,
      player: e.munzee_data.creator_username,
    }));
  };

  getRovers = async (): Promise<
    ReadonlyArray<LeaderboardEntry & Readonly<{ by: string; miles: string }>>
  > => {
    const username = (await this.backend.getCurrentUserInfo())?.username || "";
    const overallLeaderboard =
      await this.backend.leaderboards.leaderboardRovers({
        username,
      });
    //
    return (overallLeaderboard || []).map((e) => ({
      username: e.name,
      score: parseInt(e.score + "", 10).toLocaleString(),
      imageUrl: e.logo,
      rank: `#${parseInt(e.rank + "", 10)}`,
      by: e.username,
      miles: parseInt(e.total_miles + "", 10).toLocaleString(),
    }));
  };

  private getYesterdayRange = (): Readonly<{
    start: string;
    end: string;
  }> => {
    const now = new Date();
    let start = new Date(now.getTime());
    start.setDate(now.getDate() - 1);
    const end = new Date(start.getTime());
    return {
      start: this.dateToString(start),
      end: this.dateToString(end),
    };
  };

  private getThisWeekRange = (): Readonly<{
    start: string;
    end: string;
  }> => {
    const now = new Date();
    const end = new Date(now.getTime());
    let start = new Date(now.getTime());
    start.setDate(start.getDate() - start.getDay());
    return {
      start: this.dateToString(start),
      end: this.dateToString(end),
    };
  };

  private getThisMonthRange = (): Readonly<{
    start: string;
    end: string;
  }> => {
    const now = new Date();
    const end = new Date(now.getTime());
    let start = new Date(now.getTime());
    start.setDate(1);
    return {
      start: this.dateToString(start),
      end: this.dateToString(end),
    };
  };

  private getOverallRange = (): Readonly<{
    start: string;
    end: string;
  }> => {
    const now = new Date();
    const end = new Date(now.getTime());
    let start = new Date(2010, 0, 1);
    return {
      start: this.dateToString(start),
      end: this.dateToString(end),
    };
  };

  private dateToString = (date: Date): string => {
    let year = "" + date.getFullYear();
    let month = "0" + (date.getMonth() + 1);
    let day = "0" + date.getDate();
    return (
      year +
      "-" +
      month.substr(month.length - 2) +
      "-" +
      day.substr(day.length - 2)
    );
  };
}

export default Leaderboards;
