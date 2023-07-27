function getPercentage(value: number | null | undefined, total: number | null | undefined) {
  if (!value || !total) {
    return 0
  }

  return Math.round((100 * value) / total)
}

export default getPercentage
