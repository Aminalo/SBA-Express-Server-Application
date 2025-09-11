// Pick allowed keys only (to sanitize updates)
export const pick = (src, keys) => keys.reduce((o, k) => (k in src ? (o[k] = src[k], o) : o), {});