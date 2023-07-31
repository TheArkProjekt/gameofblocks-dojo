"use client";

import React from "react";
import SimpleBar from "simplebar-react";

import Block from "~/components/kingdom/Block";
import { generateMap } from "~/components/kingdom/utils/generate";

const Kingdom = () => {
  const map = generateMap();
  return (
    <SimpleBar style={{ height: "100vh" }}>
      <div
        className="relative"
        style={{
          height: map?.grid.pixelHeight,
          width: map?.grid.pixelWidth,
        }}
      >
        <div
          style={{
            height: map?.grid.pixelHeight,
            width: map?.grid.pixelWidth,
          }}
          className="absolute"
        >
          {map?.jsonGrid.coordinates.map((hex: any) => {
            return (
              <Block key={`${hex.q}-${hex.r}`} hex={hex} type={hex.type} />
            );
          })}
        </div>
      </div>
    </SimpleBar>
  );
};

export default Kingdom;
