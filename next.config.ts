import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives in a subdir of a repo that has other lockfiles; pin the
  // workspace root so Turbopack doesn't infer the wrong one.
  turbopack: { root: __dirname },
};

export default nextConfig;
