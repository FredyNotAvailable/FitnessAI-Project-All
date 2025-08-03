export const minpath = {
  basename(path, ext) {
    if (!path) return '';
    let base = path.substring(path.lastIndexOf('/') + 1);
    if (ext && base.endsWith(ext)) {
      base = base.slice(0, -ext.length);
    }
    return base;
  },
  dirname(path) {
    if (!path) return '';
    const i = path.lastIndexOf('/');
    return i === -1 ? '' : path.substring(0, i);
  },
  extname(path) {
    if (!path) return '';
    const i = path.lastIndexOf('.');
    return i === -1 ? '' : path.substring(i);
  },
  join(...parts) {
    return parts
      .filter(Boolean)
      .map((part, i) => {
        if (i === 0) return part.replace(/\/+$/, '');
        return part.replace(/^\/+|\/+$/g, '');
      })
      .filter(Boolean)
      .join('/');
  },
  sep: '/'
};
