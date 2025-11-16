import * as z from "zod";

export const currentFormatVersion = 1;
export const channelRangedFunction = z.object({
    min: z.number(),
    max: z.number(),
    functionID: z.string(),
    displayName: z.string(),
    identicalWithinRange: z.optional(z.boolean()),
    mapRangeForHuman: z.optional(z.object({
        min: z.number(),
        max: z.number()
    }))
});
export const fixtureChannelSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    description: z.optional(z.string()),
    rangedFunction: z.optional(z.array(channelRangedFunction)),
    lowerNibbleForChannel: z.optional(z.number()),
    mapRangeForHuman: z.optional(z.object({
        min: z.number(),
        max: z.number()
    }))
});
export const fixtureTypeSchema = z.object({
    channels: z.record(z.coerce.number<string>(), fixtureChannelSchema),
    displayName: z.string(),
    displayNamePlural: z.optional(z.string()),
    model: z.optional(z.string()),
    description: z.optional(z.string())
});
export type FixtureTypeSchema = z.infer<typeof fixtureTypeSchema>;
export const fixtureSchema = z.object({
    type: z.string(),
    fixtureChannels: z.record(z.string(), z.number()),
    displayName: z.optional(z.string()),
    displayNamePlural: z.optional(z.string()),
    model: z.optional(z.string()),
    description: z.optional(z.string())
});
export type FixtureSchema = z.infer<typeof fixtureSchema>;
export const fixtureGroupSchema = z.object({
    fixtures: z.array(z.string()),
    description: z.optional(z.string())
});
export type FixtureGroupSchema = z.infer<typeof fixtureGroupSchema>;
export const fixtureConfigSchema = z.object({
    formatVersion: z.number(),
    fixtureTypes: z.record(z.string(),
        fixtureTypeSchema
    ),
    fixtures: z.record(z.string(),
        fixtureSchema
    ),
    fixtureGroups: z.record(z.string(), fixtureGroupSchema)
});
export type FixtureConfig = z.infer<typeof fixtureConfigSchema>;