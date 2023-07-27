import { defineGrid, extendHex } from "honeycomb-grid"

import LAND_TYPES from "./lands.json"

export const LAND_TYPES_AS_ARRAY = Object.keys(LAND_TYPES).map((type) => ({
  type,
  ...LAND_TYPES[type],
}))

export const HEX_WIDTH = 137.25
export const HEX_HEIGHT = 159
export const mapSizeY = 18
export const mapSizeX = 28

// Create a custom Hex block
export const Hex = extendHex({
  // size: radius + borderWidth,
  size: { height: HEX_HEIGHT, width: HEX_WIDTH },
})

// Define a grid
export const Grid = defineGrid(Hex)
export const grid = Grid.rectangle({
  width: mapSizeX,
  height: mapSizeY,
})

// Get the global size of the grid
export const gridHeight = grid.pointHeight()
export const gridWidth = grid.pointWidth()
