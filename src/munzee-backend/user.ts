import { Entries, Munzee, Photos, ReferralPoints } from "./types";

type Clan = Readonly<{
  id: string;
  name: string;
  url: string;
  logo: string;
  rank: number;
  total_clans: number;
}>;

type User = Readonly<{
  username: string;
  user_id: number;
  user_type_id: number;
  avatar: string;
  number_of_captures: number;
  number_of_deployments: number;
  number_of_undeployments: number;
  number_of_archived: number;
  number_of_badges: number;
  rovers_transported: number;
  coins_discovered: number;
  number_of_special_munzees_captured: number;
  hash: string;
  premium: number;
  level: number;
  rank: number;
  points: number;
  max_points_in_level: number;
  min_points_in_level: number;
  points_till_next_level: number;
  join_time: string;
  days_old: number;
  maintenance_team: number;
  titles: string[];
  number_of_unique_specials_captured: number;
  location: string;
  premium_expires: string;
  clan: Clan;
  discover_requests: number;
  own_coins: number;
  in_kennel: number;
  own_rovers: number;
  number_of_maintenance_munzees: number;
  number_of_soft_maintenance_munzees: number;
  number_of_own_socials: number;
  banned?: number;
  ban_timer?: number;
}>;

type MunzeesCreated = Readonly<{
  created: number;
  user_id: string;
}>;

export default class UserAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number },
      method?: "GET" | "POST"
    ) => any
  ) {}

  user = async (params: Readonly<{ user_id: number; username?: string }>) => {
    const result: {
      data: User;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/", params);
    return result?.data;
  };

  userReferralPoints = async (
    params: Readonly<{ page: number; user_id: number }>
  ) => {
    const result: {
      data: Readonly<ReferralPoints>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/referralpoints/", params);
    return result?.data;
  };

  userStatsRovers = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: User;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/stats/rovers/", params);
    return result?.data;
  };

  userStatsCoins = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: User;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/stats/coins/", params);
    return result?.data;
  };

  userFind = async (params: Readonly<{ text: string; limit: number }>) => {
    const result: {
      data: {
        users: ReadonlyArray<{
          user_id: number;
          username: string;
        }>;
        too_many: number;
      };
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/find/", params);
    return result?.data;
  };

  userUndeploys = async (
    params: Readonly<{ user_id: number; page: number; type_id?: string }>
  ) => {
    const result: {
      data: Readonly<{
        has_more: number;
        munzees: ReadonlyArray<Munzee>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/undeploys/", params);
    return result?.data;
  };

  userUndeploysSearch = async (
    params: Readonly<{
      user_id: number;
      page: number;
      text: string;
      type_id?: string;
    }>
  ) => {
    const result: {
      data: Readonly<{
        has_more: number;
        munzees: ReadonlyArray<Munzee>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/undeploys/search", params);
    return result?.data;
  };

  userUndeploysPrinting = async (
    params: Readonly<{
      user_id: number;
    }>
  ) => {
    const result: {
      data: ReadonlyArray<Munzee>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/undeploys/printing", params);
    return result?.data;
  };

  userArchived = async (
    params: Readonly<{ page: number; user_id: number }>
  ) => {
    const result: {
      data: Readonly<{
        has_more: number;
        munzees: ReadonlyArray<Munzee>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/archived/", params);
    return result?.data;
  };

  userDeploys = async (params: Readonly<{ page: number; user_id: number }>) => {
    const result: {
      data: Readonly<{
        has_more: number;
        munzees: ReadonlyArray<Munzee>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/deploys/", params);
    return result?.data;
  };

  userCaptures = async (
    params: Readonly<{ page: number; user_id: number }>
  ) => {
    const result: {
      data: ReadonlyArray<Munzee>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/captures/", params);
    return result?.data;
  };

  userSocials = async (
    params: Readonly<{ user_id: number; username: string }>
  ) => {
    const result: {
      data: ReadonlyArray<Munzee>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/socials/", params);
    return result?.data;
  };

  userPopluar = async (
    params: Readonly<{ page: number; user_id: number; filter: number }>
  ) => {
    const result: {
      data: ReadonlyArray<Munzee>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/popular/", params);
    return result?.data;
  };

  userEntries = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, Entries>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/entries/", params);
    return result?.data;
  };

  userIndicator = async (
    params: Readonly<{ page: number; user_id: number }>
  ) => {
    const result: {
      data: Readonly<{
        [date: string]: Readonly<{
          day: string;
          captures: number;
          deploys: number;
        }>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/indicator/", params);
    return result?.data;
  };

  userSocialsOwn = async (params: Readonly<{ username: string }>) => {
    const result: {
      data: ReadonlyArray<Munzee>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/socials/own/", params);
    return result?.data;
  };

  userSpecials = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<{
        name: string;
        logo: string;
        count: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/specials/", params);
    return result?.data;
  };

  userMaintenance = async (
    params: Readonly<{ page: number; user_id: number }>
  ) => {
    const result: {
      data: ReadonlyArray<Munzee>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/maintenance/", params);
    return result?.data;
  };

  userMaintenanceSoft = async (
    params: Readonly<{ page: number; user_id: number }>
  ) => {
    const result: {
      data: ReadonlyArray<Munzee>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/maintenance/soft/", params);
    return result?.data;
  };

  userBlasts = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          total_points: number;
          total_captures: number;
          blasted_at: string;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/blasts/", params);
    return result?.data;
  };

  userZeeqrew = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: Readonly<{
        title: string;
        timeframe: string;
        zeeqrew_requirements: Readonly<{
          premium_requirement: string | boolean;
          lifetime_physical_deploy_requirement: string | boolean;
          lifetime_score_requirement: string | boolean;
          timeframe_capture_requirement: string | boolean;
          timeframe_deploy_requirement: string | boolean;
        }>;
        qrew_requirements: Readonly<{
          premium_requirement: string | boolean;
          lifetime_capture_requirement: string | boolean;
          lifetime_deploy_requirement: string | boolean;
          timeframe_capture_requirement: string | boolean;
          timeframe_deploy_requirement: string | boolean;
        }>;
      }>;

      status_code: number;
      status_text: string;
    } = await this.callAPI("user/zeeqrew/", params, "GET");
    return result?.data;
  };

  userGallery = async (params: Readonly<{ page: number; user_id: number }>) => {
    const result: {
      data: Readonly<{
        photos: ReadonlyArray<
          Readonly<{
            timestamp: number;
            photo: string;
            id: string;
            munzee_data: Readonly<{
              munzee_id: string;
              friendly_name: string;
              capture_type_id: string;
              code: string;
              creator_username: string;
              creator_user_id: string;
              pin_icon: string;
            }>;
          }>
        >;
        has_more: number;
        path: string;
        path_small: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/gallery/", params);
    return result?.data;
  };

  userPhotos = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: Readonly<{
        photos: ReadonlyArray<Readonly<Photos>>;
        path: string;
        path_small: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/photos/", params);
    return result?.data;
  };

  userMunzeesCreated = async (params: Readonly<{}>) => {
    const result: {
      data: MunzeesCreated;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/munzees/created/", params);
    return result?.data;
  };
}
