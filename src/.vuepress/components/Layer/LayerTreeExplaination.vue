<script setup lang="ts">
import TreeGrid from '../Tree/TreeGrid.vue';
import { TreeGridNode } from '../Tree/treeGridType';

const props = defineProps<{
    explanationName: string
}>();

const explanations: { [key: string]: TreeGridNode } = {
    "operandLayout": {
        nodeType: "big",
        content: {
            text: "Operand A"
        },
        children: [
            {
                content: {
                    text: "Operator"
                },
                nodeType: "connector",
                sideInput: {
                    content: {
                        text: "Operand B"
                    },
                    nodeType: "big"
                }
            },
            {
                content: {
                    text: "Output"
                },
                nodeType: "big"
            }
        ]
    }
}
</script>
<template>
    <TreeGrid :tree="explanations[explanationName]"></TreeGrid>
</template>