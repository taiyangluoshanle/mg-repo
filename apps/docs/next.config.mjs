import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    "@mg/components",
    "@mg/ui",
    "@mg/ui-commerce",
    "@mg/utils",
    "@mg/tailwind-config",
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withMDX = createMDX();

export default withMDX(config);
