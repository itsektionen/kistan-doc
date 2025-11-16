<script setup lang="ts">
const props = defineProps<{
    id: string;
}>();
</script>
<template>
    <h2 :id="id" tabindex="-1">
        <a class="header-anchor" :href="'#' + id">
            <slot></slot>
        </a>
    </h2>
</template>