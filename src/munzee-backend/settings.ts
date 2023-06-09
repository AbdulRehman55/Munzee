type Settings = Readonly<{
  email?: string;
  alerts?: Readonly<{
    nomad: string;
    myth: string;
    event: string;
    other: string;
  }>;
  business_munzee?: string;
  capture_email?: string;
  distance_type?: string;
  home_latitude?: number;
  home_location_id?: string;
  home_longitude?: number;
  journal_email?: string;
  map_cluster_size?: number;
  map_options?: number;
  nearby_distance?: string;
  nearby_email?: string;
  new_message_email?: string;
  private_mode?: boolean;
  summary_daily?: boolean;
  summary_weekly?: boolean;
  timezone?: string;
}>;

export default class SettingsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number | boolean | unknown }
    ) => any
  ) {}

  userSettings = async (
    params: Settings &
      Readonly<{
        user_id: number;
        update?: boolean;
      }>
  ) => {
    const result: {
      data: Settings;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/settings/", params);
    return result?.data;
  };

  userAvatarNew = async (params: { image: string }) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/avatar/new/", params);
    return result?.data;
  };

  userUsernameChange = async (params: {
    user_id: number;
    new_username: string;
  }) => {
    const result: {
      data: Readonly<{
        changed: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/username/change/", params);
    return result?.data;
  };
}
