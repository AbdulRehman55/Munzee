import { Munzee } from "./types";

export default class Map {
  constructor(
    private callAPI: (endpoint: string, params: { [key: string]: any }) => any,
    private callMapAPI: (params: { [key: string]: any }) => any
  ) {}

  mapBoundingBoxV4 = async (
    params: Readonly<{
      exclude: string;
      fields: string;
      total_limit: number;
      filters: string;
      clan_id: string;
      points: Readonly<{
        [boxId: string]: Readonly<{
          lat1: number;
          lng1: number;
          lat2: number;
          lng2: number;
          timestamp: number;
        }>;
      }>;
    }>
  ) => {
    const result: {
      data: ReadonlyArray<{
        key: string;
        munzees: ReadonlyArray<Munzee>;
        last_updated_at: number;
        count: number;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("map/boundingbox/v4/", params);
    return result?.data;
  };

  mapMapAPI = async (
    params: Readonly<{
      ex_cap: boolean;
      ex_own: boolean;
      special: boolean;
      rovers: boolean;
      clan_id: string;
      vacant: boolean;
      virt: boolean;
      phys: boolean;
      swappable: boolean;
      uncaptured: boolean;
      lat2: number;
      lat1: number;
      lon2: number;
      lon1: number;
      playergroup: string;
      forceflats: boolean;
      maptoken: string;
    }>
  ): Promise<
    ReadonlyArray<
      Readonly<{
        id: string;
        latitude: number | string;
        longitude: number | string;
        imageUrl: string;
        circle?: number;
      }>
    >
  > => {
    const result: ReadonlyArray<{
      munzee_id: string;
      name: string;
      user: string;
      type_id: string;
      lat: string;
      lon: string;
      proximity_radius_ft: number;
    }> = await this.callMapAPI(params);
    return result.map((r) => ({
      id: r.munzee_id,
      latitude: r.lat,
      longitude: r.lon,
      imageUrl: r.type_id,
      circle: (r.proximity_radius_ft || 0) / 3.281,
    }));
  };
}
