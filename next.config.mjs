/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        X_API_KEY: process.env.X_API_KEY
    }
};

export default nextConfig;
