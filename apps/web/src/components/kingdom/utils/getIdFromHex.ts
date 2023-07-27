type getIdFromHexProps = {
  x: number
  y: number
}

function getIdFromHex({ x, y }: getIdFromHexProps) {
  return `${x.toString().padStart(2, "0")}${y.toString().padStart(2, "0")}`
}

export default getIdFromHex
