import { Image } from "@chakra-ui/react"
import React from "react"

import Shape from "./Shape"

const BlockVisitor = ({ color }) => {
  return (
    <>
      <Image
        transform="scale(0.87)"
        position="absolute"
        width="100%"
        height="100%"
        zIndex="20"
        ignoreFallback
        src="/media/clash/block/add_buildable.png"
        alt=""
      />
      <Shape color={color} />
    </>
  )
}

export default BlockVisitor
