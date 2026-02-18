import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: true, // Temporarily disabled to resolve build issue with Next.js 15
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['recharts', 'lucide-react'],
};

export default withPWA(nextConfig);
