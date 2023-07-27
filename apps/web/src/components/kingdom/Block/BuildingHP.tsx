import { Box } from "@chakra-ui/react"
import { FC } from "react"

interface BlockBuildHPProps {
  hp: string
}

const BlockBuildHP: FC<BlockBuildHPProps> = ({ hp }) => {
  return (
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
      {hp} HP
    </Box>
  )
}

export default BlockBuildHP
