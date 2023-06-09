type Message = Readonly<{
  body: string;
  created_at: string;
  message_id: string;
  sender_id: number;
}>;

type Flow = Readonly<{
  avatar: string;
  flow_id: string;
  image: string;
  is_new: number;
  last_update_unix: number;
  unread_count: number;
  user_id: number;
  username: string;
  latest_message: Message;
}>;

export default class FlowsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  userMessagesFlows = async () => {
    const result: {
      data: Readonly<{
        flows: ReadonlyArray<Flow>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flows", {});
    return result?.data?.flows;
  };

  userMessagesFlowsArchived = async () => {
    const result: {
      data: Readonly<{
        flows: ReadonlyArray<Flow>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flows/archived", {});
    return result?.data?.flows;
  };

  userMessagesFlowsUnreadCount = async () => {
    const result: {
      data: Readonly<{
        unread: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flows/unread/count", {});
    return result?.data?.unread;
  };

  userMessagesFlowUnread_markAsUnread = async (
    params: Readonly<{ flow_id: string }>
  ) => {
    const result: {
      data: Readonly<{
        unread: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flow/unread", params);
    return result?.data?.unread;
  };

  userMessagesFlowArchive = async (params: Readonly<{ flow_id: string }>) => {
    const result: {
      data: {};
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flow/archive", params);
  };

  userMessagesFlowMessage = async (
    params: Readonly<{ flow_id: string; message_id: string }>
  ) => {
    const result: {
      data: Readonly<{
        message: Message;
        user: Readonly<{
          image: string;
          user_id: number;
          username: string;
        }>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flow/message", params);
    return result?.data;
  };

  userMessagesFlow = async (params: Readonly<{ flow_id: string }>) => {
    const result: {
      data: Readonly<{
        messages: ReadonlyArray<Message>;
        users: Readonly<{
          [user_id: number]: Readonly<{
            avatar: string;
            image: string;
            username: string;
          }>;
        }>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flow", params);
    return result?.data;
  };

  userMessagesFlowSend = async (
    params: Readonly<{ receiver_username: string; body: string }>
  ) => {
    const result: {
      data: Readonly<{
        body: string;
        created_at: number;
        flow_id: string;
        message_id: string;
        error: number;
        receiver_id: string;
        sender_id: string;
        message?: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/messages/flow/send", params);
    return { success: result?.data?.error === 0 };
  };
}
