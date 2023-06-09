import React from "react";
import maplibregl, { LngLat, Map, Marker } from "maplibre-gl";
import MapSearchBox from "./search";
import { encode } from "ngeohash";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./styles.scss";
import {bezier, Position, point, bezierSpline, lineString, midpoint } from '@turf/turf'

// (maplibregl as any).accessToken =
//   "pk.eyJ1IjoiZnJlZXpldGFnIiwiYSI6ImNpeHM0c21pZDBheGczM205anlzYnA1MXEifQ.TxALnIxu2W324dOK4Xu2HQ";

export type Pin = Readonly<{
  id: string;
  latitude: number | string;
  longitude: number | string;
  imageUrl: string;
  circle?: number;
  color?: string;
  content?: HTMLAllCollection | string;
}>;

function getPerpendicularPoint(point1: Position, point2: Position, angle: number) {
  let [x1, y1] = point1;
  let [x2, y2] = point2;
  let m = (y2 - y1) / (x2 -  x1);
  let angle_rad = Math.tan(angle * Math.PI / 180);
  let new_y = (angle_rad * (x2 - x1)) + y1;
  let new_x = x1 - (m * ( new_y - y1));
  return [new_x, new_y];
}

export default function MapComponent({
  pos,
  zoom,
  view,
  pins,
  onMapBounds,
  searchInput,
  fullscreenOff,
  geolocationOff,
  style,
  showLocationPicker,
  onLocationPicked,
}: {
  pos: { latitude: number; longitude: number };
  zoom: number;
  view: "street" | "satellite";
  pins: ReadonlyArray<Pin>;
  searchInput?: boolean;
  fullscreenOff?: boolean;
  geolocationOff?: boolean;
  style?: any,
  onMapBounds?: (bounds: {
    north: number;
    east: number;
    south: number;
    west: number;
  }) => void;
  showLocationPicker?: boolean;
  onLocationPicked?: (latitude: number, longitude: number) => void;
}) {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<Map | null>(null);
  const [markers] = React.useState<{ [id: string]: Marker }>({});
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [selectedPin, setSelectedPin] = React.useState<Pin | null>(null);
  const [dragPin, setDragPin] = React.useState<Marker>();

  const handleMarkerClick = (pin: Pin) => {
    if (map.current) {
      setSelectedPin(pin);
    }
  };

  const handleGeocoderResult = (result: any) => {
    if (map?.current && result?.result?.center) {
      const [longitude, latitude] = result.result.center;
      map.current.setCenter([longitude, latitude]);
      map.current.setZoom(10);
    }
  };

  const mapBoundsUpdated = React.useCallback(() => {
    if (!map.current || !onMapBounds) {
      return;
    }
    const b = map.current.getBounds();
    const ne = b.getNorthEast();
    const sw = b.getSouthWest();
    onMapBounds({
      north: ne.lat,
      east: ne.lng,
      south: sw.lat,
      west: sw.lng,
    });
  }, [map.current, onMapBounds]);

  const loadStateChanged = React.useCallback(() => {
    if (!map.current || !map.current.isStyleLoaded() || mapLoaded) {
      return;
    }
    setMapLoaded(true);
  }, [map.current]);

  React.useEffect(() => {
    if (map.current && selectedPin) {
      // Create a Popup instance for the selected pin
      const zoom = 16;
      const code = encode(selectedPin.longitude, selectedPin.latitude, zoom);
      const url = `map/` + code + "/" + zoom;
      const popup = new maplibregl.Popup({
        closeButton: true,
        anchor: "bottom",
        offset: 35,
      })
        .setLngLat([
          parseFloat("" + selectedPin.longitude),
          parseFloat("" + selectedPin.latitude),
        ])
        .setHTML(
          `
          <div class="popover-content">
            <p><a href=${url}>View This Garden</a></p>
          </div>
        `
        )
        .addTo(map.current);
      // Close other popovers
      for (const id in markers) {
        if (id !== selectedPin.id) {
          markers[id].getPopup()?.remove();
        }
      }
      markers[selectedPin.id].setPopup(popup);
      // Wait for the next render cycle before adding the popup to the marker
      setTimeout(() => {
        if (map.current && selectedPin) {
          markers[selectedPin.id].setPopup(popup).togglePopup();
        }
      }, 0);
    }
  }, [selectedPin, map.current]);

  React.useEffect(() => {
    if (!mapContainer.current) {
      return;
    }
    const markerIds = Object.keys(markers);
    for (const id of markerIds) {
      markers[id].remove();
      delete markers[id];
    }
    dragPin?.remove();
    setDragPin(undefined);
    setMapLoaded(false);
    const styles = {
      street:
        "https://api.maptiler.com/maps/streets-v2/style.json?key=KCxtVmj0ipm3YtyAscCN",
      satellite:
        "https://api.maptiler.com/maps/hybrid/style.json?key=KCxtVmj0ipm3YtyAscCN",
      // "https://api.mapbox.com/styles/freezetag/cjmquygzy4dn62rn74eby5oiq",
    };
    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: styles[view] || styles.street,
      center: [pos.longitude, pos.latitude],
      zoom: zoom,
      attributionControl: false,
      minZoom: 3,
      maxZoom: 20,
    });
    m.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 80,
      }),
      "bottom-right"
    );
    m.addControl(
      new maplibregl.NavigationControl({
        showZoom: true,
        showCompass: true,
      }),
      "top-right"
    );

    if ( !fullscreenOff ){
      m.addControl(new maplibregl.FullscreenControl({}), "top-right");
    }

    if ( !geolocationOff ){
      m.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        "top-right"
      );
    }
    m.on("data", loadStateChanged);
    m.on("styledata", loadStateChanged);
    m.on("sourcedata", loadStateChanged);
    m.on("zoomend", mapBoundsUpdated);
    m.on("dragend", mapBoundsUpdated);
    m.on("zoom", mapBoundsUpdated);
    m.on("zoomstart", mapBoundsUpdated);
    m.on("move", mapBoundsUpdated);
    m.on("movestart", mapBoundsUpdated);
    m.on("drag", mapBoundsUpdated);
    m.on("dragstart", mapBoundsUpdated);
    map.current = m;
    mapBoundsUpdated();
    return () => {
      m.off("data", loadStateChanged);
      m.off("styledata", loadStateChanged);
      m.off("sourcedata", loadStateChanged);
      m.off("zoomend", mapBoundsUpdated);
      m.off("dragend", mapBoundsUpdated);
      m.off("zoom", mapBoundsUpdated);
      m.off("zoomstart", mapBoundsUpdated);
      m.off("move", mapBoundsUpdated);
      m.off("movestart", mapBoundsUpdated);
      m.off("drag", mapBoundsUpdated);
      m.off("dragstart", mapBoundsUpdated);
    };
  }, [mapContainer.current, view, mapBoundsUpdated]);

  React.useEffect(() => {
    if (!map.current) {
      return;
    }
    const unused = Object.keys(markers);
    for (const pin of pins) {
      const i = unused.indexOf(pin.id);
      if (i >= 0) {
        unused.splice(i, 1);
        continue;
      }
      const el = document.createElement("div");
      el.style.backgroundImage = `url(${pin.imageUrl})`;
      el.style.width = "40px";
      el.style.height = "40px";
      el.style.backgroundSize = "40px 40px";
      el.style.cursor = "pointer";
      if ( pin.content ){
        el.innerHTML = pin.content.toString();
      }
      const m = new maplibregl.Marker(el)
        .setLngLat([
          parseFloat("" + pin.longitude),
          parseFloat("" + pin.latitude),
        ])
        .addTo(map.current);
      m.getElement()?.addEventListener("click", () => handleMarkerClick(pin));
      m.setOffset([0, -23]);
      markers[pin.id] = m;
    }
    for (const id of unused) {
      markers[id]?.remove();
      delete markers[id];
    }
  }, [pins, map.current]);

  React.useEffect(() => {
    if (!map.current) {
      return;
    }
    if (showLocationPicker && onLocationPicked) {
      if (!dragPin) {
        const pin = new maplibregl.Marker({ color: "red" })
          .setLngLat([pos.longitude, pos.latitude])
          .addTo(map.current);
        pin.setDraggable(true);
        pin.on("dragend", () => {
          const lngLat = pin?.getLngLat();
          onLocationPicked(lngLat?.lat || 0, lngLat?.lng || 0);
        });
        // setDragPin(pin);
      } else {
        // dragPin?.setLngLat([pos.longitude, pos.latitude]);
      }
    }
  }, [
    map.current,
    showLocationPicker,
    onLocationPicked,
    pos.latitude,
    pos.longitude,
  ]);

  React.useEffect(() => {
    if (!map.current?.isStyleLoaded()) {
      return;
    }
    if (map.current.getLayer("circles")) {
      map.current.removeLayer("circles");
    }
    if (map.current.getSource("circles")) {
      map.current.removeSource("circles");
    }
    const points = 64;
    const features = pins
      .filter((p) => p.circle || 0 > 0)
      .map((p) => {
        const km = (p.circle || 0) / 1000;
        var coords = {
          latitude: parseFloat("" + p.latitude),
          longitude: parseFloat("" + p.longitude),
        };
        const ret = [];
        const distanceX =
          km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
        const distanceY = km / 110.574;
        let theta, x, y;
        for (let i = 0; i < points; i++) {
          theta = (i / points) * (2 * Math.PI);
          x = distanceX * Math.cos(theta);
          y = distanceY * Math.sin(theta);
          ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]);
        return {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [ret],
          },
        };
      });
    map.current.addSource("circles", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    });
    map.current.addLayer({
      id: "circles",
      type: "fill",
      source: "circles",
      layout: {},
      paint: {
        "fill-color": "red",
        "fill-opacity": 0.25,
      },
    });

    pins.forEach((pin, pinKey) => {
      
      if ( (pins.length - 1) != pinKey ){
        
        const nextPin = pins[pinKey + 1];
        const point1_longitude = parseFloat(pin.longitude.toString());
        const point1_latitude = parseFloat(pin.latitude.toString());
        const point2_longitude = parseFloat(nextPin.longitude.toString());
        const point2_latitude = parseFloat(nextPin.latitude.toString());
        const pinId = pin.id;
        const point1 = point([point1_longitude, point1_latitude]);
        const point2 = point([point2_longitude, point2_latitude]);
        const midPoint = midpoint(point1, point2);
        const newMidPoint = getPerpendicularPoint(midPoint.geometry.coordinates, point1.geometry.coordinates, 1); // 18

        var line = lineString([
          point1.geometry.coordinates,
          newMidPoint,
          point2.geometry.coordinates
        ]);

        var curved = bezierSpline(line, { resolution: 20000, sharpness:1});
        //var curved = bezier(line, { resolution: 20000, sharpness:1})

        if(map.current != null) {
          if(!map.current.getLayer(pinId)) {
            map.current.addSource(pinId, {
              type: "geojson",
              data: curved
            });
            map.current.addLayer({
              id: pinId,
              type: "line",
              source: pinId,
              layout: {
                "line-join": "round",
                "line-cap": "round"
              },
              paint: {
                "line-color": "#016930",
                "line-width": 2
              }
            })
          }
        }
      }
    })

  }, [pins, map.current, mapLoaded]);

  React.useEffect(() => {
    if (map.current) {
      map.current.setCenter([pos.longitude, pos.latitude]);
    }
  }, [pos]);

  React.useEffect(() => {
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  return (
    <div className="map-wrap" style={style ? style : {}}>
      <div ref={mapContainer} className="map" />
      {searchInput && (
        <MapSearchBox
          map={map.current}
          handleGeocoderResult={handleGeocoderResult}
        />
      )}
    </div>
  );
}
