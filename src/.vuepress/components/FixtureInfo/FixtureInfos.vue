<script setup lang="ts">
import * as fixtureConfigUnknown from "../../../data/gen/kistanFixtures.json";
import { FixtureConfig, FixtureSchema } from './fixtureConfigSchema';
import FixtureInfo from "./FixtureInfo.vue";
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;

defineProps<{
    relativePathToFixtureType: string,
}>()

</script>

<template>
    <template v-for="(fixtureInfo, fixtureInfoId) in (fixtureConfig.fixtures as Record<string, FixtureSchema>)">
        <FixtureInfo :relative-path-to-fixture-type="relativePathToFixtureType" :fixture-info="fixtureInfo" :fixture-info-id="fixtureInfoId"></FixtureInfo>
    </template>
</template>