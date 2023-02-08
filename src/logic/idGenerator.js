export const generateId = (length = 10) => (
  Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace('.', '')
    .toString()
)
