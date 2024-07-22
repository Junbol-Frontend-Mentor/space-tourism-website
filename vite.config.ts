import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',// Specify the output directory
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  base: '/space-tourism-website/', // Ensuring this matches your project path
});

//---Notes on why was "base" added here:

/* 
The base configuration in the vite.config.ts file is used by Vite to set the base path for your application. This base path is necessary for correctly serving the application and handling routes when deployed to a subdirectory, like on GitHub Pages.

Here’s what it does and how it fits into your project:

What base Does
Vite Configuration: The base path in Vite ensures that all assets and links are correctly prefixed with the base path when your project is built. This is especially important when deploying to GitHub Pages, as your project will be served from a subdirectory (e.g., https://junbol-frontend-mentor.github.io/space-tourism-website/).

Route Handling: It ensures that the routing in your application works correctly by prefixing all paths with the base URL. This helps the router (React Router in this case) to correctly interpret the URLs.

How It Relates to GitHub Pages
When you deploy your application to GitHub Pages, it is served from a subdirectory of your GitHub Pages domain. The base path ensures that the application correctly handles paths and assets relative to this subdirectory.

Scenario Without import.meta.env.BASE_URL
If you don't add import.meta.env.BASE_URL and directly use fetch('data.json'), the fetch request assumes that data.json is in the same directory as the current script (e.g., Satellite.tsx).
When the user navigates to https://junbol-frontend-mentor.github.io/space-tourism-website/#/space-tourism-website/destination-page, the fetch request would fail because data.json is not located relative to the script's location within the nested route.

Scenario With import.meta.env.BASE_URL
By adding import.meta.env.BASE_URL to the fetch request, you ensure that the fetch request is relative to the base URL configured in vite.config.ts.
This dynamically adjusts the path to data.json based on the deployment environment.
For example, the fetch request becomes fetch('https://junbol-frontend-mentor.github.io/space-tourism-website/data.json'), ensuring it correctly fetches the data.json file from the root directory of the deployed site, no matter which nested route is currently active.

When to Use import.meta.env.BASE_URL
Fetching Data: Whenever you fetch data from a local JSON file or other static assets that are part of your project.
Loading Images/Videos: When loading images, videos, or other media files that are stored in your project's public directory.*/
