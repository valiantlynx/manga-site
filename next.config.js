/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
    env: {
        key: process.env.COUNT_API_KEY,
        URL: "https://pocketbase-upload-maga.vercel.app/api/",
        GA_MEASUREMENT_ID: "G-3D40VC4QXL",
    },
    images: {
        domains: [
            "gogocdn.net",
            "daisyui.com",
        ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.mpcdn.org',
            },
          ],
    },
    reactStrictMode: true,
    output: 'standalone',
}

module.exports = withPWA(nextConfig);
