import { Flex, Heading, HStack, Image, Spinner, Text } from "@chakra-ui/react"
// import Button from "app/core/components/Button"
// import { useCurrentUser } from "app/core/hooks/useCurrentUser"
// import { panelState, setSelectedPanel } from "app/kingdom/states/map"
// import LAND_TYPES from "app/maps/constants/lands.json"
// import { LandType, User } from "db"
import React, { FC, Suspense } from "react"
// import { useSnapshot } from "valtio"
import GloryPoints from "./GloryPoints"

import Silver from "./Silver"
import TopBarWrapper from "./TopBarWrapper"

interface KingdomProps {
  // name: string
  // house: LandType
  // isKingdomOwner: boolean
  // silver: number
  // gloryPoints: number
}

const TopBar: FC<KingdomProps> = (props) => {
  // const { name, house, isKingdomOwner, silver, gloryPoints } = props
  // const { isOpen, panelId } = useSnapshot(panelState)
  // const color = LAND_TYPES[house].secondaryColor

  return (
    <TopBarWrapper>
      <Suspense
        fallback={
          <Flex width="full" justify="center">
            <Spinner />
          </Flex>
        }
      >
        <HStack spacing="6" justify="space-between" width="100%">
          <HStack spacing="6">
            <Heading fontFamily="game" fontWeight="800" fontSize="3xl">
              {/* Kingdom of {name}{" "}
              <Text as="span" fontWeight="500" color={color}>
                House of {house.toLowerCase()}
              </Text> */}
            </Heading>
          </HStack>
          <HStack spacing="6">
            {/* {isKingdomOwner && (
              <>
                <Silver silver={silver} />
                <GloryPoints gloryPoints={gloryPoints} />
              </>
            )} */}
            {/* <Button
              aria-label="Stats"
              title="Stats"
              hasHighlight={false}
              size="sm"
              px="0"
              opacity={panelId === "STATS" ? 0.5 : 1}
              onClick={() => {
                if (isOpen) {
                  if (panelId !== "STATS") {
                    setSelectedPanel({ panelId: "STATS", isOpen: true })
                  } else {
                    setSelectedPanel({ panelId: null, isOpen: false })
                  }
                } else {
                  setSelectedPanel({ panelId: "STATS", isOpen: true })
                }
              }}
            >
              <Image src="/icons/Two-tone/Stats.svg" alt="bag" />
            </Button> */}
            {/* {isKingdomOwner && (
              <>
                <Button
                  aria-label="Leaderboard"
                  title="Leaderboard"
                  hasHighlight={false}
                  size="sm"
                  px="0"
                  mr="1"
                  opacity={panelId === "INVENTORY" ? 0.5 : 1}
                  onClick={() => {
                    if (isOpen) {
                      if (panelId !== "INVENTORY") {
                        setSelectedPanel({ panelId: "INVENTORY", isOpen: true })
                      } else {
                        setSelectedPanel({ panelId: null, isOpen: false })
                      }
                    } else {
                      setSelectedPanel({ panelId: "INVENTORY", isOpen: true })
                    }
                  }}
                >
                  <Image src="/icons/Two-tone/Inventory.svg" alt="bag" />
                </Button>
                <Button
                  aria-label="Forge"
                  title="Forge"
                  hasHighlight={false}
                  px="0"
                  size="sm"
                  opacity={panelId === "FORGE" ? 0.5 : 1}
                  onClick={() => {
                    if (isOpen) {
                      if (panelId !== "FORGE") {
                        setSelectedPanel({ panelId: "FORGE", isOpen: true })
                      } else {
                        setSelectedPanel({ panelId: null, isOpen: false })
                      }
                    } else {
                      setSelectedPanel({ panelId: "FORGE", isOpen: true })
                    }
                  }}
                >
                  <Image src="/icons/Two-tone/Craft.svg" alt="bag" />
                </Button>
              </>
            )} */}
          </HStack>
        </HStack>
      </Suspense>
    </TopBarWrapper>
  )
}

export default React.memo(TopBar)
