export default class LeaderboardsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  leaderboardPlayers4_0 = async (
    range:
      | "today"
      | "yesterday"
      | "thismonth"
      | "lastmonth"
      | "thisyear"
      | "overall",
    params: Readonly<{
      points: "total" | "capture" | "capon" | "deploy";
      types: "physical" | "virtual" | "all";
      limit: number;
    }>
  ) => {
    const result: {
      data: Readonly<{
        user: Readonly<{
          rank: number;
          score_in_range?: number;
        }>;
        leaderboard: ReadonlyArray<
          Readonly<{
            score_in_range: number;
            user_id: number;
            username: string;
          }>
        >;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI(`leaderboard/players/4.0/${range}`, params);
    return result?.data;
  };

  leaderboardPlayers = async (
    // V3
    params: Readonly<{
      start?: string;
      end?: string;
      limit: number;
    }>
  ) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          global_rank: number;
          level: number;
          number_of_captured: number;
          number_of_deployed: number;
          number_of_first_to_captured: number;
          number_of_special_munzees_captured: number;
          score: number;
          score_in_range: number;
          user_id: number; // ! players/overall route returns this field
          userid: number; //  ! players/ route returns this field
          user_image: string;
          username: string;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI(
      `leaderboard/players/${params.start && params.end ? "" : "overall/"}`,
      params
    );
    return result?.data;
  };

  leaderboardPlayersReferralPoints = async (params: {
    username: string;
    start: string;
    end: string;
    limit: number;
  }) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          user_id: string;
          points: string;
          rank: number;
          username: string;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("leaderboard/players/referral/points/", params);
    return result?.data;
  };

  leaderboardPlayersReferralPlayers = async (params: {
    username: string;
    start: string;
    end: string;
    limit: number;
  }) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          user_id: string;
          points: string;
          rank: number;
          username: string;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("leaderboard/players/referral/players/", params);
    return result?.data;
  };

  leaderboardMunzees = async (params: {
    username: string;
    start?: string;
    end?: string;
    limit: number;
  }) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          munzee_id: string;
          number_captured: string;
          munzee_creator_user_id: string;
          munzee_data: {
            munzee_id: string;
            friendly_name: string;
            code: string;
            creator_username: string;
            capture_type_id: string;
          };
          pin_icon: string;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI(
      params.start && params.end
        ? "leaderboard/munzees/"
        : "leaderboard/munzees/overall/",
      params
    );
    return result?.data;
  };

  leaderboardMunzeesSocial = async (params: {
    username: string;
    limit: number;
  }) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          munzee_id: string;
          number_captured: string;
          munzee_creator_user_id: string;
          munzee_data: Readonly<{
            munzee_id: string;
            friendly_name: string;
            code: string;
            creator_username: string;
          }>;
          pin_icon: string;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("leaderboard/munzees/social/", params);
    return result?.data;
  };

  leaderboardRovers = async (params: { username: string }) => {
    const result: {
      data: Readonly<{
        rovers: ReadonlyArray<
          Readonly<{
            rank: string;
            rover_id: string;
            score: string;
            name: string;
            user_id: string;
            logo: string;
            total_miles: string;
            level: number;
            username: string;
          }>
        >;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("leaderboard/rovers/", params);
    return result?.data?.rovers;
  };
}
