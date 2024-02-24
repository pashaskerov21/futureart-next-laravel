/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['127.0.0.1'],
    },
    env: {
        BASE_URL: process.env.BASE_URL
    },
}


module.exports = nextConfig;
