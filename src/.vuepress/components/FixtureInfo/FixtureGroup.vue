<script setup lang="ts">
import SpoofedH3 from '../ThemeComponents/SpoofedH3.vue';
import * as fixtureConfigUnknown from "../../public/fixtureConfig.json";
import { FixtureConfig, FixtureGroupSchema } from './fixtureConfigSchema';
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;
</script>
<template>
    <template v-for="(fixtureGroup, luaName) in (fixtureConfig.fixtureGroups as Record<string, FixtureGroupSchema>)">
        <SpoofedH3 :id="'fixture-group-' + luaName">
            {{ luaName }}
        </SpoofedH3>
        <table>
            <thead>
                <tr>
                    <th>Fixtures in group</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="fixture in fixtureGroup.fixtures">
                    <td>
                        <a :href="'#fixture-group-' + fixture">{{ fixture }}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>
</template>