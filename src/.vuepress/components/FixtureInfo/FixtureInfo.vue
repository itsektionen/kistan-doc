<script setup lang="ts">
import * as fixtureConfigUnknown from "../../../lights/fixtureConfig.json";
import { FixtureConfig, FixtureSchema, FixtureTypeSchema } from './fixtureConfigSchema';
import AnchoredH3 from '../ThemeComponents/AnchoredH3.vue';
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;

defineProps<{
    relativePathToFixtureType: string,
    fixtureInfoId: string,
    fixtureInfo: FixtureSchema
}>()

function GetDisplayName(fixtureInfo: FixtureSchema) {
    let displayName = fixtureInfo.displayName;
    if (Object.keys(fixtureInfo.fixtureChannels).length != 1) {
        if (fixtureInfo.displayNamePlural) {
            displayName = fixtureInfo.displayNamePlural;
        } else {
            displayName += "s";
        }
    }
    return displayName;
}
function GetFixtureType(fixtureInfo: FixtureSchema) {
    return (fixtureConfig.fixtureTypes)[fixtureInfo.type]
}
function GetNumberOfChannels(fixtureType: FixtureTypeSchema) {
    return Object.keys((fixtureType?.channels ?? {})).length;
}
</script>
<template>
        <AnchoredH3 :id="'fixture-info-' + fixtureInfoId">{{ GetDisplayName(fixtureInfo) }}</AnchoredH3>
        <b>Fixture Type:</b> <a :href="relativePathToFixtureType + '#fixture-type-' + fixtureInfo.type">{{
            GetFixtureType(fixtureInfo)?.displayName }}</a>
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
                    <td v-if="GetNumberOfChannels(GetFixtureType(fixtureInfo)) == 1">
                        {{ fixtureChannel }}
                    </td>
                    <td v-else>
                        {{ fixtureChannel }}-{{ fixtureChannel + GetNumberOfChannels(GetFixtureType(fixtureInfo)) - 1 }}
                    </td>
                </tr>
            </tbody>
        </table>
</template>