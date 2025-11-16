<script setup lang="ts">
import * as fixtureConfigUnknown from "../../../lights/fixtureConfig.json";
import { FixtureConfig, FixtureSchema, FixtureTypeSchema } from './fixtureConfigSchema';
import AnchoredH3 from '../ThemeComponents/AnchoredH3.vue';
import FixtureType from "./FixtureType.vue";
import FixtureTypeDropdown from "./ContentDrawer.vue";
import ContentDrawer from "./ContentDrawer.vue";
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;

const props = defineProps<{
    relativePathToFixtureType: string,
    fixtureInfoId: string,
    fixtureInfo: FixtureSchema
}>()

let displayName = props.fixtureInfo.displayName;
if (Object.keys(props.fixtureInfo.fixtureChannels).length != 1) {
    if (props.fixtureInfo.displayNamePlural) {
        displayName = props.fixtureInfo.displayNamePlural;
    } else {
        displayName += "s";
    }
}

const fixtureType = (fixtureConfig.fixtureTypes)[props.fixtureInfo.type]
const numberOfChannels = Object.keys((fixtureType?.channels ?? {})).length;
</script>
<template>
    <AnchoredH3 :id="'fixture-info-' + fixtureInfoId">{{ displayName }}</AnchoredH3>
    <ContentDrawer>
        <template v-slot:header>
            <b>Fixture Type:</b> <RouterLink :to="relativePathToFixtureType + '#fixture-type-' + props.fixtureInfo.type">{{
                fixtureType.displayName }}</RouterLink>
        </template>
        <template v-slot:main>
            <FixtureType :is-dropdown="true" :fixture-type="fixtureType" :fixture-type-id="props.fixtureInfo.type">
            </FixtureType>
        </template>
    </ContentDrawer>
    <template v-if="fixtureInfo.model">
        <br />
        <b>Model: </b>{{ fixtureInfo.model }}
    </template>
    <template v-if="fixtureInfo.description">
        <br />
        {{ fixtureInfo.description }}
    </template>

    <table>
        <thead>
            <tr>
                <th>Lua Name</th>
                <th>DMX Channels</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(fixtureChannel, fixtureKey) in fixtureInfo.fixtureChannels">
                <td :id="'fixture-group-' + fixtureKey">
                    {{ fixtureKey }}
                </td>
                <td v-if="numberOfChannels == 1">
                    {{ fixtureChannel }}
                </td>
                <td v-else>
                    {{ fixtureChannel }}-{{ fixtureChannel + numberOfChannels - 1 }}
                </td>
            </tr>
        </tbody>
    </table>
</template>