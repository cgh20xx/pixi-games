import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// vite-tsconfig-paths: https://github.com/aleclarson/vite-tsconfig-paths
// 給 vite 有能力解析 imports using TypeScript's path mapping.
// 讓 vite 看懂 tsconfig 裡的 baseUrl。
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // build 出的資源改為相對路徑
  plugins: [react(), tsconfigPaths()]
});
