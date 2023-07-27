import { Box } from "@chakra-ui/react"

const BlockBuildTier = ({ tier }) => {
  return (
    <Box
      position="absolute"
      top="110px"
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
      Tier {tier}
    </Box>
  )
}

export default BlockBuildTier
