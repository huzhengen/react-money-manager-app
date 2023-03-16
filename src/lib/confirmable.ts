export const confirmable = (tip: string, fn: () => void) => () => {
  const result = window.confirm(tip)
  if (result) { fn() }
}
