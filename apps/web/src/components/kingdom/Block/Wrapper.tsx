import { KingdomUserBlock } from "@prisma/client"
import { state as currentBlockState } from "app/kingdom/states/map"
import { BlockProps } from "app/maps/components/Block"
import React, { FC } from "react"
import { useSnapshot } from "valtio"

import { Block } from "./Block"

interface BlockWrapperProps extends BlockProps {
  buildingId?: string
  name: string
  hp?: number
  level?: number
  bannerIcon?: string
  block: any
  kingdomId: number
  isKingdomOwner: boolean
  harvestTimeInSec: number
  silverClaimingTimeInSec: number
  buildingBlock: {
    createdAt: Date
    id: number
    kingdomId: number
    landId: string
    type: string
    updatedAt: Date
    userId: number
    itemKey: string
    nextSilverClaimAt?: Date
    level: string
    hp: string
    yield: number
  }
  farmingBlock?: KingdomUserBlock
  userGatheringLevel: number
  userId: number
  walletAddress: string
  incrementSilver: (value: number) => void
}

export const BlockWrapper: FC<BlockWrapperProps> = (props) => {
  const selectedBlock = useSnapshot(currentBlockState)
  const isSelected = selectedBlock && selectedBlock.id === props.id
  return <Block {...props} isSelected={isSelected} />
}

export default React.memo(BlockWrapper)
