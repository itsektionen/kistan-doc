
export const currentFormatVersion = 1;
export type ChannelRangedFunction = {
    min: number,
    max: number,
    functionID: string,
    displayName: string,
    identicalWithinRange?: boolean,
    mapRangeForHuman?: {
        min: number,
        max: number
    }
};
export type FixtureChannelSchema = {
    id: string,
    displayName: string,
    description?: string,
    rangedFunction?: ChannelRangedFunction[],
    lowerNibbleForChannel?: number,
    mapRangeForHuman?: {
        min: number,
        max: number
    }
};
export type FixtureTypeSchema = {
    channels: Record<string, FixtureChannelSchema>,
    displayName: string,
    displayNamePlural?: string,
    model?: string,
    description?: string
};
export type FixtureSchema = {
    type: string,
    fixtureChannels: Record<string, number>,
    displayName?: string,
    displayNamePlural?: string,
    model?: string
    description?: string
};
export type FixtureGroupSchema = {
    fixtures: string[],
    description?: string
};
export type FixtureConfig = {
    formatVersion: number,
    fixtureTypes: Record<string, FixtureTypeSchema>,
    fixtures: Record<string,FixtureSchema>,
    fixtureGroups: Record<string, FixtureGroupSchema>
};