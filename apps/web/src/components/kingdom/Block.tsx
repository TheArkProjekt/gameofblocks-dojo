import React from "react";

import { HEX_SIZE } from "~/components/kingdom/constants";

const colors = {
  WATER: "water-500",
  EARTH: "earth-500",
  WOOD: "wood-500",
  ARCANE: "arcane-600",
  METAL: "metal-600",
  DEEP_WATER: "pearl-950",
};

const stroke = {
  WATER: "water-400",
  EARTH: "earth-400",
  WOOD: "wood-400",
  ARCANE: "arcane-500",
  METAL: "metal-500",
  DEEP_WATER: "pearl-900",
};

interface BlockProps {
  hex: any;
  type: "WATER" | "EARTH" | "ARCANE" | "WOOD" | "METAL";
}

const Block: React.FC<BlockProps> = ({ hex, type }) => {
  return (
    <div
      style={{
        position: "absolute",
        marginTop: hex.origin.y,
        marginLeft: hex.origin.x,
        top: hex.y,
        left: hex.x,
        width: HEX_SIZE.width,
        height: HEX_SIZE.height,
      }}
    >
      <svg
        className={`fill-${type ? colors[type] : "#304560"} stroke-${type ? stroke[type] : "#304560"}`}
        data-hex={`${hex.q}-${hex.r}`}
        viewBox="0 0 71 80"
        fill="none"
        style={{
          width: HEX_SIZE.width,
          height: HEX_SIZE.height,
        }}
      >
        <path
          style={{ pointerEvents: "visibleFill" }}
          cursor={hex.isPlayable ? "pointer" : "normal"}
          d="M31.3176 4.3094C33.8184 2.88034 36.8996 2.88034 39.4005 4.3094L64.5676 18.6906C67.0684 20.1197 68.609 22.7607 68.609 25.6188V54.3812C68.609 57.2393 67.0684 59.8803 64.5676 61.3094L39.4005 75.6906C36.8996 77.1197 33.8184 77.1197 31.3176 75.6906L6.15046 61.3094C3.6496 59.8803 2.10901 57.2393 2.10901 54.3812V25.6188C2.10901 22.7607 3.6496 20.1197 6.15046 18.6906L31.3176 4.3094Z"
        />
        {type}
      </svg>
    </div>
  );
};

export default Block;
