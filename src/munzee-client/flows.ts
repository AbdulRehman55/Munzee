import Backend from "../munzee-backend";

type Flow = Readonly<{
  name: string;
  avatar: string;
  lastMsg: string;
  lastTime: string;
  flowId: string;
  unread: boolean;
}>;

type Message = Readonly<{
  name: string;
  avatar: string;
  time: string;
  flowId: string;
  message: string;
  messageId: string;
  author: "me" | "user";
}>;

class Flows {
  constructor(private backend: Backend) {}

  getAllFlows = async (): Promise<ReadonlyArray<Flow>> => {
    const flows = (await this.backend.flows.userMessagesFlows()) || [];
    const me = await this.backend.getCurrentUserInfo();
    return flows.map((f) => ({
      flowId: f.flow_id,
      name: f.username,
      avatar: f.avatar,
      lastMsg: f.latest_message.body,
      lastTime: new Date(
        parseInt(f.last_update_unix + "", 10)
      ).toLocaleString(),
      unread: f.unread_count > 0,
    }));
  };

  getArchivedFlows = async (): Promise<ReadonlyArray<Flow>> => {
    const flows = (await this.backend.flows.userMessagesFlowsArchived()) || [];
    const me = await this.backend.getCurrentUserInfo();
    return flows.map((f) => ({
      flowId: f.flow_id,
      name: f.username,
      avatar: f.avatar,
      lastMsg: f.latest_message.body,
      lastTime: new Date(
        parseInt(f.last_update_unix + "", 10)
      ).toLocaleString(),
      unread: f.unread_count > 0,
    }));
  };

  getFlowMessages = async (flowId: string): Promise<ReadonlyArray<Message>> => {
    const result = await this.backend.flows.userMessagesFlow({
      flow_id: flowId,
    });
    const me = await this.backend.getCurrentUserInfo();
    const messages = result?.messages || [];
    return messages.map((f) => ({
      flowId,
      messageId: f.message_id,
      message: f.body,
      name: f.sender_id + "",
      author: f.sender_id + "" === me?.uid + "" ? "me" : "user",
      avatar: result.users[f.sender_id].avatar || "",
      time: new Date(parseInt(f.created_at + "", 10)).toLocaleString(),
    }));
  };

  sendMessage = async (
    username: string,
    body: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await this.backend.flows.userMessagesFlowSend({
      receiver_username: username,
      body,
    });
    return { success: !!result.success };
  };

  markAsUnread = async (flowId: string) => {
    const result = await this.backend.flows.userMessagesFlowUnread_markAsUnread(
      { flow_id: flowId }
    );
    return { success: result > 0 };
  };

  archive = async (flowId: string) => {
    const result = await this.backend.flows.userMessagesFlowArchive({
      flow_id: flowId,
    });
    return { success: true };
  };
}

export default Flows;
