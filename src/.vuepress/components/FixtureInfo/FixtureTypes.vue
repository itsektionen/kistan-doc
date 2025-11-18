<script setup lang="ts">
import * as fixtureConfigUnknown from "../../public/data/gen/kistanFixtures.json";
import { FixtureConfig, FixtureTypeSchema } from './fixtureConfigSchema';
import FixtureType from "./FixtureType.vue";
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;


</script>

<template>
    <template v-for="(fixtureType, fixtureTypeId) in (fixtureConfig.fixtureTypes as Record<string, FixtureTypeSchema>)">
        <FixtureType :fixture-type="fixtureType" :fixture-type-id="fixtureTypeId"></FixtureType>
    </template>
</template>