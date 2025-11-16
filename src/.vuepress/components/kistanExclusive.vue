<script setup lang="ts">
const props = defineProps<{
    lmixer?: boolean
}>();

let header = "Kistan exclusive!";
let description = "This content only applies to Kistan";
if (props.lmixer) {
    header = "Kistan's LMixer exclusive";
    description = "This content only applies to kistan's instance of LMixer. It is likely the case that the the code contained in setup scripts.";
}
</script>
<template>
    <div class="kistan-exclusive">
        <div class="kistan-exclusive-top">
            <p class="kistan-exclusive-header">
                <!-- Treasure Chest SVG from MDI-->
                <svg class="kistan-treasure-chest-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M5,4H19A3,3 0 0,1 22,7V11H15V10H9V11H2V7A3,3 0 0,1 5,4M11,11H13V13H11V11M2,12H9V13L11,15H13L15,13V12H22V20H2V12Z" />
                </svg>
                {{ header }}
            </p>
            <p class="kistan-exclusive-description">
                {{ description }}
            </p>
        </div>
        <div class="kistan-exclusive-content">
            <slot>

            </slot>
        </div>
    </div>
</template>

<style>
:root {
    --exclusive-accent: rgb(101, 83, 202);
    --exclusive-border: hsl(252, 79%, 87%);
    --exclusive-background: rgb(237, 235, 255);
    --exclusive-bg-alt: rgb(217, 204, 241);
}

[data-theme=dark] {
    --exclusive-accent: #aeb5f5;
    --exclusive-border: rgb(34, 39, 68);
    --exclusive-background: rgb(23, 27, 43);
    --exclusive-bg-alt: rgb(17, 21, 37);
}

.kistan-exclusive {
    --vp-c-bg-alt: var(--exclusive-bg-alt);
    
    border: solid 0.3em var(--exclusive-border);
    border-radius: 0.5em;
    margin-block: 0.75em;
    margin-top: 2em;
    margin-inline: -0.5em;
    background-color: var(--exclusive-border);
}

.kistan-exclusive-top {
    padding: 0.25em 1em;
}
.kistan-exclusive-content {
    padding: 0.25em 1em;
    background-color: var(--exclusive-background);
    border-radius: 0.5em;
}

.kistan-exclusive-header {
    color: var(--exclusive-accent);
    display: block;
    margin-block: 0.75em;
    font-weight: 600;
    line-height: 1.5;
    font-size: var(--hint-font-size);
}

.kistan-exclusive-description {
    line-height: 1.5;
    font-size: var(--hint-font-size);
}

.kistan-treasure-chest-icon {
    width: 1.5rem;
    vertical-align: text-top;
    padding-right: 1ch;
}
</style>