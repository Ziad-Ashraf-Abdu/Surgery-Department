// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { gracefulify } from 'graceful-fs';

// 1) Patch Node’s fs so extra open() calls queue instead of erroring on EMFILE
gracefulify(require('fs'));

export default defineConfig({
    plugins: [react()],
    base: './',

    server: {
        watch: {
            usePolling: true,
            interval: 100,
        },
    },

    optimizeDeps: {
        include: ['recharts'],
    },

    build: {
        outDir: 'docs',        // ← write the build into docs/
        emptyOutDir: true,     // ← wipes docs/ on each build
        // 2) Throttle Rollup’s parallel file operations
        rollupOptions: {
            maxParallelFileOps: 100,
            output: {
                // preserve your existing manualChunks setting
                manualChunks: undefined,
            },
        },

        // 3) Skip crawling @mui/icons-material entirely
        commonjsOptions: {
            exclude: [/node_modules\/@mui\/icons-material/],
        },
    },
});
