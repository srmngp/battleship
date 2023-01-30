export const DEFAULT_LENGTH = 25

export const generateGrid = (length = DEFAULT_LENGTH) => {
  return Array(length).fill(null)
}
