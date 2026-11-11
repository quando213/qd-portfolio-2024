import type { NextConfig } from 'next'

// Static export for GitHub Pages. Set BASE_PATH (e.g. "/qd-portfolio-2024")
// only when serving from a project subpath instead of a custom domain.
const basePath = process.env.BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
