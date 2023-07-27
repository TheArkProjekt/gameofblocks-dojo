import { Box, HStack,Image } from "@chakra-ui/react"
import { AnimatePresence,motion } from "framer-motion"

const MotionBox = motion(Box)
const MotionImage = motion(Image)

const cooldownImages = {
  EARTH: "/media/clash/block/earth_cooldown.png",
  WOOD: "/media/clash/block/wood_cooldown.png",
  WATER: "/media/clash/block/water_cooldown.png",
  METAL: "/media/clash/block/metal_cooldown.png",
  ARCANE: "/media/clash/block/arcane_cooldown.png",
}

const farmVariants = {
  tap: { scale: 1, y: "0px" },
  hover: { scale: 1.1, y: "-1.5px" },
  initial: { scale: 1, y: "0px" },
}

const MAX_STEPS = 3

const BlockAnimation = ({
  type,
  tier,
  color,
  secondaryColor,
  onGatherResource,
  farmStatus,
  farmStep,
  isLoading,
  isKingdomOwner,
  controls,
}) => {
  return (
    <MotionBox
      whileTap={isKingdomOwner ? "tap" : "initial"}
      whileHover={isKingdomOwner ? "hover" : "initial"}
      cursor={farmStatus === "IN_PROGRESS" && isKingdomOwner ? "pointer" : "default"}
      onClick={async () => {
        if (isKingdomOwner) {
          if (farmStatus === "IN_PROGRESS" && !isLoading) {
            await onGatherResource()
          }
        }
      }}
    >
      <AnimatePresence>
        {farmStatus === "COMPLETE" ? (
          <MotionBox
            position="absolute"
            width="100%"
            height="100%"
            zIndex="50"
            animate={{ y: ["0px", "-5px", "0px"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.5,
            }}
          >
            <Image mt="-7px" ignoreFallback src={cooldownImages[type]} alt="" />
          </MotionBox>
        ) : (
          <>
            <HStack
              position="absolute"
              top="30px"
              zIndex="100"
              width="100%"
              height="6px"
              px="6"
              justify="center"
            >
              {[...Array(MAX_STEPS)].map((x, i) => (
                <Box
                  key={i}
                  width="10px"
                  height="10px"
                  bgColor={farmStep >= i + 1 ? secondaryColor : color}
                  borderRadius="xl"
                  border="2px solid"
                  borderColor={color}
                />
              ))}
            </HStack>
            <MotionImage
              zIndex="50"
              position="absolute"
              width="100%"
              height="100%"
              mt="0.5px"
              variants={farmVariants}
              ignoreFallback
              src={`/media/clash/farm/${type.toLowerCase()}-0${tier}.svg`}
              alt=""
            />
            <MotionBox
              position="absolute"
              height="40px"
              width="100%"
              top="51px"
              left="0"
              zIndex="40"
            >
              <MotionBox
                position="absolute"
                animate={controls.rockControls}
                width="6px"
                height="6px"
                top="85%"
                left="50%"
                ml="-3px"
                initial={{ opacity: 0 }}
                borderRadius="xl"
                bgColor={color}
              />
              <MotionBox
                position="absolute"
                animate={controls.rockControls2}
                width="6px"
                height="6px"
                top="85%"
                left="50%"
                ml="-3px"
                initial={{ opacity: 0 }}
                borderRadius="xl"
                bgColor={color}
              />
              <MotionBox
                position="absolute"
                animate={controls.rockControls3}
                width="6px"
                height="6px"
                top="85%"
                left="50%"
                ml="-3px"
                initial={{ opacity: 0 }}
                borderRadius="xl"
                bgColor={color}
              />
              <MotionBox
                position="absolute"
                animate={controls.rockControls4}
                width="6px"
                height="6px"
                top="85%"
                left="50%"
                ml="-3px"
                initial={{ opacity: 0 }}
                borderRadius="xl"
                bgColor={color}
              />
              <MotionBox
                position="absolute"
                animate={controls.rockControls5}
                width="6px"
                height="6px"
                top="85%"
                left="50%"
                ml="-3px"
                initial={{ opacity: 0 }}
                borderRadius="xl"
                bgColor={color}
              />
              <MotionBox
                position="absolute"
                animate={controls.rockControls6}
                width="6px"
                height="6px"
                ml="-3px"
                top="85%"
                left="50%"
                initial={{ opacity: 0 }}
                borderRadius="xl"
                bgColor={color}
              />
            </MotionBox>
            {isKingdomOwner ? (
              <Box position="absolute" width="100%" top="6px" left="5px" zIndex="30">
                <svg width="123" height="138" viewBox="0 0 125 140">
                  <motion.path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M118.97 31.7776L67.6797 2.30186C64.4818 0.71188 60.7918 0.71188 57.5939 2.30186L6.36523 31.7776C3.59778 33.3676 1.44531 37.2814 1.44531 40.5225V99.474C1.50681 102.654 3.65928 106.629 6.42673 108.219L57.7169 137.695C60.9148 139.285 64.6662 139.285 67.8027 137.695L118.97 108.219C121.737 106.629 123.89 102.715 123.89 99.474V40.5225C123.89 37.3425 121.737 33.3676 118.97 31.7776Z"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.2,
                      duration: 2,
                    }}
                  />
                </svg>
              </Box>
            ) : null}
          </>
        )}
      </AnimatePresence>
    </MotionBox>
  )
}

export default BlockAnimation
