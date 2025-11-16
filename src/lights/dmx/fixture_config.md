# Fixture Config File

All fixtures accessable in LMixer should also be in a config file, located [here](../fixtureConfig.json).

:::note
Currently, the vast majority of the fixtures on the master layer are listed here, other layers are not listed.
:::

This file exists reduce maintenance for future projects. Instead of all of the projects having their own list
of the fixtures in kistan, and having to update every project for every fixture, it is centralized into a
single config file which needs to be maintained.

## ID Naming

IDs should always follow snake_case. Capital letters are allowed in names and abreviations.

When including the model name, the format is `[role/category (wash, wallspot, etc)]_[model name (abreviations AOK)]`

### Channel naming

There are some default names that should be used when applicable:

| Name            | Usage                      |
| --------------- | -------------------------- |
| col_red         | Red Color Component        |
| col_green       | Green Color Component      |
| col_blue        | Blue Color Component       |
| col_white       | White Color Component      |
| col_amber       | Amber Color Component      |
| col_UV          | UV Color Component         |
| col_temperature | Color Temperature          |
| dimmer          | Dimmers                    |
| strobe          | Strobing functionality     |
| tilt            | Tilting movements          |
| pan             | Panning movements          |
| prog_macro      | Macros, or similar presets |
| prog_mode       | Modes                      |
| prog_color      | Color presets              |
| relay           | Relays                     |

The `prog_` prefix (short for program\_), is used for preprogrammed functions, such as color preset and movement paths that are built in.

### Ranged functions

Some channels are decimated into smaller chunks, for instance a relay might use 8 bits, but only has two states.
Strobing speed for lights tend to have a deadzone, for both of these, a "ranged" function is suitable.
(in this case ranged means divided into ranges)

Ranged functions can _in general_ do their own system, every model is unique after all,
however, there are some recommended names to use _if applicable_:

| Name            | Usage                                                                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled        | This should be used for disabling a function. As an example, if a fixture has light macros, then the value use which disabled the macro functionality should have the ID `disabled` |
| off             | When something is off, such as a relay                                                                                                                                              |
| on              | When something is on, such as a relay                                                                                                                                               |
| set             | Should only be used when the ranged function is `disabled`.                                                                                                                         |
| sound_sensitive | For sound sensitive matching of syncing to sound.                                                                                                                                   |
| blackout        | If the color output is set to black                                                                                                                                                 |

When a channel is a lower nibble, simply append `_lower` to the name.

## Schema

```ts
export const currentFormatVersion = 1;

// The json file
export type FixtureConfig = {
  // The version of the config format. Minor additions can be
  // made without updating.
  // The number increase of breaking changes
  formatVersion: number;

  // The fixtures "types", a type can be reused among multiple
  // fixtures, most commonly this is used for multiple instances
  // of the same model
  // The key is the id of the string
  fixtureTypes: Record<string, FixtureTypeSchema>;

  // The fixtures, the key is only for categorization.
  fixtures: Record<string, FixtureSchema>;

  // Fixture groups are collections of fixtures and/or groups,
  // The key is the fixtureGroups id/lua name
  // Should always be ordered such the dependencies are always
  // earlier in the .json file.
  fixtureGroups: Record<string, FixtureGroupSchema>;
};

export type FixtureTypeSchema = {
  // The human readable display name for the fixture
  displayName: string;

  // The plural form of the displayName, if left blank, the plural
  // form is obtained by appendning "s". Useful of "shelf"->"shelves"
  displayNamePlural?: string;

  // The model/product name of the fixture
  model?: string;

  // Exta information about the fixture
  description?: string;

  // What each DMX channel maps to. There should be exactly one
  // entry per channel, and nothing else. The key is the channels
  // index, "1", "2", "3" (1-indexed)
  channels: Record<string, FixtureChannelSchema>;
};

// The information about a DMX channel
export type FixtureChannelSchema = {
  // The "id" of the DMX channel, this is used for identification
  // of what it does. See fixture_config.md for more info
  id: string;

  // Human readable name
  displayName: string;

  // Extra information about what this channel does
  description?: string;

  // If a 16bit property exists, setting this marks that this is
  // the lower 8bit of the 16bit value. The value of
  // lowerNibbleForChannel is the channel that is the upper 8bits
  lowerNibbleForChannel?: number;

  // Maps the 0-255 range onto another range when displaying,
  // Most notable use case is rotations, were mapping from [0-255]
  // to [0 degrees, 540 degrees].
  mapRangeForDisplay?: {
    min: number;
    max: number;
  };

  // Some channels are decimated into smaller chunks, for instance
  // a relay might use 8 bits, but only has two states.
  // Strobing speed for lights tend to have a deadzone, for both of
  // these, a ranged function is suitable.
  rangedFunction?: ChannelRangedFunction[];
};

export type ChannelRangedFunction = {
  // Lowest value [inclusive] that this "mode" applies to
  min: number;

  // Highest value [inclusive] that this "mode" applies to
  max: number;

  // The "id" of the function, "disabled", "set", "off", "on",
  // are common values, See fixture_config.md.
  // Note: Multiple ranges can use the same function id,
  // for instance, if [0, 8] and [248, 255] both do the same
  // thing.
  functionID: string;

  // Human readable name
  displayName: string;

  // If true, all values within the range behave identically,
  // for instance a relay might have a giant range that is "on"
  // but no value is more "on" then another.
  identicalWithinRange?: boolean;

  // Maps the 0-255 range onto another range when displaying,
  // Most notable use case is rotations, were mapping from [0-255]
  // to [0 degrees, 540 degrees].
  mapRangeForDisplay?: {
    min: number;
    max: number;
  };
};

// A collection of fixture. Since multiple fixtures tend to share
// everything except the ID, this groups it together.
export type FixtureSchema = {
  // The fixture type to use. Needs to match the key in the
  // config.fixtureTypes
  type: string;

  // Human readable name
  displayName?: string;

  // Plural form of the name, if omitted, "s" is appended to
  // the singular name
  displayNamePlural?: string;

  // The model of this fixture, useful if multiple fixtures
  // behave the same (for instance only a brightness component)
  // but are different product
  model?: string;

  // Extra information about the fixture
  description?: string;

  // The fixture instances. The key is the Lua name, and the
  // value is the DMX Channel that is used.
  fixtureChannels: Record<string, number>;
};

// A group of fixtures
export type FixtureGroupSchema = {
  // Array of the fixtures/group. The value is the Lua name,
  // which is why both fixture groups aswell as fixtures
  // can be used
  fixtures: string[];

  // Extra information
  description?: string;
};
```
