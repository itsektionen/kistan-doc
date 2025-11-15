import { defineClientConfig } from 'vuepress/client'
import KistanExclusive from './components/kistanExclusive.vue';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('KistanExclusive', KistanExclusive)
  },
  setup() {},
  layouts: {},
  rootComponents: [],
});