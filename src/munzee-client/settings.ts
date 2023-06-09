import Backend from "../munzee-backend";

type SettingsType = Readonly<{
  email?: string;
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

class Settings {
  constructor(private backend: Backend) {}

  getSettings = async (): Promise<SettingsType> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return {};
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.settings.userSettings({
      user_id,
    });
    return result || {};
  };

  updateSettings = async (
    settings: Partial<SettingsType>
  ): Promise<{ success: boolean; error?: string }> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { success: false };
    }
    let emailChanged = false;
    if (settings.email && settings.email !== user.email) {
      const emailChangeResult = await this.backend.changeEmailOrPassword({
        email: settings.email,
      });
      if (!emailChangeResult.success) {
        return {
          success: false,
          error: `Could not use ${settings.email} as the email address.`,
        };
      } else {
        emailChanged = true;
      }
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.settings.userSettings({
      user_id,
      update: true,
      ...settings,
    });
    if (emailChanged) {
      await this.backend.logout();
    }
    return { success: true };
  };

  changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { success: false, error: "Not logged in." };
    }
    await this.backend.login(user.email, oldPassword);
    const changeResult = await this.backend.changeEmailOrPassword({
      password: newPassword,
    });
    const loginResult = await this.backend.login(user.email, newPassword);
    return {
      success: changeResult.success && loginResult.success,
      error: changeResult.error || loginResult.error,
    };
  };

  changeAvatar = async (
    dataurl: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await this.backend.settings.userAvatarNew({
      image: dataurl,
    });
    return { success: !!result.success, error: result.message };
  };

  changeUsername = async (
    username: string
  ): Promise<{ success: boolean; error?: string }> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { success: false };
    }
    const user_id = parseInt(user.uid + "", 10);
    const result = await this.backend.settings.userUsernameChange({
      user_id,
      new_username: username,
    });
    return { success: !!result.changed };
  };
}

export default Settings;
