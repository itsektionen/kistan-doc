<script setup lang="ts">
import SpoofedH3 from '../ThemeComponents/SpoofedH3.vue';
import { FixtureGroupSchema } from './fixtureConfigSchema';

const props = defineProps<{
    luaName: string,
    fixtureGroup: FixtureGroupSchema
}>();
</script>
<template>
    <SpoofedH3 :id="'fixture-group-' + luaName">
        {{luaName}}
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