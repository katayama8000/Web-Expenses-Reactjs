/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/home',
  //     },
  //   ]
  // },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['page.tsx', 'page.ts'],
  images: {
    domains: ["foqiugpmvvsehxuplcha.supabase.co"],
  },
};

export default nextConfig;
