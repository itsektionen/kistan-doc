import { defineClientConfig } from 'vuepress/client';
import ExclusiveTo from './components/ExclusiveTo.vue';
import FixtureGroups from './components/FixtureInfo/FixtureGroups.vue';
import FixtureInfos from './components/FixtureInfo/FixtureInfos.vue';
import FixtureTypes from './components/FixtureInfo/FixtureTypes.vue';
import DrawAllLayers from './components/Layer/DrawAllLayers.vue';
import LayerTreeExplaination from './components/Layer/LayerTreeExplaination.vue';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('ExclusiveTo', ExclusiveTo);
    app.component("FixtureTypes", FixtureTypes);
    app.component("FixtureInfos", FixtureInfos);
    app.component("FixtureGroups", FixtureGroups);
    app.component("AllLayerDrawer", DrawAllLayers);
    app.component("LayerTreeExplaination", LayerTreeExplaination);
  },
  setup() {},
  layouts: {},
  rootComponents: [],
});