<script setup lang="ts">
import * as lmixerLayersUnknown from "../../public/data/gen/lmixerLayers.json";
import TreeGrid from "../Tree/TreeGrid.vue";
import { TreeGridNode, TreeGridNodeConnector } from "../Tree/treeGridType.ts";
import { LayerConfigLayer, LayerToTree, type LayerConfig } from "./layerConfigSchema.ts";
const lmixerLayers = lmixerLayersUnknown as LayerConfig

const trees = lmixerLayers.layers.map((layer) => LayerToTree(layer));
</script>

<template>
    <TreeGrid v-for="tree in trees" :tree="tree"></TreeGrid>
</template>
