<script setup lang="ts">
import { onMounted } from 'vue';
import { TreeGridNode } from './treeGridType';
import TreeNode from './TreeNode.vue';

const props = defineProps<{
    tree: TreeGridNode,
    isChild?: boolean
}>()

onMounted(() => {
    console.log(props.tree);
});

</script>

<template>
    <div :class="{layerTreeWrapper: !isChild}">
        <div class="treeDown">
            <TreeNode :node="tree" :is-top-node="true"></TreeNode>
            <div v-if="tree.children"></div>
            <template v-for="(child, childIndex) in tree.children">
                <div class="mergeConnectorGrid">
                    <div :class="{
                        connectorVerticalLine: true,
                        connectorVerticalLineThroughAll: isChild || childIndex != ((tree.children?.length ?? 0) - 1)
                    }"></div>
                    <div class="mergeConnectorNode">
                        <TreeNode :node="child"></TreeNode>
                    </div>
                    <div v-if="child.sideInput" class="connectorHorizontalLineRight"></div>
                </div>
                <template v-if="child.sideInput">
                    <TreeGrid v-if="child.sideInput.children" :tree="child.sideInput" :is-child="true"></TreeGrid>
                    <TreeNode v-else :node="child.sideInput"></TreeNode>
                </template>
            </template>
            <template v-if="isChild && tree.children">
                <div class="edgeConnectorRouter">
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.layerTreeWrapper {
    display: flex;

    background-color: var(--tree-bg);
    border: solid 2px var(--tree-border);
    border-radius: 0.5em;
    
    padding: 1em;
    margin: 1em;
    
    justify-content: center;

    overflow-x: auto;
}

.treeDown {
    --row-gap: 2em;
    --column-gap: 1em;
    --node-padding: 1em;
    --connector-node-height: 4em;
    --connector-line-width: 2px;

    display: grid;
    grid-template-columns: auto auto;

    row-gap: var(--row-gap);
    column-gap: var(--column-gap);

    justify-content: left;
    max-width: 100%;
    z-index: 2;
}

.mergeConnectorGrid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto var(--connector-node-height);
}

.mergeConnectorNode {
    grid-column: 2;
    grid-row: 2;

    justify-self: center;
    align-content: center;

    text-align: center;
}

.connectorVerticalLine {
    background-color: var(--tree-node-border);
    width: var(--connector-line-width);

    grid-column: 2;
    grid-row: 1;
    justify-self: center;

    margin-top: calc(0px - var(--row-gap));
    margin-bottom: calc(0px - var(--connector-node-height) / 2);
    z-index: -1;
}

.connectorVerticalLineThroughAll {
    margin-bottom: calc(0px - var(--connector-node-height));
}

.connectorHorizontalLineRight {
    background-color: var(--tree-node-border);
    height: var(--connector-line-width);

    grid-column: 3;
    grid-row: 2;
    align-self: center;

    margin-right: calc(0px - var(--column-gap));
}

.outputBox {
    background-color: var(--tree-node-bg);
    border: solid 2px var(--tree-node-border);
    padding-inline: 1em;
    align-content: center;
    text-align: center;
    height: var(--connector-node-height);
    grid-column: 2;
    grid-row: 2;
    border-radius: 2em;
    align-self: flex-end;
    justify-self: center;

}

.edgeConnectorRouter {
    border: solid var(--connector-line-width) var(--tree-node-border);
    margin-top: calc(0px - var(--row-gap));
    border-left: none;
    border-top: none;
    height: 2em;
    border-bottom-right-radius: 0.5em;
    margin-right: calc(50% - var(--connector-line-width) / 2);
    margin-bottom: calc((var(--connector-node-height) - var(--connector-line-width))/2);
}
</style>