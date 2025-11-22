<script lang="ts" setup>
import AnchoredH3 from '../ThemeComponents/AnchoredH3.vue';
import { TreeGridNode, TreeGridNodeConnector } from './treeGridType';

const props = defineProps<{
    node: TreeGridNode | TreeGridNodeConnector,
    isTopNode?: boolean
}>()
</script>
<template>
    <template v-if="node.nodeType == 'dot' || node.nodeType == undefined">
        <div class="dotNode">
        </div>
    </template>
    <template v-else-if="node.nodeType == 'header'">
        <div :class="{bigNode:true, topNode: isTopNode}">
            <AnchoredH3 :id="node.content?.text ?? ''">{{ node.content?.text }}</AnchoredH3>
        </div>
    </template>
    <template v-else-if="node.nodeType == 'big'">
        <div :class="{bigNode:true, topNode: isTopNode}">
            {{ node.content?.text }}
        </div>
    </template>
    <template v-else-if="node.nodeType == 'combine'">
        <div :class="{connectorNode:true, topNode: isTopNode}">
            {{ node.content?.text }}
        </div>
    </template>
</template>

<style scoped>
.dotNode {
    background-color: var(--tree-node-bg);
    border: solid 2px var(--tree-node-border);
    border-radius: 0.5em;

    width: 0.4em;
    height: 0.4em;

    text-align: center;
}

.bigNode {
    background-color: var(--tree-node-bg);
    border: solid 2px var(--tree-node-border);
    border-radius: 0.5em;

    padding: var(--node-padding);
    min-width: 10ch;
    width: fit-content;

    text-align: center;
}
.topNode {
    justify-self: center;
}
.bigNode > h3 {
    font-size: 1em;

    margin: 0 !important;
    padding: 0 !important;

    /* Compensate for the navbar header */
    margin-top: calc(-1em - var(--header-offset)) !important;
    padding-top: calc(1em + var(--header-offset)) !important;
}

.connectorNode {
    background-color: var(--tree-node-bg);
    border: solid 2px var(--tree-node-border);

    padding: var(--node-padding);

    text-align: center;
}
</style>