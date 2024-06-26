/** @type {import('next').NextConfig} */
const nextConfig = {
    /*async headers() {
        return [
            {
                // matching all API routes
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://api.carpincho.dev, https://github.com" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    crossOrigin: 'anonymous',
    headers: {
        'Access-Control-Allow-Origin': '*', // Specify allowed origins
        // Other CORS headers as needed
    },
    crossOrigin: 'anonymous',
    */
    env: {
        NEXT_PUBLIC_URL_API: process.env.URL_API,
        NEXT_PUBLIC_COOKIE_NAME: process.env.COOKIE_NAME

    },
    reactStrictMode: false,
}

module.exports = nextConfig
