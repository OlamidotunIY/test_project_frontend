import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // Expose to all interfaces
    port: 8080, // Ensure it's using port 8080 (or any other port you want)
  },
  preview: {
    allowedHosts: [
      'user-list-app-8glm.onrender.com', // Add your Render domain here
      'localhost',  // Localhost is usually allowed by default
    ],
  },
});
