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
        URL: "https://uploader-valiantlynxz.b4a.run/api/",
        GA_MEASUREMENT_ID: "G-E1KHJ9LDW8",
        CLARITY_KEY: "h6i9jxcrem",
    },
    images: {
        domains: [
            "gogocdn.net",
            "daisyui.com",
            "localhost",
            "pocketbase-upload-maga-production.up.railway.app",
            "uploader-valiantlynxz.b4a.run"
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
