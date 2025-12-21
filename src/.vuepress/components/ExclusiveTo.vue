<script setup lang="ts">
const props = defineProps<{
    exclusiveTo: string
}>();

enum Icons {
    Kistan,
    None
}

enum ContentClasses {
    KistanExclusive = "kistan-exclusive",
    Deprecated = "deprecated-exclusive"
}

const exclusivityTypes: {
    [key: string]: {
        header: string,
        description: string,
        icon: Icons,
        contentClass: ContentClasses
    }
} = {
    KistanGeneric: {
        header: "Kistan exclusive!",
        description: "This content only applies to Kistan",
        icon: Icons.Kistan,
        contentClass: ContentClasses.KistanExclusive
    },
    LMixer: {
        header: "Kistan's LMixer exclusive",
        description: "This content only applies to kistan's instance of LMixer. It is likely the case that the code is contained in setup scripts.",
        icon: Icons.Kistan,
        contentClass: ContentClasses.KistanExclusive
    },
    LMixerAddonSuite: {
        header: "LMixer Addon Suite exclusive",
        description: "This content only applies to the LMixer Addon Suite.",
        icon: Icons.Kistan,
        contentClass: ContentClasses.KistanExclusive
    },
    LMixerAddonSuiteExtensions: {
        header: "LMixer Addon Suite Extensions exclusive",
        description: "This content only applies to the LMixer Addon Suite Extensions.",
        icon: Icons.Kistan,
        contentClass: ContentClasses.KistanExclusive
    },
    LMixerKistanExclusiveAddon: {
        header: "LMixer Kistan Exclusive Addon",
        description: "This content only applies to the LMixer Kistan_Specific Addon.",
        icon: Icons.Kistan,
        contentClass: ContentClasses.KistanExclusive
    },
    Deprecated: {
        header: "Deprecated",
        description: "The following is deprecated and should be avoided",
        icon: Icons.None,
        contentClass: ContentClasses.Deprecated
    }
}

const exclusivityInfo = exclusivityTypes[props.exclusiveTo] ?? {
    header: "Invalid exclusivity type",
    description: "The exclusiveTo property has a value of " + props.exclusiveTo + " which is not valid",
    icon: Icons.Kistan
};

</script>
<template>
    <div :class="{'content-exclusive': true, [exclusivityInfo.contentClass]: true}">
        <div class="content-exclusive-top">
            <p class="content-exclusive-header">
                <template v-if="exclusivityInfo.icon == Icons.Kistan">
                    <!-- Treasure Chest SVG from MDI-->
                    <svg class="content-treasure-chest-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M5,4H19A3,3 0 0,1 22,7V11H15V10H9V11H2V7A3,3 0 0,1 5,4M11,11H13V13H11V11M2,12H9V13L11,15H13L15,13V12H22V20H2V12Z" />
                    </svg>
                </template>
                {{ exclusivityInfo.header }}
            </p>
            <p class="content-exclusive-description">
                {{ exclusivityInfo.description }}
            </p>
        </div>
        <div class="content-exclusive-content">
            <slot>

            </slot>
        </div>
    </div>
</template>

<style>
.kistan-exclusive {    
    --exclusive-accent: var(--kistan-exclusive-accent);
    --exclusive-border: var(--kistan-exclusive-border);
    --exclusive-background: var(--kistan-exclusive-background);
    --exclusive-bg-alt: var(--kistan-exclusive-bg-alt);
}

.deprecated-exclusive {
    --exclusive-accent: var(--deprecated-exclusive-accent);
    --exclusive-border: var(--deprecated-exclusive-border);
    --exclusive-background: var(--deprecated-exclusive-background);
    --exclusive-bg-alt: var(--deprecated-exclusive-bg-alt);
}

.content-exclusive {
    --vp-c-bg-alt: var(--exclusive-bg-alt);

    border: solid 0.3em var(--exclusive-border);
    border-radius: 0.5em;
    margin-block: 0.75em;
    margin-top: 2em;
    margin-inline: -0.5em;
    background-color: var(--exclusive-border);
}

.content-exclusive-top {
    padding: 0.25em 1em;
}

.content-exclusive-content {
    padding: 0.25em 1em;
    background-color: var(--exclusive-background);
    border-radius: 0.5em;
}

.content-exclusive-header {
    color: var(--exclusive-accent);
    display: block;
    margin-block: 0.75em;
    font-weight: 600;
    line-height: 1.5;
    font-size: var(--hint-font-size);
}

.content-exclusive-description {
    line-height: 1.5;
    font-size: var(--hint-font-size);
}

.content-treasure-chest-icon {
    width: 1.5rem;
    vertical-align: text-top;
    padding-right: 1ch;
}
</style>