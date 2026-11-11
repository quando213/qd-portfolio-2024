const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Prefix a /public path with the deploy base path. */
export const asset = (path: string) => `${base}${path}`
