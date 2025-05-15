import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://sim-assignment-csit314-9e613de15308.herokuapp.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'C:/SIM/CSIT314-SoftwareMethodology/Assignment/frontend/src/setupTests.js',
  },
});
