import Backend from "../munzee-backend";
import Map from "./map";
import Leaderboards from "./leaderboards";
import Clans from "./clans";
import Flows from "./flows";
import User from "./user";
import Badges from "./badges";
import Blogs from "./blogs";
import Friends from "./friends";
import Credits from "./credits";
import Redeem from "./redeem";
import Captured from "./capture";
import Settings from "./settings";
import Statzee from "./statzee";

class Client {
  map: Map;
  leaderboards: Leaderboards;
  clans: Clans;
  flows: Flows;
  user: User;
  badges: Badges;
  blogs: Blogs;
  friends: Friends;
  credits: Credits;
  redeem: Redeem;
  captured: Captured;
  settings: Settings;
  statzee: Statzee;

  constructor(private backend: Backend) {
    this.map = new Map(this.backend);
    this.leaderboards = new Leaderboards(this.backend);
    this.clans = new Clans(this.backend);
    this.flows = new Flows(this.backend);
    this.user = new User(this.backend);
    this.badges = new Badges(this.backend);
    this.blogs = new Blogs(this.backend);
    this.friends = new Friends(this.backend);
    this.credits = new Credits(this.backend);
    this.redeem = new Redeem(this.backend);
    this.captured = new Captured(this.backend);
    this.settings = new Settings(this.backend);
    this.statzee = new Statzee(this.backend);
  }
}

export default Client;
