# Addon Suite

The addon suite contains a mix of utility functions, effects and extensions to LMixer.

The features of the addon suite are susceptible when in beta, and they should be used
at one's own risk.

Some features are unfinished and are then not documented here. These are almost guaranteed
to change.

## Types

***Location:*** `addon_suite/types`

Only contains some type definitions.

## Core

***Location:*** `addon_suite/core`

The most "essential" parts to have.

### `AddonData`

This is a table that can be used by any addon to store data in without polluting the global
name space.

### `LMixerError`
Prints a error message to mqtt, which thus gets displayed on the LMixer UI. Useful for debugging.

| Name          | Optional | Description       |
|---------------|----------|-------------------|
| Error message | No       | The error message |

***Example:*** Prints `Error: This is a test message` to mqtt.
```lua
LMixerError("This is a test message");
```

:::note
Only one error message can be displayed on the UI at once, if multiple Error are made, only the latest is displayed.
:::


### `LMixerPrint`
Prints a message to mqtt, which thus gets displayed on the LMixer UI. Useful for debugging.

| Name          | Optional | Description          |
|---------------|----------|----------------------|
| Print message | No       | The message to print |

***Example:*** Prints `Info: Testing` to mqtt.
```lua
LMixerPrint("Testing");
```

:::note
Only one message can be displayed on the UI at once, if multiple messages are made, only the latest is displayed.
:::

:::details
This is actually just adds a error message to the mqtt, however, using the appropriate function is recommended
since if it is later updated, it will be correct.
:::

## Complete Suite

***Location:*** `addon_suite/completeSuite`

Adds [core](#core), [effects](./effects.html), and [extended](./extended.md) as
dependencies.
