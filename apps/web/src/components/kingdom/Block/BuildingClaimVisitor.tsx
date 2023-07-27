import { Box, Center } from "@chakra-ui/react"
import moment from "moment"
import React, { FC } from "react"
import Lottie from "react-lottie"

import * as openAnimation from "../../../../public/media/lottie/open.json"

const openOptions = {
  loop: true,
  autoplay: true,
  animationData: openAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

interface BuildingClaimVisitorProps {
  nextSilverClaimAt?: Date
}

const BuildingClaimVisitor: FC<BuildingClaimVisitorProps> = ({ nextSilverClaimAt }) => {
  const isClaimable =
    !nextSilverClaimAt || moment.utc().isSameOrAfter(moment.utc(nextSilverClaimAt))

  if (!isClaimable) {
    return null
  }

  return (
    <Center position="absolute" w="100%" h="100%" zIndex="11">
      <Box mt="-18px">
        <Lottie options={openOptions} height={50} width={70} />
      </Box>
    </Center>
  )
}

export default BuildingClaimVisitor
