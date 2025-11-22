<script setup lang="ts">
import * as lmixerLayersUnknown from "../../../data/gen/lmixerLayers.json";
import TreeGrid from "../Tree/TreeGrid.vue";
import { TreeGridNode, TreeGridNodeConnector } from "../Tree/treeGridType.ts";
import { LayerConfigLayer, type LayerConfig } from "./layerConfigSchema.ts";
const lmixerLayers = lmixerLayersUnknown as LayerConfig

function LayerToTreeRecursive(layer: LayerConfigLayer): TreeGridNodeConnector {
    if (layer.type == "alpha_data_layer") {
        const alpha_layer: TreeGridNodeConnector = {
            nodeType: "dot",
            sideInput: {
                content: {
                    text: layer.name + "_alpha"
                },
                nodeType: "header"
            }
        }
        const children = (layer.children ?? [])?.map((x) => LayerToTreeRecursive(x));
        return {
            nodeType: "connector",
            content: {
                text: "Alpha Mix",
            },
            sideInput: {
                content: {
                    text: layer.name
                },
                nodeType: "header",
                children: [alpha_layer].concat(children)
            },
        }
    }
    return {
        nodeType: "connector",
        content: {
            text: layer.op,
        },
        sideInput: {
            content: {
                text: layer.name
            },
            nodeType: "header",
            children: layer.children?.map((x) => LayerToTreeRecursive(x))
        }
    }
}
function LayerToTree(layer: LayerConfigLayer): TreeGridNode {
    if (layer.type == "alpha_data_layer") {
        throw "Root node on layer cannot be alpha-data-layer"
    }
    return {
        content: {
            text: layer.name,
        },
        nodeType: "header",
        children: layer.children?.map((x) => LayerToTreeRecursive(x))
    }

}

const trees = lmixerLayers.layers.map((layer) => LayerToTree(layer));
</script>

<template>
    <TreeGrid v-for="tree in trees" :tree="tree"></TreeGrid>
</template>
