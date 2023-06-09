import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

import FlowsAPI from "./flows";
import UserAPI from "./user";
import MunzeeAPI from "./munzee";
import CoinsAPI from "./coins";
import MapAPI from "./map";
import BadgesAPI from "./badges";
import NotificationsAPI from "./notifications";
import RoverAPI from "./rover";
import LeaderboardsAPI from "./leaderboards";
import ClansAPI from "./clans";
import BlogsAPI from "./blogs";
import FriendsAPI from "./friends";
import CreditsAPI from "./credits";
import RedeemAPI from "./redeem";
import SettingsAPI from "./settings";
import StatzeeAPI from "./statzee";
import { APP_CONFIG } from "../config/config";

const CLIENTID = APP_CONFIG.BACKEND.CLIENT_ID;
const CLIENTSECRET = APP_CONFIG.BACKEND.CLIENT_SECRET;
const APIURL = APP_CONFIG.BACKEND.API_URL;

type Clan = Readonly<{
  id: string;
  name: string;
  url: string;
  logo: string;
  rank: number;
  total_clans: number;
}>;

export type UserInfo = {
  email: string;
  username: string;
  uid: string;
  userId: number;
  userTypeId: number;
  avatar: string;
  premium: number;
  premiumExpires: string;
  level: number;
  rank: number;
  numberOfCaptures: number;
  numberOfDeployments: number;
  numberOfUndeployments: number;
  numberOfArchived: number;
  numberOfBadges: number;
  points: number;
  daysOld: number;
  titles: string[];
  clan: Clan;
  maintenanceTeam?: number;

  // userId: number;
  // userTypeId: number;
  // avatar: string;
  // numberOfCaptures: number;
  // numberOfDeployments: number;
  // numberOfUndeployments: number;
  // numberOfArchived: number;
  // numberOfBadges: number;
  // roversTransported: number;
  // coinsDiscovered: number;
  // numberOfSpecialMunzeesCaptured: number;
  // hash: string;
  // premium: number;
  // level: number;
  // rank: number;
  // points: number;
  // maxPointsInLevel: number;
  // minPointsInLevel: number;
  // pointsTillNextLevel: number;
  // joinTime: string;
  // daysOld: number;
  // maintenanceTeam: number;
  // titles: string[];
  // numberOfUniqueSpecialsCaptured: number;
  // location: string;
  // premiumExpires: string;
  // clan: Clan;
  // discoverRequests: number;
  // ownCoins: number;
  // inKennel: number;
  // ownRovers: number;
  // numberOfMaintenanceMunzees: number;
  // numberOfSoftMaintenanceMunzees: number;
  // numberOfOwnSocials: number;
  // banned?: number;
  // banTimer?: number;
};

class Backend {
  flows: FlowsAPI;
  user: UserAPI;
  munzee: MunzeeAPI;
  coins: CoinsAPI;
  map: MapAPI;
  badges: BadgesAPI;
  notifications: NotificationsAPI;
  rover: RoverAPI;
  leaderboards: LeaderboardsAPI;
  clans: ClansAPI;
  blogs: BlogsAPI;
  friends: FriendsAPI;
  credits: CreditsAPI;
  redeem: RedeemAPI;
  settings: SettingsAPI;
  statzee: StatzeeAPI;

  private userInfo: UserInfo | null;
  private ready: Promise<void>;

  constructor(private onUserChanged: (user: UserInfo | null) => void) {
    this.userInfo = null;
    this.ready = this.initFirebase();
    this.flows = new FlowsAPI(this.callAPI);
    this.user = new UserAPI(this.callAPI);
    this.munzee = new MunzeeAPI(this.callAPI);
    this.coins = new CoinsAPI(this.callAPI);
    this.map = new MapAPI(this.callAPI, this.callMapAPI);
    this.badges = new BadgesAPI(this.callAPI);
    this.notifications = new NotificationsAPI(this.callAPI);
    this.rover = new RoverAPI(this.callAPI);
    this.leaderboards = new LeaderboardsAPI(this.callAPI);
    this.clans = new ClansAPI(this.callAPI);
    this.blogs = new BlogsAPI(this.callAPI);
    this.friends = new FriendsAPI(this.callAPI);
    this.credits = new CreditsAPI(this.callAPI);
    this.redeem = new RedeemAPI(this.callAPI);
    this.settings = new SettingsAPI(this.callAPI);
    this.statzee = new StatzeeAPI(this.callAPI);
  }

