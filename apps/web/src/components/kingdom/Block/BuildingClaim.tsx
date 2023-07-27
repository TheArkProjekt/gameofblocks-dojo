import { invalidateQuery, useMutation, setQueryData } from "@blitzjs/rpc"
import { Box, Center, Text } from "@chakra-ui/react"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { AnimatePresence, motion } from "framer-motion"
import moment from "moment"
import React, { FC, useEffect, useState } from "react"
import Countdown from "react-countdown"
import Lottie from "react-lottie"
import useSound from "use-sound"

import * as openAnimation from "../../../../public/media/lottie/open.json"
import claimSilver from "../../mutations/claimSilver"
import getKingdomBlocks from "../../queries/getKingdomBlocks"

const MotionBox = motion(Box)

const openOptions = {
  loop: true,
  autoplay: true,
  animationData: openAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

interface BuildingClaimProps {
  kingdomId: number
  nextSilverClaimAt?: Date
  yieldValue: number
  type: string
  id: string
  color: string
  userId: number
  incrementSilver: (value: number) => void
}

const BuildingClaim: FC<BuildingClaimProps> = (props) => {
  const { id, type, kingdomId, nextSilverClaimAt, yieldValue, color, userId, incrementSilver } =
    props

  const [silverIsClaimable, setSilverIsClaimable] = useState(false)
  const [silverIsClaiming, setSilverIsClaiming] = useState(false)
  const [showSilverValue, setShowSilverValue] = useState(false)
  const [play] = useSound("/media/sounds/coins.mp3")
  const [claim, { isLoading }] = useMutation(claimSilver)

  const handleClick = async (e: React.SyntheticEvent) => {
    e.stopPropagation()

    if (isLoading || silverIsClaiming || !silverIsClaimable) {
      return
    }

    try {
      setSilverIsClaiming(true)
      setShowSilverValue(true)
      play()

      incrementSilver(yieldValue)
      await claim({ kingdomId, blockId: id })
      await invalidateQuery(getCurrentUser)
    } catch (err) {
      console.error(err)
      setSilverIsClaiming(false)
      await invalidateQuery(getKingdomBlocks, { userId })
    }
  }

  useEffect(() => {
    if (!nextSilverClaimAt) {
      setSilverIsClaimable(true)
    } else {
      setSilverIsClaiming(false)
      setSilverIsClaimable(moment.utc().isSameOrAfter(moment.utc(nextSilverClaimAt)))
    }
  }, [nextSilverClaimAt])

  useEffect(() => {
    if (showSilverValue) {
      const timer = setTimeout(() => setShowSilverValue(false), 1000)

      return () => clearTimeout(timer)
    }
  }, [showSilverValue])

  return (
    <>
      <AnimatePresence>
        {showSilverValue && (
          <MotionBox
            key="yield"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0, y: -5 }}
            position="absolute"
            w="full"
            top="20px"
            zIndex="20"
          >
            <Center w="full">
              <Text
                borderRadius="lg"
                px={2}
                py={1}
                bg={color}
                fontSize="sm"
                fontFamily="game"
                fontWeight="bold"
              >
                {`+ ${yieldValue} silver`}
              </Text>
            </Center>
          </MotionBox>
        )}
      </AnimatePresence>
      {!silverIsClaimable && (
        <Box
          position="absolute"
          top="75px"
          textAlign="center"
          width="full"
          h="16px"
          fontSize="16px"
          noOfLines={1}
          lineHeight="none"
          fontFamily="gamecond"
          fontWeight="semibold"
          textTransform="uppercase"
          zIndex="30"
        >
          <Box position="absolute" w="100%" h="100%" zIndex="31">
            <Countdown
              key={`claim-countdown-${id}`}
              date={nextSilverClaimAt}
              daysInHours={true}
              onComplete={async () => {
                setSilverIsClaimable(true)
              }}
            >
              <Box>{type}</Box>
            </Countdown>
          </Box>
          <Box w="full" h="full" bg={color} opacity="0.6" />
        </Box>
      )}
      {silverIsClaimable && !silverIsClaiming && (
        <Center position="absolute" w="100%" h="100%" zIndex="11" onClick={handleClick}>
          <Box mt="-18px">
            <Lottie options={openOptions} height={50} width={70} />
          </Box>
        </Center>
      )}
    </>
  )
}

export default BuildingClaim
