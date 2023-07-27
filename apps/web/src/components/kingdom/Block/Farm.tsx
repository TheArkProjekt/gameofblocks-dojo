import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Box, HStack, Image, Spinner, useToast } from "@chakra-ui/react"
import { KingdomUserBlock } from "@prisma/client"
import { Toast } from "app/core/components/Toast"
import { ASSET_FOLDER } from "app/core/constants/assets"
import { ERRORS } from "app/core/constants/errors"
import { usePlayAnimation } from "app/kingdom/hooks/usePlayAnimation"
import gatherResourceMutation from "app/kingdom/mutations/gatherResource"
import getCraftingRecipes from "app/kingdom/queries/getCraftingRecipes"
import getKingdom from "app/kingdom/queries/getKingdom"
import userProgression from "app/kingdom/queries/userProgression"
import { playSound } from "app/kingdom/utils/playSound"
import getKingdomInventory from "app/maps/queries/getKingdomInventory"
import moment from "moment"
import React, { FC, useEffect, useState } from "react"
import Countdown from "react-countdown"

import BlockAnimation from "./FarmAnimation"

const typeLock = {
  EARTH: "/media/clash/block/earth_locked.png",
  WOOD: "/media/clash/block/wood_locked.png",
  WATER: "/media/clash/block/water_locked.png",
  METAL: "/media/clash/block/metal_locked.png",
  ARCANE: "/media/clash/block/arcane_locked.png",
}

interface BlockFarmProps {
  harvestTimeInSec: number
  tier: number
  type: string
  secondaryColor: string
  color: string
  imageName: string
  id: string
  kingdomId: number
  isKingdomOwner: boolean
  farmingBlock?: KingdomUserBlock
  userGatheringLevel: number
  userId: number
  walletAddress: string
}

const DEFAULT_RESOURCES = 3

const SOUND_EFFECTS = {
  EARTH: "https://gameofblocks.imgix.net/sounds/earth_v2.mp3",
  WOOD: "https://gameofblocks.imgix.net/sounds/wood_v3.mp3",
  WATER: "https://gameofblocks.imgix.net/sounds/water_v2.mp3",
  METAL: "https://gameofblocks.imgix.net/sounds/metal_v2.mp3",
  ARCANE: "https://gameofblocks.imgix.net/sounds/arcane_v2.mp3",
}

