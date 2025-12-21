# MQTT Topics

LMixer stores all of it's data within the MQTT brokers `light_mixer/` topics.

## Script Topics

These are topics which are executed as script. The order listed here is the
standard execution order. Note however that (in most cases), publishing to
any of these topics will reload it.

:::warning
Make sure to publish with the _retain_ flag _set_. If not, the script will
revert upon restart.
:::

### `light_mixer/active_addons`

***Execution Mode:*** Always

The default parsing for addons. List addons using the [DEPENDENCY Macro](./../macros.html#dependency).
Dependencies are loaded before the actual addons.

### `light_mixer/addons/#`

***Execution Mode:*** If dependency

These are _only_ loaded when listed as a dependency. And they are _only_
subscribed to when listed as a dependency. This means that publishing to
an addon that has _not_ been loaded during this session, will cause it
to not get executed.

:::caution
Due to MQTT not providing a proper way of checking if a topic exists,
LMixer will wait until something is published to the addon. This means
if an addon is listed as a dependency, but cannot be found, LMixer will
wait until it is published before continuing loading the rest of this.
:::

### `light_mixer/fixtures`

***Execution Mode:*** Always

This is the recommended place to put [Fixtures](./../index.html#fixtures).

### `light_mixer/layers`

***Execution Mode:*** Always

This is the recommended place to put [Layers](./../index.html#layers).

### `light_mixer/extra`

***Execution Mode:*** Always

This a place to put miscellaneous code. The UI titles this "Code".

### `light_mixer/code/scripts/#`

***Execution Mode:*** Load always, execute on :start()

This is where all of the regular scripts live. Folders are specified by
nesting topics, i.e. a folder called `SMN` would have it's scripts at
`light_mixer/code/scripts/SMN/#`.

## Execution Topics

These topics are for getting code to be executed

### `light_mixer/code/run`

:::warning Deprecated
This topic exists for compatibility.
:::

If [the Global Scope Script Names Addon](compatibility.html#builtin-compatibility-makescriptnamesglobalscope-addon)
is active, this does the same thing as [execute](#light-mixer-code-execute).

Otherwise, it tries to translate calls. If a call ends with `:start()`, it will attempt to find the script referred
to by the rest of the contents. If it fails, it is executed the same way as [execute](#light-mixer-code-execute).

### `light_mixer/code/execute`

This executes the contents as lua code. Should be avoided if another topic exist (such as for
[start](#light-mixer-code-startscript) and [stop](#light-mixer-code-stopscript)).


***Example:*** Make the roof blue
```lua
roof:add(0, set(pixels, 0, 0, 255))
```

### `light_mixer/code/startScript`

Starts a script, takes in only the path to the script. Do not prefix the path with `Scripts`, as that is conditionally
added based on the compatibility mode.

***Example:*** Start `SMN/Rainbow`
```Data
SMN/Rainbow
```

### `light_mixer/code/stopScript`

Same as start, except it stops the script.

***Example:*** Stop `SMN/Rainbow`
```Data
SMN/Rainbow
```