<script setup lang="ts">
import SpoofedH3 from '../ThemeComponents/SpoofedH3.vue';
import * as fixtureConfigUnknown from "../../public/fixtureConfig.json"
import { FixtureConfig, FixtureSchema, FixtureTypeSchema } from './fixtureConfigSchema';
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;

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
    <template v-for="(fixtureInfo, fixtureInfoId) in (fixtureConfig.fixtures as Record<string, FixtureSchema>)">
        <SpoofedH3 :id="'fixture-info-' + fixtureInfoId">{{ GetDisplayName(fixtureInfo) }}</SpoofedH3>
        <b>Fixture Type:</b> <a :href="'#fixture-type-' + fixtureInfo.type">{{ GetFixtureType(fixtureInfo)?.displayName }}</a>
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
                <th>Lua Name</th>
                <th>DMX Channels</th>
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
</template>