const BlockFarm: FC<BlockFarmProps> = (props) => {
  const {
    tier,
    type,
    secondaryColor,
    color,
    imageName,
    kingdomId,
    id,
    farmingBlock,
    isKingdomOwner,
    userGatheringLevel,
    harvestTimeInSec,
    userId,
    walletAddress,
  } = props
  const toast = useToast()
  const [farmStatus, setFarmStatus] = useState("IN_PROGRESS")
  const [isLoading, setLoadingState] = useState(false)
  const [audio] = useState(new Audio(SOUND_EFFECTS[type]))
  const [gatherRessource] = useMutation(gatherResourceMutation)
  const { controls, playRocksAnimation } = usePlayAnimation({ harvestTimeInSec })

  const onGatherResource = async () => {
    setLoadingState(true)
    try {
      await gatherRessource({ landId: id, kingdomId })

      await invalidateQuery(getKingdomInventory, {} as any)
      await invalidateQuery(getKingdom, { userId })
      await invalidateQuery(userProgression, { walletAddress })
      await invalidateQuery(getCraftingRecipes, {} as any)

      playSound(audio, harvestTimeInSec - 1, 1000)
      playRocksAnimation()
      const time = harvestTimeInSec * 1000 - 1000
      setTimeout(
        () => {
          setFarmStep(farmStep + 1)
          if (farmStep >= DEFAULT_RESOURCES - 1) {
            setFarmStatus("COMPLETE")
          }
          setLoadingState(false)
          toast({
            render: (props) => (
              <Toast
                {...props}
                bg={color}
                color="white"
                description={
                  <Box fontWeight="bold" textTransform="uppercase">
                    1 piece of {type} {tier}
                  </Box>
                }
              />
            ),
            duration: 1500,
            isClosable: false,
            position: "bottom",
          })
        },
        time < 1000 ? 600 : time
      )
    } catch (error) {
      if (error.message.includes("required")) {
        toast({
          title: error.message,
          description: ERRORS.REQUIRE_TOOL,
          duration: 3000,
          isClosable: false,
          status: "error",
          position: "bottom",
        })
      } else {
        toast({
          title: "Error",
          description: `${error.message}`,
          duration: 1500,
          isClosable: false,
          position: "bottom",
          status: "error",
        })
      }
      setLoadingState(false)
    }
  }

  const [farmStep, setFarmStep] = useState(DEFAULT_RESOURCES)
  useEffect(() => {
    if (farmingBlock) {
      if (moment.utc(farmingBlock.respawnDate).isSameOrAfter(moment.utc())) {
        setFarmStatus("COMPLETE")
      } else if (
        moment.utc(farmingBlock.respawnDate).isBefore(moment.utc()) ||
        !farmingBlock.respawnDate
      ) {
        setFarmStatus("IN_PROGRESS")
        if (farmingBlock.remainingResources === 0) {
          setFarmStep(0)
        } else {
          setFarmStep(DEFAULT_RESOURCES - farmingBlock.remainingResources)
        }
      }
    } else {
      setFarmStep(0)
    }
  }, [])

  return (
    <Box width="100%" height="100%" position="absolute" left="0" top="0" zIndex="100">
      {isLoading && (
        <HStack
          position="absolute"
          align="center"
          justify="center"
          top="0"
          width="100%"
          height="70%"
          left="0"
          zIndex="100"
        >
          <Spinner size="sm" color={color} />
        </HStack>
      )}
      <Box
        position="absolute"
        top="88px"
        px="2.5"
        pt="1.5"
        textAlign="center"
        width="100%"
        fontSize="22px"
        noOfLines={1}
        lineHeight="none"
        fontFamily="gamecond"
        fontWeight="semibold"
        textTransform="uppercase"
        zIndex="30"
      >
        {farmingBlock && farmingBlock.respawnDate && farmStatus === "COMPLETE" ? (
          <Countdown
            date={farmingBlock.respawnDate}
            daysInHours={true}
            onComplete={() => {
              setFarmStatus("IN_PROGRESS")
              setFarmStep(0)
            }}
          >
            <Box>{type}</Box>
          </Countdown>
        ) : (
          <Box>{type}</Box>
        )}
      </Box>
      <Box
        position="absolute"
        top="110px"
        px="2.5"
        pt="1.5"
        zIndex="50"
        textAlign="center"
        width="100%"
        fontSize="13px"
        fontWeight="semibold"
        fontFamily="gamecond"
        lineHeight="none"
        textTransform="uppercase"
      >
        level {tier}
      </Box>
      {tier > userGatheringLevel ? (
        <Box cursor="not-allowed">
          <Image
            zIndex="10"
            position="absolute"
            width="100%"
            height="100%"
            ignoreFallback
            opacity={0.8}
            src={typeLock[type]}
            srcSet={typeLock[type]}
            alt={"land"}
          />
        </Box>
      ) : (
        <>
          <BlockAnimation
            controls={controls}
            isKingdomOwner={isKingdomOwner}
            onGatherResource={onGatherResource}
            type={type}
            tier={tier}
            color={color}
            farmStatus={farmStatus}
            farmStep={farmStep}
            isLoading={isLoading}
            secondaryColor={secondaryColor}
          />
          <Box position="absolute" width="100%" zIndex="20">
            <svg width="134" height="150" viewBox="0 0 134 150">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M72.1246 1.29827L127.976 33.3888C130.989 35.1198 133.333 39.4474 133.333 42.9095V107.091C133.333 110.619 130.989 114.88 127.976 116.611L72.2585 148.702C68.8431 150.433 64.7581 150.433 61.2757 148.702L5.42441 116.611C2.41085 114.88 0.066968 110.553 0 107.091V42.9095C0 39.3808 2.34388 35.1198 5.35744 33.3888L61.1418 1.29827C64.6241 -0.432756 68.6422 -0.432756 72.1246 1.29827ZM71.6788 7.3036L122.969 36.7794C125.736 38.3693 127.889 42.3443 127.889 45.5242V104.476C127.889 107.717 125.736 111.631 122.969 113.221L71.8018 142.696C68.6654 144.286 64.9139 144.286 61.716 142.696L10.4259 113.221C7.65841 111.631 5.50594 107.656 5.44444 104.476V45.5242C5.44444 42.2831 7.59691 38.3693 10.3644 36.7794L61.593 7.3036C64.7909 5.71362 68.4809 5.71362 71.6788 7.3036Z"
                fill={secondaryColor}
              />
            </svg>
          </Box>
          <Image
            zIndex="10"
            position="absolute"
            width="100%"
            height="100%"
            ignoreFallback
            src={`${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/${imageName}.png`}
            srcSet={`${ASSET_FOLDER}/lands-v2/${type.toLowerCase()}/_2x/${imageName}.png`}
            alt={"land"}
          />
          <Box opacity="1">
            <svg width="132" height="150" viewBox="0 0 134 150" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M128.616 33.3888L72.4852 1.29827C68.9854 -0.432756 64.9473 -0.432756 61.4475 1.29827L5.38423 33.3888C2.3556 35.1198 0 39.3808 0 42.9095V107.091C0.0673029 110.553 2.4229 114.88 5.45153 116.611L61.5821 148.702C65.0819 150.433 69.1873 150.433 72.6198 148.702L128.616 116.611C131.644 114.88 134 110.619 134 107.091V42.9095C134 39.4474 131.644 35.1198 128.616 33.3888Z"
                fill={secondaryColor}
              />
            </svg>
          </Box>
        </>
      )}
    </Box>
  )
}

export default React.memo(BlockFarm)
