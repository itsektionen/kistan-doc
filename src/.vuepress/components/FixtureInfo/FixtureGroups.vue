<script setup lang="ts">
import * as fixtureConfigUnknown from "../../public/data/gen/kistanFixtures.json";
import { FixtureConfig, FixtureGroupSchema } from './fixtureConfigSchema';
import FixtureGroup from "./FixtureGroup.vue";
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;

defineProps<{
    relativePathToFixtureInfo: string
}>()

</script>

<template>
    <template v-for="(fixtureGroup, luaName) in (fixtureConfig.fixtureGroups as Record<string, FixtureGroupSchema>)">
        <FixtureGroup :fixture-group="fixtureGroup" :lua-name="luaName"
            :relative-path-to-fixture-info="relativePathToFixtureInfo"></FixtureGroup>
    </template>
</template>