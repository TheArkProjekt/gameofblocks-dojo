import { KingdomUserBlock } from "@prisma/client"
import { BuildingBlock } from "app/kingdom/types"
import { BlockProps } from "app/maps/components/Block"
import BlockWrapper from "app/maps/components/Block/BlockWrapper"
import LAND_TYPES from "app/maps/constants/lands.json"
import React, { useRef } from "react"
import { useIsVisible } from "react-is-visible"

import Bomb from "../Bomb"
import BlockBuild from "./Build"
import BlockFarm from "./Farm"

interface InnerBlockProps extends BlockProps {
  isSelected: boolean
  buildingId?: string
  name: string
  hp?: number
  level?: number
  bannerIcon?: string
  block: any
  kingdomId: number
  harvestTimeInSec: number
  buildingBlock: BuildingBlock
  isKingdomOwner: boolean
  farmingBlock?: KingdomUserBlock
  userGatheringLevel: number
  userId: number
  walletAddress: string
  incrementSilver: (value: number) => void
}

export const Block = React.memo(function Block(props: InnerBlockProps) {
  const {
    x,
    y,
    id,
    width,
    height,
    isSelected = false,
    block,
    bannerIcon,
    kingdomId,
    farmingBlock,
    buildingBlock,
    userGatheringLevel,
    harvestTimeInSec,
    isKingdomOwner,
    userId,
    walletAddress,
    incrementSilver,
  } = props
  const nodeRef = useRef<any>()
  const color = LAND_TYPES[block.type].color
  const secondaryColor = LAND_TYPES[block.type].secondaryColor
  const isVisible = useIsVisible(nodeRef)

  return (
    <BlockWrapper
      isSelected={!!isSelected}
      nodeRef={nodeRef}
      key={x + y}
      x={x}
      y={y}
      mapId={block.id}
      id={id}
      type={block.type}
      width={width}
      height={height}
      bannerIcon={bannerIcon}
    >
      <Bomb blockId={id} />
      {isVisible ? (
        <>
          {block.gameType === "BUILDING" && (
            <BlockBuild
              kingdomId={kingdomId}
              id={id}
              color={color}
              isKingdomOwner={isKingdomOwner}
              imageName={block.imageName}
              buildingBlock={buildingBlock}
              type={block.type}
              userId={userId}
              incrementSilver={incrementSilver}
            />
          )}
          {block.gameType === "FARM" && (
            <BlockFarm
              harvestTimeInSec={harvestTimeInSec}
              id={id}
              userGatheringLevel={userGatheringLevel}
              isKingdomOwner={isKingdomOwner}
              farmingBlock={farmingBlock}
              kingdomId={kingdomId}
              imageName={block.imageName}
              secondaryColor={secondaryColor}
              tier={block.tier}
              color={color}
              type={block.type}
              userId={userId}
              walletAddress={walletAddress}
            />
          )}
        </>
      ) : null}
    </BlockWrapper>
  )
})

export default Block
