export const positions: number[][] = new Array(10000)
  .fill(null)
  .map((_, index) => {
    const [rx, ry] = [Math.random() - 0.5, Math.random() - 0.5]
    const r = index / 2000 / (Math.pow(rx, 2) + Math.pow(ry, 2))
    const [x, y] = [rx * r, ry * r]
    return [x, y, 0]
  })
export const positionBuffer = new Float32Array(positions.flat())
