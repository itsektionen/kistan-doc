import { defineClientConfig } from 'vuepress/client'
import ExclusiveTo from './components/ExclusiveTo.vue';
import FixtureType from './components/FixtureInfo/FixtureType.vue';
import FixtureInfo from './components/FixtureInfo/FixtureInfo.vue';
import FixtureGroup from './components/FixtureInfo/FixtureGroup.vue';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('ExclusiveTo', ExclusiveTo);
    app.component("FixtureType", FixtureType);
    app.component("FixtureInfo", FixtureInfo);
    app.component("FixtureGroup", FixtureGroup);
  },
  setup() {},
  layouts: {},
  rootComponents: [],
});