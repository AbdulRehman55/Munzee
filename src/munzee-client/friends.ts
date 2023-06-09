import Backend from "../munzee-backend";
import { getAvatarUrl } from "./utils";

type Friend = Readonly<{
  name: string;
  level: string;
  captures: string;
  deploys: string;
  points: string;
  avatar: string;
}>;

class Friends {
  constructor(private backend: Backend) {}

  getFriends = async (): Promise<ReadonlyArray<Friend>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.friends.userFriends({ user_id });
    return (
      result?.map((f) => ({
        name: f.username,
        level: f.level.toLocaleString(),
        captures: f.total_captures.toLocaleString(),
        deploys: f.total_deploys.toLocaleString(),
        points: f.score.toLocaleString(),
        avatar: getAvatarUrl(f.id),
      })) || []
    );
  };

  addFriend = async (
    username: string
  ): Promise<Readonly<{ message: string }>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { message: "error" };
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.friends.userFriendsNew({
      user_id,
      username_friend: username,
    });
    return result;
  };

  removeFriend = async (
    username: string
  ): Promise<Readonly<{ message: string }>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { message: "error" };
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.friends.userFriendsRemove({
      user_id,
      username_friend: username,
    });
    return result;
  };
}

export default Friends;
