<script setup lang="ts">
import SpoofedH3 from '../ThemeComponents/SpoofedH3.vue';
import { FixtureGroupSchema } from './fixtureConfigSchema';

import * as fixtureConfig from "../../public/fixtureConfig.json"
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