<script setup lang="ts">
const props = defineProps<{
    id: string;
}>();
</script>
<template>
    <h3 :id="id" tabindex="-1">
        <a class="header-anchor" :href="'#' + id">
            <slot></slot>
        </a>
    </h3>
</template>