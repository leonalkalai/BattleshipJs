import { defineConfig } from 'vite';

export default defineConfig({
    root: 'public',
    build: {
        outDir: '../dist', // Output directory for production build
        target: 'esnext', 
    },
    base: '/BattleshipJs/', // Replace <repository-name> with your repo name
});
