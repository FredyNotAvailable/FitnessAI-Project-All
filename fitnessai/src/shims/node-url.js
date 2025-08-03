export function fileURLToPath(url) {
  if (typeof url === 'string') {
    return url.replace(/^file:\/\/\/?/, '')
  }
  if (url && typeof url.pathname === 'string') {
    return url.pathname
  }
  throw new Error('Invalid url')
}
