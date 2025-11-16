import { defineClientConfig } from 'vuepress/client'
import ExclusiveTo from './components/ExclusiveTo.vue';
import FixtureConfigVisualizer from './components/FixtureInfo/FixtureConfigLoader.vue';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('ExclusiveTo', ExclusiveTo);
    app.component("FixtureConfigVisualizer", FixtureConfigVisualizer);
  },
  setup() {},
  layouts: {},
  rootComponents: [],
});