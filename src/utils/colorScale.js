/**
 * color scale from 0% to 100%, rendering it from red to yellow to green
 */
export function colorScale(perc) {
  let r, g, b = 0
  if (perc < 50) {
    r = 255
    g = Math.round(5.1 * perc)
  } else {
    g = 255
    r = Math.round(510 - 5.1 * perc)
  }
  let h = r * 0x10000 + g * 0x100 + b * 0x1
  return '#' + ('000000' + h.toString(16)).slice(-6)
}
