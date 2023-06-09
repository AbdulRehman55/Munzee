type ClanV2 = Readonly<{
  details: Readonly<{
    clan_id: string;
    name: string;
    simple_name: string;
    tagline: string;
    created_by_userid: number;
    logo: string;
    privacy: string;
    goal: string;
    members: number;
    level_reached: number;
    updated_at: number;
    total_value: number;
  }>;
  users: ReadonlyArray<
    Readonly<{
      user_id: number;
      username: string;
      is_admin: number;
    }>
  >;
  admins: Readonly<{
    [id: number]: Readonly<{
      user_id: number;
      username: string;
      is_admin: number;
    }>;
  }>;
  pending_requests?: ReadonlyArray<
    Readonly<{
      user_id: number;
      username: string;
      request_at: number;
    }>
  >;
  pending_invitations?: ReadonlyArray<
    Readonly<{
      user_id: number;
      username: string;
    }>
  >;
  result: Readonly<{
    level_reached: number;
    game_id: number;
    updated_at: number;
    total_value: number;
    rank: number;
  }>;
}>;

type ClanListSearchItem = Readonly<{
  id: string;
  name: string;
  simple_name: string;
  tagline: string;
  level_reached: number;
  logo: string;
  privacy: string;
  goal: string;
  members: number;
  pending_request: number;
}>;

export default class ClansAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  clanV2Leaderboard = async (params: Readonly<{ game_id?: number }>) => {
    const result: {
      data: Readonly<{
        battle: Readonly<{
          game_id: number;
          start: number;
          end: number;
          lb_total_task_id: number;
          lb_total_key: string;
          total_clans: number;
        }>;
        leaderboard: ReadonlyArray<
          Readonly<{
            level_reached: number;
            clan_id: string;
            lb_total: number;
            name: string;
            simple_name: string;
            rank: number;
            logo: string;
          }>
        >;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/leaderboard/", {
      ...params,
      username: "munzee",
    });
    return result?.data;
  };

  clanV2List = async (params: Readonly<{ goal: number }>) => {
    const result: {
      data: Readonly<{
        clans: ReadonlyArray<ClanListSearchItem>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/list/", params);
    return result?.data;
  };

  clanV2Search = async (params: Readonly<{ text: string; limit: number }>) => {
    const result: {
      data: Readonly<{
        clans: ReadonlyArray<ClanListSearchItem>;
        too_many: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/search/", params);
    return result?.data;
  };

  clanV2Random = async (params: Readonly<{}>) => {
    const result: {
      data: Readonly<{
        clan?: ClanV2;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/random/", { ...params, privacy: "all" });
    return result?.data;
  };

  clanV2Join = async (params: Readonly<{ clan_id: string }>) => {
    const result: {
      data: Readonly<{
        success: number;
        joined: number;
        clan?: ClanV2;
        requested?: number;
        message?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/join/", params);
    return result?.data;
  };

  clanV2RequestCancel = async (params: Readonly<{}>) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/request/cancel/", params);
    return result?.data;
  };

  clanV2RequestAccept = async (
    params: Readonly<{ clan_id: string; user_id: string }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        accepted: number;
        clan?: ClanV2;
        message?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/request/accept/", params);
    return result?.data;
  };

  clanV2RequestDecline = async (
    params: Readonly<{ clan_id: string; user_id: string }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        accepted: number;
        clan?: ClanV2;
        message?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/request/decline/", params);
    return result?.data;
  };

  clanV2UserLeave = async (
    params: Readonly<{ clan_id: string; user_id: number }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        clan: ClanV2;
        message?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/user/invitations/", params);
    return result?.data;
  };

  clanV2UserInvitations = async (params: Readonly<{}>) => {
    const result: {
      data: ReadonlyArray<Readonly<{ code: string; clan: ClanV2 }>>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/user/invitations/", params);
    return result?.data;
  };

  clanV2UserInviteNew = async (
    params: Readonly<{ clan_id: string; username: string }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/user/invite/new/", params);
    return result?.data;
  };

  clanV2UserInviteCancel = async (
    params: Readonly<{ clan_id: string; user_id: string }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/user/invite/cancel/", params);
    return result?.data;
  };

  clanV2UserInviteAccept = async (
    params: Readonly<{ clan_id: string; code: string }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        accepted: number;
        clan: ClanV2;
        message?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/user/invite/accept/", params);
    return result?.data;
  };

  clanV2UserInviteDecline = async (
    params: Readonly<{
      clan_id: string;
      code: string;
    }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        accepted: number;
        clan: ClanV2;
        message?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("clan/v2/user/invite/decline/", params);
    return result?.data;
  };
}
