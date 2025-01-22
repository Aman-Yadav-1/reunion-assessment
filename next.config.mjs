/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable CSS optimization
  optimizeCss: true,
  // Ensure CSS modules work
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
}

export default nextConfig