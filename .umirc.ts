import { defineConfig } from 'umi';

export default defineConfig({
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/dashboard', component: '@/pages/Dashboard' },
    { path: '/edit', component: '@/pages/PlanEdit' },
    { path: '/share', component: '@/pages/PlanShare' },
  ],
  fastRefresh: {},
  outputPath: 'docs',
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://fonshin.github.io/planshare/'
      : '/',
});
