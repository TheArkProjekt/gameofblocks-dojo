import { Box } from "@chakra-ui/react"
import { setSelectedBlock } from "app/kingdom/states/map"
import { BuildingBlock } from "app/kingdom/types"
import { FC } from "react"

import BuildingClaim from "./BuildingClaim"
import BuildingClaimVisitor from "./BuildingClaimVisitor"
import BuildingHP from "./BuildingHP"
import BuildingImage from "./BuildingImage"
import BuildingLand from "./BuildingLand"
import BuildingTier from "./BuildingTier"

interface BuildingProps {
  id: string
  buildingBlock: BuildingBlock
  type: string
  imageName: string
  color: string
  isKingdomOwner: boolean
  kingdomId: number
  userId: number
  incrementSilver: (value: number) => void
}

const Building: FC<BuildingProps> = (props) => {
  const {
    id,
    buildingBlock,
    type,
    imageName,
    color,
    isKingdomOwner,
    kingdomId,
    userId,
    incrementSilver,
  } = props
  const handleClick = () => {
    setSelectedBlock({ id })
  }

  return (
    <Box onClick={handleClick} cursor="pointer">
      <BuildingImage itemKey={buildingBlock.itemKey} />
      <BuildingLand type={type} imageName={imageName} />
      <BuildingTier tier={buildingBlock.level} />
      <BuildingHP hp={buildingBlock.hp} />
      {isKingdomOwner ? (
        <BuildingClaim
          userId={userId}
          id={id}
          color={color}
          type={type}
          kingdomId={kingdomId}
          yieldValue={buildingBlock.yield}
          nextSilverClaimAt={buildingBlock.nextSilverClaimAt}
          incrementSilver={incrementSilver}
        />
      ) : (
        <BuildingClaimVisitor nextSilverClaimAt={buildingBlock.nextSilverClaimAt} />
      )}
    </Box>
  )
}

export default Building
