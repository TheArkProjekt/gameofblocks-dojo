'use client'
import React, { FC, useEffect, useMemo, useRef } from "react";
import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import { useWindowSize } from "@react-hook/window-size";
import ScrollContainer from "react-indiana-drag-scroll";
import SimpleBarReact from "simplebar-react";

import {
  grid,
  gridHeight,
  gridWidth,
  HEX_HEIGHT,
  HEX_WIDTH,
} from "~/components/kingdom/constants/map";
import TopBar from "~/components/kingdom/TopBar";
import getIdFromHex from "~/components/kingdom/utils/getIdFromHex";
import BlockWrapper from "./Block/Wrapper";

interface KingdomProps {}

export const Kingdom: FC<KingdomProps> = () => {
  // Get window size on UseEffect
  const [width, height] = useWindowSize();
  const container = useRef<any>(null);
  // Get the offset to center the map & create drag limit
  // TODO: add condition where window is bigger than map in x or y
  const mapOffsetX = -(gridWidth - width) / 2;
  const mapOffsetY = -(gridHeight - height) / 2;

  useEffect(() => {
    if (container.current) {
      container.current.scrollTo(-mapOffsetX, -mapOffsetY);
    }
  }, [mapOffsetX, mapOffsetY]);
  const kingdom = false;
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      {/* {!kingdom ? (
        <CreateKingdom />
      ) : ( */}
      <>
        {/* <TopBar /> */}
        <SimpleBarReact style={{ height: "100vh", width: "100%" }}>
          {() => (
            <ScrollContainer
              className="simplebar-content-wrapper"
              hideScrollbars={false}
              innerRef={container}
              vertical={true}
              horizontal={true}
            >
              <Box
                className="simplebar-content"
                backgroundImage={`url('/media/clash/block/background.png')`}
                backgroundPosition="-0.5px -163px"
                position="relative"
                backgroundSize="274.5px 238.4px"
                height={gridHeight}
                width={gridWidth}
              >
                {/* {grid.map((hex, index) => {
                  const { x, y } = hex.toPoint();
                  const id = getIdFromHex(hex);
                  const map = kingdom.map as any;

                  if (map.blocks[id] === undefined) {
                    return null;
                  }

                  const { type, tier } = map.blocks[id];
                  const farmingBlock = kingdom?.farmBlocks.find(
                    (block) => id === block.landId,
                  );

                  return (
                    <BlockWrapper
                      userId={userId}
                      walletAddress={walletAddress}
                      isKingdomOwner={isKingdomOwner}
                      silverClaimingTimeInSec={silverClaimingTimeInSec}
                      block={map.blocks[id]}
                      farmingBlock={farmingBlock}
                      buildingBlock={buildings[id]}
                      name={map.blocks[id].name}
                      width={HEX_WIDTH - 5}
                      height={HEX_HEIGHT - 9}
                      index={index}
                      kingdomId={kingdom.id}
                      key={x + y}
                      x={x}
                      y={y}
                      id={id}
                    />
                  );
                })} */}
              </Box>
            </ScrollContainer>
          )}
        </SimpleBarReact>
      </>
      {/* )} */}
    </Box>
  );
};

export default Kingdom;
