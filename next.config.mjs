/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/success',
        destination: '/app/success',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
