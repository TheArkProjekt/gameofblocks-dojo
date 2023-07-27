import { HStack, Spacer, Text } from "@chakra-ui/react"
import CoinsIcon from "app/core/components/Icons/CoinsIcon"
import { motion, useAnimationControls } from "framer-motion"
import React, { FC, useEffect, useState } from "react"

interface SilverProps {
  silver?: number
}

const MotionBox = motion(HStack)

const Silver: FC<SilverProps> = ({ silver }) => {
  const [value, setValue] = useState(silver)
  const controls = useAnimationControls()

  useEffect(() => {
    if (silver !== value) {
      setValue(silver)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      controls.start({ scale: [1, 1.2, 1] })
    }
  }, [controls, silver, value])

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
      <CoinsIcon color="#5C5EDC" ml="-20px" width="46px" height="46px" />
      <Spacer />
      <Text pr="3" fontSize="md" fontFamily="game" fontWeight="700">
        {silver}
      </Text>
    </MotionBox>
  )
}

export default Silver
