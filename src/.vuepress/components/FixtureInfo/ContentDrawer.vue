<script setup lang="ts">
import { ref } from 'vue';
const showContents = ref(false);
function onClick() {
    showContents.value = !showContents.value;
}
</script>
<template>
    <div :class="{'content-drawer-container': true,
                 'collapsed-content-drawer': !showContents}">
        <div class="content-drawer-title-bar" :onclick="onClick">
            <span>
                <slot name="header"></slot>
            </span>
            <!-- Chevron from MDI -->
            <button class="content-drawer-chevron">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
            </button>
        </div>
        <div class="content-drawer-contents" :aria-hidden="!showContents">
            <slot name="main"></slot>
        </div>
    </div>
</template>
<style>
.content-drawer-container {
    background-color: var(--content-drawer-bg);
    border: solid 2px var(--content-drawer-border-color);
    width: fit-content;
    padding: 0.5em 1em;
    margin: 1em -1em;
    border-radius: 0.5em;
}

.content-drawer-title-bar {
    height: 1.5em;
    margin: -1em;
    padding: 1em;
    margin-bottom: 1em;
    display: grid;
    grid-template-columns: auto 1fr;
    cursor: pointer;
    user-select: none;
}

.content-drawer-container:has(.content-drawer-title-bar:hover) {
    background-color: var(--content-drawer-bg-hover);
    border: solid 2px var(--vp-c-accent);
}


.collapsed-content-drawer {
    height: 1.5em;
    margin-bottom: 0em;
    background-color: transparent;
    border: solid 2px transparent;
}

.collapsed-content-drawer .content-drawer-contents {
    display: none;
}

.content-drawer-chevron {
    width: 2em;
    padding: 0px;
    margin: 0px;
    border: none;
    background-color: transparent;
    display: block;
    margin-left: 0.5em;
    cursor: pointer;
}
.content-drawer-chevron > svg {

    transform: rotate(-180deg);
    transform-origin: 50% 50%;
    transition: transform 500ms;
    width: 1.5em;
}

.collapsed-content-drawer .content-drawer-chevron>svg {
    transform: none;
}

.content-drawer-container table {
    background-color: var(--vp-c-bg);
    width: fit-content;
}
</style>