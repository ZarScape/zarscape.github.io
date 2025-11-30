import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // 1. ENABLE STATIC EXPORT FOR GITHUB PAGES
  output: "export", 
  basePath: "", 
  assetPrefix: "",

  // 2. DISABLE SERVER IMAGE OPTIMIZATION (REQUIRED for static export)
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'repository-images.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com', pathname: '/**' },
    ],
  },
  
  // Other configs
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;