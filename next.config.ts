import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  prisma: {
    schema: "app/prisma/schema.prisma",
  },
};

export default nextConfig;
