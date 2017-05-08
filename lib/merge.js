
export default (dest, src) => {
  for (let key in src) {
    if (key in dest && typeof dest[key] === 'object') {
      Object.assign(dest[key], src[key])
    } else {
      dest[key] = src[key]
    }
  }
  return dest
}
