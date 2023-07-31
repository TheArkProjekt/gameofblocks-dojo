import alea from "alea";
import { defineHex, Grid, hexToOffset, rectangle } from "honeycomb-grid";
import { createNoise2D, RandomFn } from "simplex-noise";

import { HEX_SIZE, KINGDOM_SIZE } from "../constants";

type settingsType = {
  hexColums: number;
  hexRows: number;
  elevationSeed: RandomFn;
  moistureSeed: RandomFn;
  frequencyElevation: number;
  frequencyMoisture: number;
  elevationOctaves_0: number;
  elevationOctaves_1: number;
  elevationOctaves_2: number;
  elevationOctaves_3: number;
  moistureOctaves_0: number;
  moistureOctaves_1: number;
  moistureOctaves_2: number;
  moistureOctaves_3: number;
  redistributionElevation: number;
  redistributionMoisture: number;
  createIsland: boolean;
};

function heightMap(settings: settingsType) {
  const noise2D = createNoise2D();
  let elevation: number[][] = [[]];
  let freq = settings.frequencyElevation; // increase has a zoom out effect, decrease for zoom in
  for (let x = 0; x < settings.hexColums; x++) {
    let elevationRow: number[] = [];
    for (let y = 0; y < settings.hexRows; y++) {
      let nx = (x / settings.hexColums) * freq;
      let ny = (y / settings.hexRows) * freq;

      let e =
        settings.elevationOctaves_0 * noise2D(nx, ny) +
        settings.elevationOctaves_1 * noise2D(4 * nx, 4 * ny) +
        settings.elevationOctaves_2 * noise2D(8 * nx, 8 * ny) +
        settings.elevationOctaves_3 * noise2D(16 * nx, 16 * ny);
      e = (e + 1) / 2; // from -1 to 1  --> from 0 to 1

      if (settings.createIsland) {
        let xp = x / settings.hexColums;
        let yp = y / settings.hexRows;
        let d = Math.hypot(0.5 - xp, 0.5 - yp);
        e = (1 + e - d * 3.5) / 2;
      }

      if (e < 0) e = 0;
      if (e > 1) e = 1;

      elevationRow[y] = Math.pow(e, settings.redistributionElevation);
    }
    elevation[x] = elevationRow;
  }
  return elevation;
}

function moistureMap(settings: settingsType) {
  const noise2D = createNoise2D();
  let moisture: number[][] = [[]];
  let freq = settings.frequencyMoisture; // increase has a zoom out effect, decrease for zoom in
  for (let x = 0; x < settings.hexColums; x++) {
    let moistureRow: number[] = [];
    for (let y = 0; y < settings.hexRows; y++) {
      let nx = (x / settings.hexColums) * freq;
      let ny = (y / settings.hexRows) * freq;

      let m =
        settings.moistureOctaves_0 * noise2D(nx, ny) +
        settings.moistureOctaves_1 * noise2D(4 * nx, 4 * ny) +
        settings.moistureOctaves_2 * noise2D(8 * nx, 8 * ny) +
        settings.moistureOctaves_3 * noise2D(16 * nx, 16 * ny);
      m = (m + 1) / 2; // from -1 to 1  --> from 0 to 1
      if (m < 0) m = 0;
      if (m > 1) m = 1;
      moistureRow[y] = Math.pow(m, settings.redistributionMoisture);
    }
    moisture[x] = moistureRow;
  }

  return moisture;
}

export const generateMap = () => {
  const elevationSeed = alea("toto");
  const moistureSeed = alea("toto");

  class GobHex extends defineHex({
    dimensions: { width: HEX_SIZE.width, height: HEX_SIZE.height },
    origin: "topLeft",
  }) {
    isPlayable?: boolean;
    type?: "WATER" | "EARTH" | "ARCANE" | "WOOD" | "METAL" | "DEEP_WATER";
  }

  const grid = new Grid(
    GobHex,
    rectangle({ width: KINGDOM_SIZE.width, height: KINGDOM_SIZE.height }),
  );

  let settings = {
    hexColums: KINGDOM_SIZE.width,
    hexRows: KINGDOM_SIZE.height,
    elevationSeed: elevationSeed,
    moistureSeed: moistureSeed,
    frequencyElevation: 1,
    frequencyMoisture: 0.8,
    elevationOctaves_0: 1,
    elevationOctaves_1: 0.5,
    elevationOctaves_2: 0.25,
    elevationOctaves_3: 0.12,
    moistureOctaves_0: 1,
    moistureOctaves_1: 0.5,
    moistureOctaves_2: 0.25,
    moistureOctaves_3: 0.12,
    redistributionElevation: 1,
    redistributionMoisture: 1.0,
    createIsland: false,
    contourInterval_0: 0.2,
    contourInterval_1: 0.3,
    contourInterval_2: 0.5,
    contourInterval_3: 0.7,
    contourInterval_4: 0.9,
  };

  let elevation = heightMap(settings);
  let moisture = moistureMap(settings);

  if (!elevation || !moisture) {
    return;
  }

  for (const hex of grid) {
    const { col, row } = hexToOffset(hex);
    const elev = elevation[col]?.[row] || 0;
    const moist = moisture[col]?.[row] || 0;

    if (elev < settings.contourInterval_0) {
      hex.type = "DEEP_WATER";
    } else if (elev < settings.contourInterval_1) {
      hex.type = "WATER";
    } else if (elev < settings.contourInterval_2) {
      if (moist < 0.2) {
        hex.type = "EARTH";
      } else if (moist < 0.6) {
        hex.type = "WOOD";
      } else {
        hex.type = "ARCANE";
      }
    } else if (elev < settings.contourInterval_3) {
      if (moist < 0.16) {
        hex.type = "EARTH";
      } else if (moist < 0.5) {
        hex.type = "WOOD";
      } else if (moist < 0.8) {
        hex.type = "ARCANE";
      } else {
        hex.type = "METAL";
      }
    } else if (elev < settings.contourInterval_4) {
      if (moist < 0.33) {
        hex.type = "EARTH";
      } else if (moist < 0.66) {
        hex.type = "WOOD";
      } else {
        hex.type = "ARCANE";
      }
    } else {
      hex.type = "METAL";
    }
  }
  const jsonGrid = grid.toJSON();
  return { grid, jsonGrid };
};
