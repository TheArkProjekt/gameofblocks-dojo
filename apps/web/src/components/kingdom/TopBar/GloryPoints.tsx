import { HStack, Image, Spacer, Text } from "@chakra-ui/react"
import { motion, useAnimationControls } from "framer-motion"
import React, { FC, useEffect, useState } from "react"

interface GloryPointsProps {
  gloryPoints?: number
}

const MotionBox = motion(HStack)

const GloryPoints: FC<GloryPointsProps> = ({ gloryPoints = 0 }) => {
  const controls = useAnimationControls()
  const [gp, setGP] = useState(gloryPoints)

  useEffect(() => {
    if (gloryPoints !== gp) {
      setGP(gloryPoints)
      void controls.start({ scale: [1, 1.2, 1] })
    }
  }, [controls, gloryPoints, gp])

  return (
    <MotionBox
      animate={controls}
      transition={{
        repeat: 1,
      }}
      h="40px"
      py="1"
      borderRadius="xl"
      backgroundColor="#696BF4"
      border="6px solid #5C5EDC"
      userSelect="none"
    >
      <Image
        src="/media/glory-points.svg"
        color="#5C5EDC"
        ml="-20px"
        mt="8px"
        width="47px"
        height="57px"
        alt="glory points"
      />
      <Spacer />
      <Text pr="3" fontSize="md" fontFamily="game" fontWeight="700">
        {gloryPoints}
      </Text>
    </MotionBox>
  )
}

export default GloryPoints