  private initFirebase = async () => {
    await new Promise<void>((resolve) => {
      const firebaseConfig = APP_CONFIG.FIREBASE;
      initializeApp(firebaseConfig);
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        console.log(
          `Firebase auth state changed (has current user: ${!!user})`
        );
        resolve();
      });
    });
    this.updateUserInfo();
  };

  private updateUserInfo = async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      const user_id = auth.currentUser.uid;
      const email = auth.currentUser.email || "";
      const response = await this.callAPI("user/", { user_id });
      this.userInfo = {
        username: response?.data?.username,
        email,
        uid: user_id,
        userId: response?.data?.user_id,
        userTypeId: response?.data?.user_type_id,
        avatar: response?.data?.avatar,
        premium: response?.data?.premium,
        premiumExpires: response?.data?.premium_expires,
        level: response?.data?.level,
        rank: response?.data?.rank,
        numberOfCaptures: response?.data?.number_of_captures,
        numberOfDeployments: response?.data?.number_of_deployments,
        numberOfUndeployments: response?.data?.number_of_undeployments,
        numberOfArchived: response?.data?.number_of_archived,
        numberOfBadges: response?.data?.number_of_badges,
        points: response?.data?.points,
        daysOld: response?.data?.days_old,
        titles: response?.data?.titles ?? [],
        clan: response?.data?.clan ?? {},
        maintenanceTeam: response?.data?.maintenance_team,
      };
    } else {
      this.userInfo = null;
    }
    this.onUserChanged(this.userInfo);
  };

  login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; username?: string }> => {
    await this.ready;
    await this.logout();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await this.updateUserInfo();
      return { success: true, username: this.userInfo?.username };
    } catch (e) {
      return {
        success: false,
        error: "either username or password are not valid",
      };
    }
  };

  logout = async (): Promise<{ success: boolean; error?: string }> => {
    await this.ready;
    const auth = getAuth();
    await signOut(auth);
    await this.updateUserInfo();
    return { success: true };
  };

  signup = async (
    email: string,
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await this.ready;
    await this.logout();
    let appToken = await this.callGetAppToken();
    if (appToken) {
      const params = {
        email,
        username,
        password,
      };
      let postData: string = `access_token=${encodeURIComponent(
        appToken
      )}&data=${encodeURIComponent(JSON.stringify(params))}`;
      const response = await fetch(APIURL + "signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: postData,
      });
      const jsonData = JSON.parse((await response.text()) || "{}");
      const created = jsonData?.data?.created;
      if (created === 0) {
        return { success: false, error: "" };
      } else if (created === undefined) {
        return { success: false };
      } else {
        return await this.login(email, password);
      }
    } else {
      return { success: false };
    }
  };

  private callGetAppToken = async (): Promise<string> => {
    const params: { [key: string]: any } = {
      client_id: CLIENTID,
      client_secret: CLIENTSECRET,
      grant_type: "client_credentials",
      version: 4,
    };
    const postData = Object.keys(params).reduce((accum, val, index) => {
      return (
        accum +
        (index === 0 ? "" : "&") +
        val +
        "=" +
        encodeURIComponent(params[val])
      );
    }, "");
    const response = await fetch(APIURL + "oauth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: postData,
    });
    const jsonData = JSON.parse((await response.text()) || "{}");
    return jsonData?.data?.token;
  };

  changeEmailOrPassword = async (params: {
    email?: string;
    password?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const functions = getFunctions();
    const userUpdateUserEmailOrPassword = httpsCallable(
      functions,
      "userUpdateUserEmailOrPassword"
    );
    const result = await userUpdateUserEmailOrPassword(params);
    const success = (result.data as any).success;
    if (success) {
      await this.updateUserInfo();
    }
    return { success };
  };

  getCurrentUserInfo = async (): Promise<UserInfo | null> => {
    return this.userInfo;
  };

  callAPI = async (
    endpoint: string,
    data: { [key: string]: any },
    method: "GET" | "POST" = "POST"
  ): Promise<any> => {
    await this.ready;
    data["language"] = "EN";
    data["version"] = 4.1;
    if (endpoint.indexOf("/") === 0) {
      endpoint = endpoint.substring(1);
    }
    let token = "";
    const auth = getAuth();
    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken();
    }
    let postData: string = `access_token=${encodeURIComponent(
      token
    )}&data=${encodeURIComponent(JSON.stringify(data))}`;
    const response = await fetch(
      APIURL +
        endpoint +
        (method === "GET" ? `?access_token=${encodeURIComponent(token)}` : ""),
      {
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: method === "POST" ? postData : undefined,
      }
    );
    const text = (await response.text()) || "{}";
    const jsonData = JSON.parse(text);
    return jsonData;
  };

  callMapAPI = async (data: { [key: string]: any }): Promise<any> => {
    await this.ready;
    const endpoint = "map/mapapi";
    const queryString = Object.keys(data || {}).reduce((accum, val, index) => {
      return (
        accum +
        (index === 0 ? "?" : "&") +
        val +
        "=" +
        encodeURIComponent((data || {})[val])
      );
    }, "");
    try {
      const response = await fetch(APIURL + endpoint + queryString);
      const text = await response.text();
      const json = text.substring("mapdata(".length, text.length - ");".length);
      return JSON.parse(json);
    } catch {
      return [];
    }
  };
}

export default Backend;
