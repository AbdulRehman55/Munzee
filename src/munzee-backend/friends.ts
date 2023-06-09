type Friend = Readonly<{
  id: number;
  level: number;
  number_of_first_to_captured: number;
  number_of_specials: number;
  score: number;
  total_captures: number;
  total_deploys: number;
  user_image: string;
  username: string;
}>;

export default class FriendsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  userFriends = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<Friend>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/friends/", params);
    return result?.data;
  };

  userFriendsNew = async (
    params: Readonly<{ user_id: number; username_friend: string }>
  ) => {
    const result: {
      data: Readonly<{
        added: number;
        message: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/friends/new/", params);
    return result?.data;
  };

  userFriendsRemove = async (
    params: Readonly<{ user_id: number; username_friend: string }>
  ) => {
    const result: {
      data: Readonly<{
        deleted: number;
        message: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/friends/remove/", params);
    return result?.data;
  };
}
