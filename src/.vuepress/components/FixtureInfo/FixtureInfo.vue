<script setup lang="ts">
import { object } from 'zod';
import { FixtureSchema, FixtureTypeSchema } from './fixtureConfigSchema';
import SpoofedH3 from '../ThemeComponents/SpoofedH3.vue';

const props = defineProps<{
    fixtureInfo: FixtureSchema,
    fixtureType: FixtureTypeSchema | undefined,
    fixtureInfoId: string
}>();

let displayName = props.fixtureInfo.displayName;
if (Object.keys(props.fixtureInfo.fixtureChannels).length != 1) {
    if (props.fixtureInfo.displayNamePlural) {
        displayName = props.fixtureInfo.displayNamePlural;
    } else {
        displayName += "s";
    }
}
const numberOfChannels = Object.keys((props.fixtureType?.channels ?? {})).length;
</script>
<template>
    <SpoofedH3 :id="'fixture-info-' +fixtureInfoId">{{ displayName }}</SpoofedH3>
    <b>Fixture Type:</b> <a :href="'#fixture-type-' + fixtureInfo.type">{{ fixtureType?.displayName }}</a>
    <template v-if="fixtureInfo.model">
        <br/>
        <b>Model: </b>{{fixtureInfo.model}}
    </template>
    <template v-if="fixtureInfo.description">
        <br/>
        {{fixtureInfo.description}}
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
                <td v-if="numberOfChannels == 1">
                    {{ fixtureChannel }}
                </td>
                <td v-else>
                    {{ fixtureChannel }}-{{ fixtureChannel + numberOfChannels - 1}}
                </td>
            </tr>
        </tbody>
    </table>
</template>