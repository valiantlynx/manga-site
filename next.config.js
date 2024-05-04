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
        URL: "http://localhost:3004/api/",
        GA_MEASUREMENT_ID: "G-E1KHJ9LDW8",
    },
    images: {
        domains: [
            "daisyui.com",
            "api.animevariant.org",
            "localhost:8080"
        ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.xfspp.com',
            },
          ],
    },
    reactStrictMode: true,
    output: 'standalone',
}

module.exports = withPWA(nextConfig);
