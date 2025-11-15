<script setup lang="ts">
const props = defineProps<{
    lmixer?: boolean
}>();

let header = "Kistan exclusive!";
let description = "This content only applies to kistan";
if (props.lmixer) {
    header = "Kistan's LMixer exclusive";
    description = "This content only applies to kistan's instance of LMixer, most likely it is contained in the setup scripts.";
}
</script>
<template>
    <div class="kistan-exclusive">
        <!-- Treasure Chest SVG from MDI-->
         
        <p class="exclusive-header">
            <svg class="kistan-treasure-chest-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,4H19A3,3 0 0,1 22,7V11H15V10H9V11H2V7A3,3 0 0,1 5,4M11,11H13V13H11V11M2,12H9V13L11,15H13L15,13V12H22V20H2V12Z" />
            </svg>
            {{header}}
        </p>
        <p class="exclusive-description">
        {{description}}
        </p>
    </div>
</template>

<style>

:root {
    --exclusive-accent: rgb(101, 83, 202);
    --exclusive-background: hsl(252, 79%, 87%);
}

[data-theme=dark] {
    --exclusive-accent: #aeb5f5;
    --exclusive-background: rgb(34, 39, 68);
}

.kistan-exclusive {
    background-color: var(--exclusive-background);
    border-radius: 0.5em;
    padding: 0.25em 1em;
    margin-block: 0.75em;
}
.exclusive-header {
    color: var(--exclusive-accent);
    display: block;
    margin-block: 0.75em;
    font-weight: 600;
    line-height: 1.5;
    font-size: var(--hint-font-size);
}
.exclusive-description {
    line-height: 1.5;
    font-size: var(--hint-font-size);
}
.kistan-treasure-chest-icon {
    width: 1.5rem;
    vertical-align: text-top;
    padding-right: 1ch;
}
</style>