/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}

module.exports = nextConfig 