import { Entries, Munzee, Photos, MunzeeLog, LatestCaps, MunzeeRooms, MunzeeIndicator } from "./types";

type MunzeeHome = Readonly<{
  latitude?: string;
  longitude?: string;
}>;

export default class MunzeeAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number },
      method?: "GET" | "POST"
    ) => any
  ) {}

  create = async (
    params: Readonly<{
      username?: string;
      notes?: string;
      friendly_name?: string;
      latitude?: number;
      longitude?: number;
      group_id?: number;
      accuracy?: number;
    }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/create", params);
    return result?.data;
  };

  capturedTypeCount = async (
    params: Readonly<{
      [type_ids: string]: string | number;
    }>
  ) => {
    const result: {
      data: Readonly<{
        [key: number]: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/capturedtypecount/multi", params);
    return result?.data;
  };

  getGardensData = async (
    params: Readonly<{
      user_id: number;
    }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/gardens/", params, "GET");
    return result?.data;
  };

  getMunzee = async (params: Readonly<{ url: string; username?: string }>) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/", params);
    return result?.data;
  };

  updateMunzee = async (
    params: Readonly<{
      username: string;
      munzee_id: number;
      notes?: string;
      friendly_name?: string;
      latitude?: number;
      longitude?: number;
      deployed?: number;
    }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/update", params);
    return result?.data;
  };

  massupdate = async (
    params: Readonly<{
      capture_type_id: number;
      friendly_name: string;
      notes?: string;
    }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/massupdate", params);
    return result?.data;
  };

  genericCodeAdd = async (
    params: Readonly<{ username: string; munzee_id: number; generic: string }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/generic/add", params);
    return result?.data;
  };

  swapMunzee = async (
    params: Readonly<{ munzee_id: number; url_new: string }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/swap", params);
    return result?.data;
  };

  archiveMunzee = async (
    params: Readonly<{ username: string; munzee_id: number }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/archive/", params);
    return result?.data;
  };

  deployMunzee = async (
    params: Readonly<{ username: string; munzee_id: number }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/deploy/", params);
    return result?.data;
  };

  undeployMunzee = async (
    params: Readonly<{ username: string; munzee_id: number }>
  ) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/undeploy/", params);
    return result?.data;
  };

  closeTrailMunzee = async (params: Readonly<{ trail_id: number }>) => {
    const result: {
      data: Munzee;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/trails/close/", params);
    return result?.data;
  };

  homeMunzee = async (params: Readonly<{ munzee_id: string }>) => {
    const result: {
      data: MunzeeHome;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/home/", params);
    return result?.data;
  };

  convertMunzee = async (
    params: Readonly<{ username: string; munzee_id: number; type?: string }>
  ) => {
    const result: {
      data: Readonly<any>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/convert/", params);
    return result?.data;
  };

  trailOpenMunzee = async (params: Readonly<{ type?: number }>) => {
    const result: {
      data: Readonly<any>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/trails/open/", params);
    return result?.data;
  };

  logs = async (params: Readonly<{ username: string, munzee_id: string, }>) => {
    const result: {
      data: ReadonlyMap<string, MunzeeLog>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/logs/", params);
    return result?.data;
  };

  secret = async (params: Readonly<{  munzee_id: string }>) => {
    const result: {
      data: string;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/secret/", params);
    return result?.data;
  };

  rooms = async (params: Readonly<{  motel_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, MunzeeRooms>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/rooms/", params);
    return result?.data;
  };

  roomsHotel = async (params: Readonly<{  hotel_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, MunzeeRooms>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/rooms/hotel/", params);
    return result?.data;
  };

  roomsTimeshare = async (params: Readonly<{  hotel_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, MunzeeRooms>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/rooms/timeshare/", params);
    return result?.data;
  };

  roomsCondo = async (params: Readonly<{  hotel_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, MunzeeRooms>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/rooms/condo/", params);
    return result?.data;
  };

  roomsResort = async (params: Readonly<{  resort_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, MunzeeRooms>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/rooms/resort/", params);
    return result?.data;
  };

  capturesLatestMany = async (params: Readonly<{  munzee_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, LatestCaps>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/captures/latest/many/", params);
    return result?.data;
  };

  munzeeIndicator = async (params: Readonly<{  munzee_id: number }>) => {
    const result: {
      data: ReadonlyMap<string, MunzeeIndicator>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/indicator/", params);
    return result?.data;
  };

  

  magnetize = async (
    params: Readonly<{ type: number, munzee_id: number }>
  ) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
        magnet_type?: number;
        expires_at?: number;
        munzee_data?: Munzee;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/magnetize/", params);
    return result?.data;
  }; 

  munzeeNudge = async (params: Readonly<{  munzee_id: number }>) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/nudge/", params);
    return result?.data;
  };

  munzeeEvolutionReset = async (params: Readonly<{  munzee_id: number }>) => {
    const result: {
      data: Readonly<{
        success: number;
        message: string;
        munzee_data?: Munzee;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/evolution/reset/", params);
    return result?.data;
  };
  
  
  
}
