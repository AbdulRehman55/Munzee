export type Coin = Readonly<{
  active: number;
  capture_types: number[];
  code: string;
  coin_id: number;
  link_created: string;
  logo: string;
  name: string;
  no_discover: number;
  notes: string;
  only_capture_types: number;
  only_physicals: number;
  total_players: number;
  total_visits: number;
  type: number;
  type_name: string;
  user_id: number;
  username: string;
}>;

export type DiscoverRequest = Readonly<{
  id: string;
  coin_id: number;
  user_id: number | string;
  avatar?: string;
  discovered_at: string;
  type_logo: string;
  username: string;
  name: string;
}>;

export type DiscoverTypes = {
  number: string;
  type_logo: string;
  type_name: string;
};

export type DiscoverCoin = {
  coin_id: string;
  visited_at: string;
  user_id: string;
  name: string;
  type_logo: string;
  type_name: string;
  username: string;
};

export type Discover = {
  has_more?: number;
  coins: DiscoverCoin[];
};

export default class CoinsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  userCoins = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<Coin>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/coins/", params);
    return result?.data;
  };

  coinActivate = async (params: Readonly<{ coin_id: number }>) => {
    const result: {
      data: Readonly<{
        coin_id: number;
        message: string;
        updated: number;
        error?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("coin/activate/", params);
    return result?.data;
  };

  coinDeactivate = async (params: Readonly<{ coin_id: number }>) => {
    const result: {
      data: Readonly<{
        coin_id: number;
        message: string;
        updated: number;
        error?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("coin/deactivate/", params);
    return result?.data;
  };

  userCoinsAdd = async (params: Readonly<{ code: string }>) => {
    const result: {
      data: Readonly<{
        linked: number;
        message: string;
        error?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/coins/add/", params);
    return result?.data;
  };

  coinDiscover = async (
    params: Readonly<{ page: number; user_id: number }>
  ) => {
    const result: {
      data: Readonly<Discover>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/coins/discovered/", params);
    return result?.data;
  };

  coinDiscoverTypes = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: DiscoverTypes;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/coins/discovered/types", params);
    return result.data;
  };

  coinDiscoverApprove = async (
    params: Readonly<{
      request_id: string;
      coin_id: number;
      decline: 0 | 1;
    }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
        error?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("coin/discover/approve/", params);
    return result?.data;
  };

  coinDiscoverRequests = async () => {
    const result: {
      data: ReadonlyArray<DiscoverRequest>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("coin/discover/requests/", {});
    return result?.data;
  };
}
