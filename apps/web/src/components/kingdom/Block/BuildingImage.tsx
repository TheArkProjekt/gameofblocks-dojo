import { Image } from "@chakra-ui/react"
import React from "react"

const BuildingImage = ({ itemKey }) => {
  const [landType, buildingType, buildingTier] = itemKey.split("_")
  const tier = buildingTier.replace("T", "0")

  return (
    <Image
      zIndex="11"
      position="absolute"
      width="100%"
      height="100%"
      src={`/media/clash/building/${landType}-${buildingType}-${tier}.svg`.toLowerCase()}
      alt={`${landType}-${buildingType}-${tier}`}
      ignoreFallback
    />
  )
}

export default BuildingImage
