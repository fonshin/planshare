import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/dashboard', component: '@/pages/Dashboard' },
    { path: '/planedit', component: '@/pages/PlanEdit' },
    { path: '/planshare', component: '@/pages/PlanShare' },
  ],
  fastRefresh: {},
  outputPath: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/comment/' : '/',
});
