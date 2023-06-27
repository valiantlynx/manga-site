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
        URL: "https://pocketbase-upload-maga-production.up.railway.app/api/",
        GA_MEASUREMENT_ID: "G-E1KHJ9LDW8",
        CLARITY_KEY: "h6i9jxcrem",
        YANDEX_VERIFICATION: "e2f0f2e2b0b0f2f0",
        BING_VERIFICATION: "B0B0F2E2F0F2E2B0",
        GOOGLE_VERIFICATION: "B0B0F2E2F0F2E2B0",
    },
    images: {
        domains: [
            "gogocdn.net",
            "daisyui.com",
            "localhost",
            "pocketbase-upload-maga-production.up.railway.app",
            "animevariant.org", 
            "animevariant.com",
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
