import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('echarts')) {
            return 'echarts'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api/': {
        target: 'http://123.57.85.69:3000/',
        changeOrigin: false,
      },
    }
  },
  define: {
    isDev: command === 'serve'
  },
  plugins: [
    Unocss(),
    react(),
    viteMockServe(),
    svgsprites({ noOptimizeList: ['logo', 'chart', 'category', 'export', 'noty', 'calendar', 'pig'] })
  ]
}))
