// Import defineConfig from vite to create a configuration object
import { defineConfig } from 'vite';
// Import react plugin from @vitejs/plugin-react to enable react support
import react from '@vitejs/plugin-react';
import path from 'path';

// Export the configuration object as default, this is the Vite configuration
export default defineConfig({
  // Configure plugins to use for this project, in this case, it's only the react plugin
  plugins: [react()],
  // Define the root of the project, where the index.html is located
  root: './',
  // Define the build directory, where the built application is placed
  build: {
    outDir: './dist',
    // Configure sourcemaps to be generated for debugging purposes
    sourcemap: true,
  },
  // Configure esbuild options, like target and jsx transformations
  esbuild: {
    // Target esnext to take advantage of the latest Javascript features
    target: 'esnext',
    // Configure the jsxFactory to be React.createElement for proper JSX transformation
    jsxFactory: 'React.createElement',
     // Configure the jsxFragment to be React.Fragment for proper JSX fragment transformation
    jsxFragment: 'React.Fragment',
  },
  // Configure how modules are resolved for the project
  resolve: {
     // Configure alias for '@' to point to './src' to enable absolute import paths
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});