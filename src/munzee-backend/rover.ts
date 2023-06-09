import { Rover } from "./types";

type RoverFeedEntry = Readonly<{
  answers: any;
  capture_type_id: number;
  created_at: string;
  latitude: number;
  longitude: number;
  log_id: number;
  log_type: number;
  munzee_id: number;
  munzee_url: string;
  pin_icon: string;
  points: number;
  special: any;
  text: string;
  user_id: number;
  userhash: string;
  username: string;
}>;

export default class RoverAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  rover = async (params: Readonly<{ rover_id: number }>) => {
    const result: {
      data: Rover;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/", params);
    return result?.data;
  };

  roverFeed = async (params: Readonly<{ rover_id: number; page: number }>) => {
    const result: {
      data: Readonly<{
        feed: ReadonlyArray<RoverFeedEntry>;
        last_page: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/feed/", params);
    return result?.data;
  };

  roverUsers = async (params: Readonly<{ rover_id: number }>) => {
    const result: {
      data: Readonly<{
        [id: number]: Readonly<{
          user_id: number;
          username: string;
        }>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/users/", params);
    return result?.data;
  };

  roverEdit = async (
    params: Readonly<{ rover_id: number; name: string; description: string }>
  ) => {
    const result: {
      data: unknown;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/edit/", params);
    return result?.data;
  };

  roverResetOwner = async (params: Readonly<{ rover_id: number }>) => {
    const result: {
      data: unknown;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/reset/owner/", params);
    return result?.data;
  };

  roverResetLastMunzee = async (params: Readonly<{ rover_id: number }>) => {
    const result: {
      data: unknown;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/reset/last_munzee/", params);
    return result?.data;
  };

  munzeeRovers = async (params: Readonly<{ munzee_id: number }>) => {
    const result: {
      data: ReadonlyArray<Rover>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("munzee/rovers/", params);
    return result?.data;
  };

  userKennel = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: Readonly<{
        at_player: ReadonlyArray<Rover>;
        own: ReadonlyArray<Rover>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/kennel/", params);
    return result?.data;
  };
  userKennelTransported = async (
    params: Readonly<{ user_id: number; page: number }>
  ) => {
    const result: {
      data: Readonly<{
        rovers: ReadonlyArray<Rover>;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/kennel/transported", params);
    return result?.data;
  };
  roverFetch = async (
    params: Readonly<{ rover_id: number; latitude: number; longitude: number }>
  ) => {
    const result: {
      data: Readonly<{
        rover_type: string;
        retrieved: number;
        error: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/fetch/", params);
    return result?.data;
  };

  roverFetchAll = async (
    params: Readonly<{ rover_id: number; latitude: number; longitude: number }>
  ) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          rover_type: string;
          retrieved: number;
          error: string;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/fetch/all/", params);
    return result?.data;
  };

  roverDrop = async (
    params: Readonly<{
      munzee_id: number;
      rover_id: number;
      latitude: number;
      longitude: number;
    }>
  ) => {
    const result: {
      data: Readonly<{
        rover_type: string;
        error: string;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/drop/", params);
    return result?.data;
  };

  roverDropAll = async (
    params: Readonly<{ munzee_id: number; latitude: number; longitude: number }>
  ) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          error: string;
          dropped: number;
          rover_id: number;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("rover/drop/all/", params);
    return result?.data;
  };
}
