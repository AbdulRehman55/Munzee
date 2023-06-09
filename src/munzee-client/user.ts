import { userInfo } from "os";
import Backend from "../munzee-backend";
import { getAvatarUrl, getPinUrl } from "./utils";

type UserInfo = Readonly<{
  user_id: number;
  username: string;
  avatar: string;
}>;

type CaptureDeployListEntry = Readonly<{
  iconName: string;
  iconImg: string;
  captureMonth: string;
  iconLink: string;
  points: number;
  userName: string;
  avatar: string;
  userLink: string;
  deployedYear: string;
  numCaptures: number;
}>;

type SocialListEntry = Readonly<{
  avatar: string;
  code: string;
  creator_username: string;
  friendly_name: string;
  deployed_at: string;
  url: string;
  image: string;
}>;

type OwnSocialListEntry = Readonly<{
  code: string;
  friendly_name: string;
  deployed_at: string;
  url: string;
  image: string;
  deployed_at_unix: number;
  number_of_captures: number;
}>;

type SpecialsListEntry = Readonly<{
  name: string;
  logo: string;
  count: number;
}>;

type ArchivedListEntry = Readonly<{
  title: string;
  archivedAt: string;
  deployedAt: string;
  livedDays: number;
  numCaptures: number;
  lastCaptureAt?: string;
  lastCaptureBy?: string;
  points: number;
}>;

type MaintenanceListEntry = Readonly<{
  message: string;
  timeReported: string;
  timeCaptured?: string;
}>;

class User {
  private usernameInfoCache: { [username: string]: UserInfo };

  constructor(private backend: Backend) {
    this.usernameInfoCache = {};
  }

  getUsernameInfo = async (username: string): Promise<UserInfo | null> => {
    if (this.usernameInfoCache[username]) {
      return this.usernameInfoCache[username];
    }
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return null;
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.user.user({ user_id, username });
    if (result?.user_id) {
      this.usernameInfoCache[username] = result;
    }
    return result;
  };

  private getUserIdFromUsername = async (username?: string) => {
    if (username) {
      const forUserInfo = await this.getUsernameInfo(username);
      if (forUserInfo) {
        return forUserInfo.user_id;
      }
    }
  };

