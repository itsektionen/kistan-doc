<script setup lang="ts">
import * as fixtureConfigUnknown from "../../../data/gen/kistanFixtures.json";
import { FixtureConfig, FixtureGroupSchema } from './fixtureConfigSchema';
import AnchoredH3 from '../ThemeComponents/AnchoredH3.vue';
const fixtureConfig = fixtureConfigUnknown as FixtureConfig;

defineProps<{
    relativePathToFixtureInfo: string,
    fixtureGroup: FixtureGroupSchema,
    luaName: string
}>()

</script>
<template>
    <AnchoredH3 :id="'fixture-group-' + luaName">
        {{ luaName }}
    </AnchoredH3>
    <table>
        <thead>
            <tr>
                <th>Fixtures in group</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fixture in fixtureGroup.fixtures">
                <td>
                    <template v-if="fixtureConfig.fixtureGroups[fixture] != undefined">
                        <RouterLink :to="'#fixture-group-' + fixture">{{ fixture }}</RouterLink>
                    </template>
                    <template v-else>
                        <RouterLink :to="relativePathToFixtureInfo + '#fixture-group-' + fixture">{{ fixture }}</RouterLink>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>