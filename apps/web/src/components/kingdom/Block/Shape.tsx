import { Box } from "@chakra-ui/react"
import React from "react"

const Shape = ({ color }) => {
  return (
    <Box opacity="0.77">
      <svg width="132" height="150" viewBox="0 0 134 150" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M128.616 33.3888L72.4852 1.29827C68.9854 -0.432756 64.9473 -0.432756 61.4475 1.29827L5.38423 33.3888C2.3556 35.1198 0 39.3808 0 42.9095V107.091C0.0673029 110.553 2.4229 114.88 5.45153 116.611L61.5821 148.702C65.0819 150.433 69.1873 150.433 72.6198 148.702L128.616 116.611C131.644 114.88 134 110.619 134 107.091V42.9095C134 39.4474 131.644 35.1198 128.616 33.3888Z"
          fill={color}
        />
      </svg>
    </Box>
  )
}

export default Shape
