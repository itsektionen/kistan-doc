<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from "vue";
import * as z from "zod";
import { currentFormatVersion, FixtureConfig, fixtureConfigSchema } from "./fixtureConfigSchema";
import FixtureType from "./FixtureType.vue";
import FixtureInfo from "./FixtureInfo.vue";
import SpoofedH2 from "../ThemeComponents/SpoofedH2.vue";
import FixtureGroup from "./FixtureGroup.vue";

enum ProgressStatuses {
    StartingLoad,
    Loading,
    InvalidData,
    FailedToLoad,
    LoadComplete
}
let errorMessage: Ref<string> = ref("");
let progressStatus: Ref<ProgressStatuses> = ref(ProgressStatuses.StartingLoad);
let parsedData: Ref<FixtureConfig | null> = ref(null);
async function LoadFixtureConfig() {
    try {
        progressStatus.value = ProgressStatuses.Loading;
        const data = await fetch("fixtureConfig.json");
        const jsonData = await data.json();
        const zodSafeData = await z.safeParseAsync(fixtureConfigSchema, jsonData);
        if (!zodSafeData.success) {
            errorMessage.value = zodSafeData.error.message;
            progressStatus.value = ProgressStatuses.InvalidData;
            return;
        }
        if (zodSafeData.data.formatVersion != currentFormatVersion) {
            errorMessage.value = "Wrong format version, expected " + currentFormatVersion + " got " + zodSafeData.data.formatVersion;
            progressStatus.value = ProgressStatuses.InvalidData;
            return;
        }

        parsedData.value = zodSafeData.data;
        progressStatus.value = ProgressStatuses.LoadComplete;

        console.log(parsedData.value);
    } catch (_e) {
        progressStatus.value = ProgressStatuses.FailedToLoad;
        errorMessage.value = "" + _e;
    }
}
onMounted(() => {
    LoadFixtureConfig();
});
</script>

<template>
    <template v-if="progressStatus == ProgressStatuses.StartingLoad">
        Starting Load
    </template>
    <template v-else-if="progressStatus == ProgressStatuses.Loading">
        Loading
    </template>
    <template v-else-if="progressStatus == ProgressStatuses.InvalidData">
        Invalid Data:<br />
        {{ errorMessage }}
    </template>
    <template v-else-if="progressStatus == ProgressStatuses.FailedToLoad">
        Failed To Load:<br />
        {{ errorMessage }}
    </template>
    <template v-else-if="progressStatus == ProgressStatuses.LoadComplete">
        <SpoofedH2 id="fixture-types">Fixture Types</SpoofedH2>
        <FixtureType v-for="(fixtureType, fixtureTypeKey) in parsedData?.fixtureTypes" :fixture-type="fixtureType"
            :fixture-type-id="fixtureTypeKey">
        </FixtureType>
        <SpoofedH2 id="fixtures">Fixtures</SpoofedH2>
        <FixtureInfo v-for="(fixtureInfo, fixtureInfokey) in parsedData?.fixtures" 
        :fixture-info="fixtureInfo" :fixture-info-id="fixtureInfokey" :fixture-type="parsedData?.fixtureTypes[fixtureInfo.type]">
        </FixtureInfo>
        <SpoofedH2 id="fixture-groups">Fixture Groups</SpoofedH2>
        <FixtureGroup v-for="(fixtureGroup, luaName) in parsedData?.fixtureGroups"
        :fixture-group="fixtureGroup" :lua-name="luaName">
        </FixtureGroup>
    </template>
    <template v-else>
        INVALID LOADING STATE
    </template>
</template>