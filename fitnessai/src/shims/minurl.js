export function urlToPath(url) {
  if (typeof url === 'string') {
    return url.replace(/^file:\/\/\/?/, '')
  }
  if (url && typeof url.pathname === 'string') {
    return url.pathname
  }
  throw new Error('Invalid url')
}

export function isUrl(value) {
  return typeof value === 'string' && /^file:\/\//.test(value)
}
