# Addon Development

Addons can be made from UI in the same way as a script.
However for more complex addons, it is recommended to
work locally, and publish to the MQTT server.

When publishing, simply publish to the [addons topic](./../technical/mqtt_topics.html#light-mixer-addons).
:::caution
Make sure to have the **retain** flag set when publishing
to make your addons persistent.
:::

## Splitting up across files

It is way easier to manage a project when split up
across files. By using the [DEPENDENCY Macro](./../macros.html#dependency)
you can require other parts of the addon to be loaded
before this one.

**_Example:_** Require `addon_suite/core` to be loaded before
this addon

```lua
--#DEPENDENCY addon_suite/core
```

## Initialization Order

Addons are loaded before any other script, including Fixtures, Layers, and Extra (code),
however addons are loaded _after_ the internal LMixer code.

The initialization process for addons is the following:
1. Load all dependencies (skipping dependencies that already are loaded)
2. Execute self as .lua code

:::warning
Cyclic dependency loops lead to weird initialization orders, and should be avoided if possible.
:::


:::details Technical info
`Active Addons` is internally treated as an addon, which is why --#DEPENDENCY is used there.
:::

