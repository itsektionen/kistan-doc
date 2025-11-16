<script setup lang="ts">
import SpoofedH3 from '../ThemeComponents/SpoofedH3.vue';

import * as fixtureConfigUnknown from "../../public/fixtureConfig.json";
import { FixtureConfig, FixtureTypeSchema } from './fixtureConfigSchema';
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;

</script>

<template>
    <template v-for="(fixtureType, fixtureTypeId) in (fixtureConfig.fixtureTypes as Record<string, FixtureTypeSchema>)">
        <SpoofedH3 :id="'fixture-type-' + fixtureTypeId">{{ fixtureType.displayName }}</SpoofedH3>
        <template v-if="fixtureType.model"><b>Model: </b>{{ fixtureType.model }}</template>
        <table>
            <thead>
                <tr>
                    <th>Channel</th>
                    <th>Function</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(channelInfo, channelID) in fixtureType.channels">
                    <th>{{ channelID }}</th>
                    <td>
                        {{ channelInfo.displayName }}
                        <div v-if="channelInfo.rangedFunction" class="fixture-channel-ranged-function">
                            <template v-for="rangedFunction in channelInfo.rangedFunction">
                                <span class="fixture-channel-ranged-function-range">
                                    <template v-if="rangedFunction.min == rangedFunction.max">
                                        {{ rangedFunction.min }}
                                    </template>
                                    <template v-else>
                                        {{ rangedFunction.min }}-{{ rangedFunction.max }}
                                    </template>
                                </span>
                                <span>
                                    {{ rangedFunction.displayName }}
                                </span>
                            </template>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>
</template>

<style>
.fixture-channel-ranged-function-range {
    display: inline-block;
    background-color: #00000057;
    padding: 0.2em;
    border-radius: 0.2em;
    margin: 0.2em;
    text-align: center;
}

.fixture-channel-ranged-function {
    display: grid;
    grid-template-columns: 12ch auto;
    align-items: center;
    column-gap: 0.5em;
}
</style>