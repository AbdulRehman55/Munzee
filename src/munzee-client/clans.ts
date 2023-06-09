import Backend from "../munzee-backend";

type ClanLeaderboardEntry = Readonly<{
  rank: string;
  name: string;
  imageUrl: string;
  totalPoints: string;
  levelReached: string;
}>;

class Clans {
  constructor(private backend: Backend) {}

  getLeaderboard = async (): Promise<ReadonlyArray<ClanLeaderboardEntry>> => {
    const result = await this.backend.clans.clanV2Leaderboard({});
    return (
      result?.leaderboard.map((e) => ({
        rank: `#${e.rank}`,
        name: e.name,
        imageUrl: e.logo,
        totalPoints: parseInt(e.lb_total + "", 10).toLocaleString(),
        levelReached: parseInt(e.level_reached + "", 10).toLocaleString(),
      })) || []
    );
  };
}

export default Clans;
