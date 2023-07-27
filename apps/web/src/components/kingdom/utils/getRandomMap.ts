const { uniqueNamesGenerator, names, adjectives } = require("unique-names-generator")

interface percent {
  name: string
  count: number
  lowPercentage: number
  highPercentage: number
  percentage: number
}

const getTiers = (farmingLandCount, currentIndex) => {
  const tierCount = farmingLandCount / 8
  let currentTier = 1
  for (let i = 1; i <= 8; i++) {
    if (currentIndex > i * tierCount) {
      currentTier = i
    }
  }
  return Math.round(currentTier)
}

export const getRandomMap = (percentPerType: percent[]) => {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
  }

  const landNameConfig = {
    dictionaries: [names],
    separator: " ",
    style: "capital",
  }

  const mapNameConfig = {
    dictionaries: [adjectives, names],
    separator: " ",
    length: 2,
  }

  const map = {
    landTypes: ["arcane", "wood", "metal", "earth", "water"],
    ySize: 18,
    xSize: 28,
    fillPercentage: 50,
    mapName: uniqueNamesGenerator(mapNameConfig),
  }

  let data = { name: map.mapName, count: 0, blocks: {}, ySize: 0, xSize: 0 }
  let totalLands = 0

  const checkDesignUnicity = (id: string) => {
    let isUnique = true

    Object.keys(data.blocks).map((key) => {
      if (data.blocks[key].id === id) {
        isUnique = false
      }
      return null
    })

    return isUnique
  }

  const checkPositionUnicity = (position) => {
    let isUnique = true

    Object.keys(data.blocks).map((key) => {
      if (data.blocks[key].position === position) {
        isUnique = false
      }
      return null
    })

    return isUnique
  }

  const getRandomDesign = (type) => {
    const background = Math.floor(getRandomArbitrary(1, 9))
    const left = Math.floor(getRandomArbitrary(1, 9))
    const right = Math.floor(getRandomArbitrary(2, 9))
    const front = Math.floor(getRandomArbitrary(2, 9))
    const id = `${type}-${background}${left}${right}${front}`
    const isUnique = checkDesignUnicity(id)
    if (!isUnique) {
      return getRandomDesign(type)
    } else return { background, left, right, front, isUnique }
  }

  const getRandomPosition = () => {
    const x = Math.floor(getRandomArbitrary(1, map.xSize - 1))
      .toString()
      .padStart(2, "0")
    const y = Math.floor(getRandomArbitrary(1, map.ySize - 1))
      .toString()
      .padStart(2, "0")
    const position = `${x}${y}`
    const isUnique = checkPositionUnicity(position)
    if (!isUnique) {
      return getRandomPosition()
    } else return { x, y }
  }

  const maxMapSize = map.ySize * map.xSize

  map.landTypes.map((type) => {
    const [landType] = percentPerType.filter((landType) => landType.name === type.toUpperCase())
    const maxLandForType =
      (((maxMapSize / 100) * map.fillPercentage) / 100) * (landType?.percentage || 0)
    for (let i = 0; i < maxLandForType; i++) {
      totalLands = totalLands + 1
      const { background, left, right, front } = getRandomDesign(type)
      const { x, y } = getRandomPosition()
      const imageName = `${Math.floor(getRandomArbitrary(0, 342)).toString().padStart(4, "0")}`
      const position = `${x}${y}`
      const tier = getTiers(maxLandForType / 2, i)
      const gameType = i < (maxLandForType / 3) * 2 ? "FARM" : "BUILDING"
      data.blocks[position] = {
        type: type.toUpperCase(),
        gameType: gameType,
        tier: gameType === "FARM" ? tier : 0,
        position: position,
        imageName: imageName,
        numberId: totalLands,
        name: uniqueNamesGenerator(landNameConfig),
        id: `${type}-${background}${left}${right}${front}`,
      }
      data.count = totalLands
      data.ySize = map.ySize
      data.xSize = map.xSize
    }
    return null
  })

  return data
}
