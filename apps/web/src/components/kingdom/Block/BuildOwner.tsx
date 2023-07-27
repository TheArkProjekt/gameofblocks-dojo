import { Box,Image } from "@chakra-ui/react"
import { ASSET_FOLDER } from "app/core/constants/assets"
import { setSelectedBlock } from "app/kingdom/states/map"
import { motion } from "framer-motion"
import React, { FC } from "react"

import Shape from "./Shape"

const MotionImage = motion(Image)
const MotionBox = motion(Box)

const addVariants = {
  tap: { scale: 0.6 },
  hover: { scale: 0.8 },
}

const backgroundVariants = {
  tap: { opacity: 0.8 },
  hover: { opacity: 1 },
}

interface BuildOwnerProps {
  type: string
  id: string
  color: string
  imageName: string
}

const BuildOwner: FC<BuildOwnerProps> = (props) => {
  const { id, type, imageName, color } = props

  const handleClick = () => {
    setSelectedBlock({ id })
  }

  return (
    <MotionBox
      cursor="pointer"
      whileHover="hover"
      whileTap="tap"
      height="100%"
      width="100%"
      onClick={handleClick}
    >
      <MotionImage
        initial={{ scale: 0.87 }}
        position="absolute"
        width="100%"
        height="100%"
        zIndex="20"
        opacity="1"
        ignoreFallback
        variants={addVariants}
        src="/media/clash/block/add_buildable.png"
        alt=""
      />
      <MotionImage
        zIndex="10"
        position="absolute"
        width="100%"
        height="100%"
        initial={{ opacity: 0 }}
        variants={backgroundVariants}
        ignoreFallback
        src={`${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/${imageName}.png`}
        srcSet={`${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/_2x/${imageName}.png`}
        alt={"land"}
      />
      <Shape color={color} />
    </MotionBox>
  )
}

export default BuildOwner
