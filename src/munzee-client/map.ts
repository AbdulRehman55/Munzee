import Backend from "../munzee-backend";

type Filters = Readonly<{
  excludeCaptured: boolean;
  excludeOwn: boolean;
  onlySpecial: boolean;
  onlyRovers: boolean;
  onlyVacant: boolean;
  onlyVirtual: boolean;
  onlyPhysical: boolean;
  onlySwappable: boolean;
  onlyUncaptured: boolean;
  showCircles: boolean;
}>;

type Pin = Readonly<{
  id: string;
  latitude: number | string;
  longitude: number | string;
  imageUrl: string;
  circle?: number;
  color?: string;
}>;

type Bounds = Readonly<{
  north: number;
  east: number;
  south: number;
  west: number;
}>;

class Map {
  filters: Filters;

  private bounds: Bounds | null;
  private pins: ReadonlyArray<Pin>;
  private onPinsCallback: ((pins: ReadonlyArray<Pin>) => void) | null;
  private fetchingPins: boolean;

  constructor(private backend: Backend) {
    this.filters = {
      excludeCaptured: false,
      excludeOwn: false,
      onlySpecial: false,
      onlyRovers: false,
      onlyVacant: false,
      onlyVirtual: false,
      onlyPhysical: false,
      onlySwappable: false,
      onlyUncaptured: false,
      showCircles: false,
    };
    this.bounds = null;
    this.pins = [];
    this.onPinsCallback = null;
    this.fetchingPins = false;
  }

  onPins = (callback: ((pins: ReadonlyArray<Pin>) => void) | null) => {
    this.onPinsCallback = callback;
    this.callOnPins();
  };

  private callOnPins = () => {
    if (this.onPinsCallback) {
      this.onPinsCallback(
        this.pins.map((p) => ({
          ...p,
          circle: this.filters.showCircles ? p.circle : 0,
        }))
      );
    }
  };

  setBounds = (bounds: Bounds) => {
    this.bounds = bounds;
    this.fetchPins();
  };

  getFilterArray = () => {
    return Object.keys(this.filters).map((k) => ({
      id: k,
      isActive: this.filters[k as keyof Filters],
    }));
  };

  setFilters = (filters: Partial<Filters>) => {
    const initial = JSON.stringify(this.filters);
    this.filters = { ...this.filters, ...filters };
    const final = JSON.stringify(this.filters);
    if (initial !== final) {
      this.fetchPins();
    }
  };

  private fetchPins = async () => {
    if (this.fetchingPins || !this.bounds) {
      return;
    }
    const bounds = { ...this.bounds };
    this.fetchingPins = true;
    const result = await this.backend.map.mapMapAPI({
      ex_cap: this.filters.excludeCaptured || false,
      ex_own: this.filters.excludeOwn || false,
      special: this.filters.onlySpecial || false,
      rovers: this.filters.onlyRovers || false,
      clan_id: "",
      vacant: this.filters.onlyVacant || false,
      virt: this.filters.onlyVirtual || false,
      phys: this.filters.onlyPhysical || false,
      swappable: this.filters.onlySwappable || false,
      uncaptured: this.filters.onlyUncaptured || false,
      lat2: bounds.north,
      lat1: bounds.south,
      lon2: bounds.east,
      lon1: bounds.west,
      playergroup: "",
      forceflats: false,
      maptoken: "idontknow",
    });
    this.pins = result;
    this.callOnPins();
    await new Promise((resolve) => setTimeout(resolve, 500)); // <- throttle
    this.fetchingPins = false;
    if (JSON.stringify(bounds) !== JSON.stringify(this.bounds)) {
      this.fetchPins();
    }
  };
}

export default Map;

//
// TODO: move this hard coded data into the server side
//

const mapDrawCircles = {
  circleDefaultSmall: {
    // 0
    enabled: false,
    radius: 15.5,
    color: "#ff0000",
  },
  circleDefaultBig: {
    // other
    enabled: false,
    radius: 46,
    color: "#ff0000",
  },
  circleMotelBig: {
    enabled: false,
    radius: 230,
    color: "#FF9700",
  },
  circleMotelSmall: {
    enabled: false,
    radius: 154,
    color: "#FF9700",
  },
  circleHotelBig: {
    enabled: false,
    radius: 611,
    color: "#FF9700",
  },
  circleHotelSmall: {
    //like circleMotelSmall
    enabled: false,
    radius: 154,
    color: "#FF9700",
  },
  circleResortBig: {
    enabled: false,
    radius: 1068,
    color: "#8A00FF",
  },
  circleResortSmall: {
    enabled: false,
    radius: 154,
    color: "#8A00FF",
  },
  circleTimeShare970: {
    enabled: false,
    radius: 611,
    color: "#00ffc0",
  },
  circleTimeShare70: {
    enabled: false,
    radius: 154,
    color: "#00ffc0",
  },
  circleTimeShare170: {
    enabled: false,
    radius: 154,
    color: "#00ffc0",
  },
  circleTimeShare470: {
    enabled: false,
    radius: 154,
    color: "#00ffc0",
  },
  circleCondo2183: {
    enabled: false,
    radius: 764,
    color: "#00ff99",
  },
  circleCondo470: {
    enabled: false,
    radius: 154,
    color: "#00ff99",
  },
  circleTreehouse: {
    enabled: false,
    radius: 306,
    color: "#8A6033",
  },
  circleSkyland: {
    enabled: false,
    radius: 1222,
    color: "#CE3E80",
  },
  circleAirMystery: {
    enabled: false,
    radius: 92,
    color: "#8A0033",
  },
  circleSirPrizewheel: {
    enabled: false,
    radius: 92,
    color: "#59A4F8",
  },
  circleFlatLouBig: {
    //1338
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatLouSmall: {
    //1338
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatHammockBig: {
    //1581
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatHammockSmall: {
    //1581
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatRobBig: {
    //353
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatRobSmall: {
    //353
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatMattBig: {
    //1015  must render with circleDefaulBig
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatMattSmall: {
    //1015  must render with circleDefaulSmall
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatDHSBig: {
    //2903
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatDHSSmall: {
    //2903
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatDiscBig: {
    //2904
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatDiscSmall: {
    //2904
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatFlashlightBig: {
    //2905
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatFlashlightSmall: {
    //2905
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatTypewriterBig: {
    //2906
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatTypewriterSmall: {
    //2906
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatMurrayBig: {
    //2907
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatMurraySmall: {
    //2907
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatRumBig: {
    //2908
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatRumSmall: {
    //2908
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatCatsBig: {
    //2909
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatCatsSmall: {
    //2909
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleFlatVanBig: {
    //2910
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleFlatVanSmall: {
    //2910
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
  circleTemporaryVirtualBig: {
    //1245
    enabled: false,
    radius: 46,
    color: "#FF0000",
  },
  circleTemporaryVirtualSmall: {
    //1245
    enabled: false,
    radius: 15.5,
    color: "#FF0000",
  },
};
