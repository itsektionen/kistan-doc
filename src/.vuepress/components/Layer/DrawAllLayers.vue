<script setup lang="ts">
import * as lmixerLayersUnknown from "../../../data/gen/lmixerLayers.json";
import AnchoredH2 from "../ThemeComponents/AnchoredH2.vue";
import TreeGrid from "../Tree/TreeGrid.vue";
import { TreeGridNode, TreeGridNodeConnector } from "../Tree/treeGridType.ts";
import { LayerConfigLayer, LayerToTree, type LayerConfig } from "./layerConfigSchema.ts";
const lmixerLayers = lmixerLayersUnknown as LayerConfig

const trees = lmixerLayers.layers.map((layer) => LayerToTree(layer));
</script>

<template>
    <template v-for="tree in trees">
        <AnchoredH2 :id="tree.content.text + '-layer-tree'">{{tree.content.text}} Layer Tree</AnchoredH2>
        <TreeGrid :tree="tree"></TreeGrid>
    </template>
</template>
