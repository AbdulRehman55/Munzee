import { Notification } from "./types";

export default class NotificationsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  userNotifications = async (
    params: Readonly<{ user_id: number; since? : number }>
  ) => {
    const result: {
      data: ReadonlyArray<Notification>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/notifications/", params);
    return result?.data;
  };
}
