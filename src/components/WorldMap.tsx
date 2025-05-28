"use client";

import { world_map as geoData } from "@/constants/world_map";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

type WorldMapProps = {
  mapData: {
    countryName: string;
    coordinates: number[];
    color: string;
  }[];
};

type GeographyFeature = {
  rsmKey: string;
  properties: {
    name: string;
  };
};

const WorldMap = ({ mapData }: WorldMapProps) => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] overflow-hidden">
      <ComposableMap
        className="w-full h-full"
        projectionConfig={{
          scale: 180,
        }}
      >
        <ZoomableGroup center={[5, 10]} minZoom={1} maxZoom={8}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo: GeographyFeature) => {
                const countryName = geo.properties.name;
                const selectedCountry = mapData.find(
                  (data) => data.countryName === countryName
                );

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={selectedCountry ? selectedCountry.color : "#D6D6DA"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: selectedCountry
                          ? selectedCountry.color
                          : "#A0A0A0",
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {mapData.map(
            ({ countryName, coordinates, color }) =>
              coordinates.length > 1 && (
                <Marker
                  key={countryName}
                  coordinates={[coordinates[1], coordinates[0]]}
                >
                  <circle r={5} fill={color} stroke="#fff" strokeWidth={2} />
                </Marker>
              )
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
