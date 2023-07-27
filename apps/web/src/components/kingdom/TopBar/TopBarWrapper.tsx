import { Box, HStack } from "@chakra-ui/react"

const TopBarWrapper = ({ children }) => {
  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      left="97px"
      display={{ base: "none", md: "block" }}
      zIndex="1400"
      p="0"
    >
      <HStack
        justify="space-between"
        bg="darkblue"
        px="6"
        width="100%"
        pt="3.5"
        pb="3"
        position="relative"
        zIndex="10"
        height="66px"
      >
        {children}
      </HStack>
      <Box
        top="34px"
        right="0"
        left="0"
        position="absolute"
        height="42px"
        bgImage="url(/media/map-ui/top-middle.svg)"
        bgSize="auto 100%"
      />
    </Box>
  )
}

export default TopBarWrapper
