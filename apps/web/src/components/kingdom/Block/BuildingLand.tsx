import { Image } from "@chakra-ui/react"
import { ASSET_FOLDER } from "app/core/constants/assets"
import React, { FC } from "react"

interface BuildingLandProps {
  type: string
  imageName: string
  square?: boolean
}

const BuildingLand: FC<BuildingLandProps> = (props) => {
  const { type, imageName, square = false } = props

  let image: string
  let image2x: string

  if (square) {
    image = `${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/_big/${imageName}.png`
    image2x = `${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/_big/_2x/${imageName}.png 2x`
  } else {
    image = `${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/${imageName}.png`
    image2x = `${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/_2x/${imageName}.png 2x`
  }

  return (
    <Image
      zIndex="10"
      position="absolute"
      width="100%"
      height="100%"
      ignoreFallback
      src={image}
      srcSet={image2x}
      alt={imageName}
    />
  )
}

export default BuildingLand
