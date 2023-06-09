import React, { useRef, useEffect } from "react";
import { Map } from "maplibre-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./styles.scss";

interface Iprops {
  map: Map | null;
  handleGeocoderResult: (result: any) => void;
}
const MapSearchBox = ({ map, handleGeocoderResult }: Iprops) => {
  const geocoderRef = useRef<any>(null);
  const geocoderContainer = useRef<HTMLDivElement>(null);

  const handleClearSearch = () => {
    if (geocoderRef.current) {
      const inputElement = geocoderRef.current._inputEl;
      if (inputElement) {
        inputElement.value = "";
      }
    }
  };
  useEffect(() => {
    if (!map) return;
    const geocoder = new MapboxGeocoder({
      accessToken:
        "pk.eyJ1IjoiZnJlZXpldGFnIiwiYSI6ImNpeHM0c21pZDBheGczM205anlzYnA1MXEifQ.TxALnIxu2W324dOK4Xu2HQ",
      mapboxgl: mapboxgl,
      marker: false, // Disable the default marker
      clearAndBlurOnEsc: true,
    });
    geocoder.on("result", handleGeocoderResult);
    if (geocoderContainer.current && !geocoderRef.current && map) {
      geocoderRef.current = geocoder;
      geocoderContainer.current?.appendChild(geocoderRef.current.onAdd(map));
    }
    const geocoderInputContainer = geocoderContainer.current?.querySelector(
      ".mapboxgl-ctrl-geocoder input.mapboxgl-ctrl-geocoder--input"
    ) as HTMLElement;
    const nextSibling = geocoderInputContainer?.nextSibling;
    if (
      geocoderInputContainer &&
      nextSibling instanceof Element &&
      !nextSibling.classList.contains("geocoder-clear-button-container")
    ) {
      const clearButton = document.createElement("button");
      clearButton.className = "geocoder-clear-button";
      clearButton.innerHTML = "&#x2715;"; //  for the multiplication symbol
      clearButton.addEventListener("click", handleClearSearch);
      const clearButtonContainer = document.createElement("div");
      clearButtonContainer.className = "geocoder-clear-button-container";
      clearButtonContainer.appendChild(clearButton);
      geocoderInputContainer.parentNode?.insertBefore(
        clearButtonContainer,
        geocoderInputContainer.nextSibling
      );
    }
  }, [map]);
  return (
    <div className="controls">
      <div ref={geocoderContainer} className="geocoder-container" />
      <button className="btn locate-me">Locate me</button>
    </div>
  );
};

export default MapSearchBox;
