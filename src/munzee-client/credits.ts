import Backend from "../munzee-backend";

type Credit = Readonly<{
  image: string;
  title: string;
  count: number;
}>;

type History = Readonly<{
  date: string;
  item: string;
  description: string;
}>;

class Credits {
  constructor(private backend: Backend) {}

  getCredits = async (): Promise<ReadonlyArray<Credit>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = (await this.backend.credits.userCredits({ user_id })) || {};
    return Object.keys(result).map((k) => ({
      image: `https://munzee.global.ssl.fastly.net/images/pins/${k}.png`,
      title: k,
      count: result[k],
    }));
  };

  getHistory = async (): Promise<ReadonlyArray<History>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.credits.userCreditsHistory({ user_id });
    return (result?.items || []).map((r) => ({
      date: r.time_awarded,
      item: r.type,
      description: r.log_text,
    }));
  };
}

export default Credits;
