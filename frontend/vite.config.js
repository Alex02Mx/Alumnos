import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: true,      // <--- ESTA ES LA LÍNEA CLAVE: Permite conexiones externas
    port: 5173,      // Asegúrate de que el puerto coincida con el del script
    watch: {
      usePolling: true,
      interval: 100
    }
  }
})
