export const ASSET_FOLDER =
  process.env.NEXT_PUBLIC_S3_GAME_ASSETS_PUBLIC_FOLDER || "";

const baseSize = 132.5;

export const HEX_SIZE = {
  width: baseSize,
  height: baseSize * 1.1290322580645,
};

export const KINGDOM_SIZE = {
  width: 30,
  height: 20,
};