  getCaptures = async (
    page: number,
    forUsername?: string
  ): Promise<ReadonlyArray<CaptureDeployListEntry>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const user_id =
      (await this.getUserIdFromUsername(forUsername)) ||
      parseInt(user.uid + "", 10);
    const result = await this.backend.user.userCaptures({
      user_id,
      page,
    });
    return (
      result?.map((e) => ({
        iconName: e.friendly_name || "",
        iconImg: e.pin_icon,
        captureMonth: e.captured_at || "",
        iconLink: e.url || "",
        points: e.points || 0,
        userName: e.creator_username || "",
        avatar: getAvatarUrl(e.creator_user_id || 0),
        userLink: `/m/${e.creator_username}/`,
        deployedYear: e.deployed_at || "",
        numCaptures: e.number_of_captures || 0,
      })) || []
    );
  };

  getSocials = async (
    forUsername?: string
  ): Promise<ReadonlyArray<SocialListEntry>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const result = await this.backend.user.userSocials({
      user_id: parseInt(user?.uid + "", 10),
      username: forUsername || user.username,
    });
    return (
      result?.map((e) => ({
        avatar: getAvatarUrl(e.creator_user_id || 0),
        code: e.code || "",
        creator_username: e.creator_username || "",
        friendly_name: e.friendly_name || "",
        deployed_at: e.deployed_at || "",
        url: e.url || "",
        image: e.image || "",
      })) || []
    );
  };

  getSocialsOwn = async (
    forUsername?: string
  ): Promise<ReadonlyArray<OwnSocialListEntry>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const result = await this.backend.user.userSocialsOwn({
      username: forUsername || user.username,
    });
    return (
      result?.map((e) => ({
        code: e.code || "",
        friendly_name: e?.friendly_name || "",
        deployed_at: e?.deployed_at || "",
        deployed_at_unix: e?.deployed_at_unix || 0,
        number_of_captures: e?.number_of_captures || 0,
        url: e?.url || "",
        image: e?.image || "",
      })) || []
    );
  };

  getSpecials = async (): Promise<ReadonlyArray<SpecialsListEntry>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const result = await this.backend.user.userSpecials({
      user_id: parseInt(user?.uid + "", 10),
    });
    return (
      result?.map((e) => ({
        name: e.name || "",
        logo: getPinUrl(e.logo || ""),
        count: e.count || 0,
      })) || []
    );
  };

  getDeploys = async (
    page: number,
    forUsername?: string
  ): Promise<ReadonlyArray<CaptureDeployListEntry>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const user_id =
      (await this.getUserIdFromUsername(forUsername)) ||
      parseInt(user.uid + "", 10);
    const result = await this.backend.user.userDeploys({
      user_id,
      page,
    });
    return (
      result?.munzees.map((e) => ({
        iconName: e.friendly_name || "",
        iconImg: e.pin_icon,
        captureMonth: e.captured_at || "",
        iconLink: e.url || "",
        points: e.points || 0,
        userName: e.creator_username || "",
        avatar: getAvatarUrl(e.creator_user_id || 0),
        userLink: `/m/${e.creator_username}/`,
        deployedYear: e.deployed_at || "",
        numCaptures: e.number_of_captures || 0,
      })) || []
    );
  };

  getMaintenance = async (
    page: number,
    forUsername?: string
  ): Promise<
    Readonly<{
      maintenance: ReadonlyArray<MaintenanceListEntry>;
      softMaintenance: ReadonlyArray<MaintenanceListEntry>;
    }>
  > => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { maintenance: [], softMaintenance: [] };
    }
    const user_id =
      (await this.getUserIdFromUsername(forUsername)) ||
      parseInt(user.uid + "", 10);
    const maintenance =
      (await this.backend.user.userMaintenance({ page, user_id })) || [];
    const softMaintenance =
      (await this.backend.user.userMaintenanceSoft({ page, user_id })) || [];
    return {
      maintenance: maintenance.map((m) => ({
        message: "",
        timeReported: m.last_journal_entry_at || "",
        timeCaptured: m.last_captured_at || "",
      })),
      softMaintenance: softMaintenance.map((m) => ({
        message: "",
        timeReported: m.last_journal_entry_at || "",
        timeCaptured: m.last_captured_at || "",
      })),
    };
  };

  getArchived = async (
    page: number,
    forUsername?: string
  ): Promise<
    Readonly<{ munzees: ReadonlyArray<ArchivedListEntry>; hasMore: boolean }>
  > => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { hasMore: false, munzees: [] };
    }
    const user_id =
      (await this.getUserIdFromUsername(forUsername)) ||
      parseInt(user.uid + "", 10);
    const result = await this.backend.user.userArchived({ page, user_id });
    return {
      hasMore: !!result.has_more,
      munzees: result.munzees.map((m) => {
        const archivedAt = new Date(m.archived_at || 0);
        const deployedAt = new Date(m.deployed_at || 0);
        const livedDays = Math.ceil(
          ((archivedAt.getTime() - deployedAt.getTime()) / 1000) * 3600 * 24
        );
        return {
          title: m.friendly_name || "",
          archivedAt: archivedAt.toLocaleString(),
          deployedAt: deployedAt.toLocaleString(),
          livedDays,
          numCaptures: m.number_of_captures || 0,
          lastCaptureAt: new Date(m.last_captured_at || 0).toLocaleDateString(),
          lastCaptureBy: m.last_captured_by_id + "",
          points: m.points || 0,
        };
      }),
    };
  };

  getPhotoGallery = async (
    page: number,
    forUsername?: string
  ): Promise<
    Readonly<{
      hasMore: boolean;
      photos: ReadonlyArray<
        Readonly<{
          pic: string;
          large: string;
          time: string;
          location: string;
        }>
      >;
    }>
  > => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { hasMore: false, photos: [] };
    }
    const user_id =
      (await this.getUserIdFromUsername(forUsername)) ||
      parseInt(user.uid + "", 10);
    const result = await this.backend.user.userGallery({ page, user_id });
    return {
      hasMore: !!result.has_more,
      photos: result.photos.map((p) => ({
        pic: result.path_small + p.photo,
        large: result.path + p.photo,
        time: new Date(p.timestamp).toLocaleString(),
        location: p.munzee_data.friendly_name,
      })),
    };
  };

  getBlasts = async (): Promise<
    ReadonlyArray<
      Readonly<{
        blastCaptureUsed: string;
        numberOfCaptures: number;
        numberOfPoints: number;
      }>
    >
  > => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.user.userBlasts({ user_id });
    return result.map((b) => ({
      blastCaptureUsed: new Date(b.blasted_at).toLocaleString(),
      numberOfCaptures: b.total_captures,
      numberOfPoints: b.total_points,
    }));
  };

  getZeeqrew = async (): Promise<
    Readonly<{
      title: string;
      timeframe: string;
      zeeqrewRequirements: ReadonlyArray<
        Readonly<{
          name: string;
          status: string;
          errorContent: string;
        }>
      >;
      qrewRequirements: ReadonlyArray<
        Readonly<{
          name: string;
          status: string;
          errorContent: string;
        }>
      >;
    }>
  > => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return {
        title: "",
        timeframe: "",
        zeeqrewRequirements: [],
        qrewRequirements: [],
      };
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.user.userZeeqrew({ user_id });
    const processStatus = (v: string | boolean) => ({
      status: v === true ? "Completed" : v + "",
      errorContent: v !== true ? v + "" : "",
    });
    return {
      title: result.title,
      timeframe: result.timeframe,
      zeeqrewRequirements: [
        {
          name: "Premium requirement",
          ...processStatus(result.zeeqrew_requirements.premium_requirement),
        },
        {
          name: "Lifetime physical deploy requirement",
          ...processStatus(
            result.zeeqrew_requirements.lifetime_physical_deploy_requirement
          ),
        },
        {
          name: "Lifetime score requirement",
          ...processStatus(
            result.zeeqrew_requirements.lifetime_score_requirement
          ),
        },
        {
          name: "Timeframe capture requirement",
          ...processStatus(
            result.zeeqrew_requirements.timeframe_capture_requirement
          ),
        },
        {
          name: "Timeframe deploy requirement",
          ...processStatus(
            result.zeeqrew_requirements.timeframe_deploy_requirement
          ),
        },
      ],
      qrewRequirements: [
        {
          name: "Premium requirement",
          ...processStatus(result.qrew_requirements.premium_requirement),
        },
        {
          name: "Lifetime deploy requirement:",
          ...processStatus(
            result.qrew_requirements.lifetime_deploy_requirement
          ),
        },
        {
          name: "Lifetime capture requirement",
          ...processStatus(
            result.qrew_requirements.lifetime_capture_requirement
          ),
        },
        {
          name: "Timeframe capture requirement",
          ...processStatus(
            result.qrew_requirements.timeframe_capture_requirement
          ),
        },
        {
          name: "Timeframe deploy requirement",
          ...processStatus(
            result.qrew_requirements.timeframe_deploy_requirement
          ),
        },
      ],
    };
  };
}

export default User;
