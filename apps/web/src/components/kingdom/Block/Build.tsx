import { BuildingBlock } from "app/kingdom/types"
import React, { FC } from "react"

import Building from "./Building"
import BuildOwner from "./BuildOwner"
import BuildVisitor from "./BuildVisitor"

interface BlockBuildProps {
  kingdomId: number
  buildingBlock: BuildingBlock
  isKingdomOwner: boolean
  type: string
  id: string
  color: string
  imageName: string
  userId: number
  incrementSilver: (value: number) => void
}

const BlockBuild: FC<BlockBuildProps> = (props) => {
  const {
    id,
    kingdomId,
    isKingdomOwner,
    type,
    imageName,
    color,
    buildingBlock,
    userId,
    incrementSilver,
  } = props

  if (buildingBlock) {
    return (
      <Building
        id={id}
        buildingBlock={buildingBlock}
        type={type}
        color={color}
        imageName={imageName}
        isKingdomOwner={isKingdomOwner}
        kingdomId={kingdomId}
        userId={userId}
        incrementSilver={incrementSilver}
      />
    )
  }

  if (isKingdomOwner) {
    return <BuildOwner id={id} type={type} imageName={imageName} color={color} />
  }

  return <BuildVisitor color={color} />
}

export default BlockBuild
