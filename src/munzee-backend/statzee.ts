type StatMunzee = Readonly<{
  capture_id?: string;
  id?: string;
  code: string;
  captured_at?: string;
  deployed_at?: string;
  points: string;
  friendly_name: string;
  capture_type_id: string;
  username?: string;
  pin: string;
  munzee_id: string;
}>;

export default class StatzeeAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number | boolean | unknown },
      method?: "GET" | "POST"
    ) => any
  ) {}

  statsOverall = async (params: {}) => {
    const result: {
      data: Readonly<{
        number_of_users: string;
        number_of_deployed_munzees: string;
        number_of_captures: string;
        number_of_country_captures: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("stats/overall/", {
      ...params,
      username: "munzee",
    });
    return result?.data;
  };

  statzeeGlobalLasthour = async (params: {}) => {
    const result: {
      data: Readonly<{
        captures: number;
        munzees: number;
        users: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("statzee/global/last_hour/", params);
    return result?.data;
  };

  statzeePlayerDay = async (params: {
    user_id: number;
    username?: string;
    day: string;
  }) => {
    const result: {
      data: Readonly<{
        captures: ReadonlyArray<StatMunzee>;
        deploys: ReadonlyArray<StatMunzee>;
        passive_captures: ReadonlyArray<StatMunzee>;
        captures_on: ReadonlyArray<StatMunzee>;
        passive_deploys: ReadonlyArray<StatMunzee>;
        archived: ReadonlyArray<StatMunzee>;
        referral: ReadonlyArray<StatMunzee>;
        zeeops: ReadonlyArray<unknown>;
        total_points: number;
        level: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("statzee/player/day/", params);
    return result?.data;
  };
}
