<script setup lang="ts">
import { type FixtureTypeSchema } from "./fixtureConfigSchema";
import FixtureType from "./FixtureType.vue";
import FixtureInfo from "./FixtureInfo.vue";
import SpoofedH2 from "../ThemeComponents/SpoofedH2.vue";
import FixtureGroup from "./FixtureGroup.vue";

import * as fixtureConfig from "../../public/fixtureConfig.json"
</script>

<template>
    <SpoofedH2 id="fixture-types">Fixture Types</SpoofedH2>
    <FixtureType v-for="(fixtureType, fixtureTypeKey) in fixtureConfig.fixtureTypes" :fixture-type="fixtureType"
        :fixture-type-id="fixtureTypeKey">
    </FixtureType>
    <SpoofedH2 id="fixtures">Fixtures</SpoofedH2>
    <FixtureInfo v-for="(fixtureInfo, fixtureInfokey) in fixtureConfig.fixtures" :fixture-info="fixtureInfo"
        :fixture-info-id="fixtureInfokey" :fixture-type="(fixtureConfig.fixtureTypes as {[key: string]: FixtureTypeSchema})[fixtureInfo.type]">
    </FixtureInfo>
    <SpoofedH2 id="fixture-groups">Fixture Groups</SpoofedH2>
    <FixtureGroup v-for="(fixtureGroup, luaName) in fixtureConfig.fixtureGroups" :fixture-group="fixtureGroup"
        :lua-name="luaName">
    </FixtureGroup>
</template>