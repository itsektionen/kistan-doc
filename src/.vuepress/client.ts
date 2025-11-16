import { defineClientConfig } from 'vuepress/client'
import ExclusiveTo from './components/ExclusiveTo.vue';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('ExclusiveTo', ExclusiveTo)
  },
  setup() {},
  layouts: {},
  rootComponents: [],
});