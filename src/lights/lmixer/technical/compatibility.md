# Compatibility

## Global Scope Scripts

Scripts used to be stored in the global scope. If a script existed called `rainbow`,
it could be called like this:

```lua
rainbow:start()
```

This has the issue of polluting the global scope with every script name. That is why
they were moved into `Scripts.`, the same code now looks like this:
```lua
Scripts.rainbow:start()
```

Since this is a breaking change, multiple things exist to allow for compatibility.

### `builtin/compatibility/MakeScriptNamesGlobalScope` Addon

Since removing scripts from the global scope, having a translation layer does not
work, instead this addon sets a flag to revert almost all of the changes.

It makes scripts exists in the global scope again.

### `light_mixer/code/+` removal

The [MQTT topics](./mqtt_topics.html) `light_mixer/code/+` were removed and replaced
with multiple, more specific. The old system has all of these execute the published
code directly, however in practice `light_mixer/code/run` is the main one used.

`light_mixer/code/run` [tries to translate](./mqtt_topics.html#light-mixer-code-run)
the code to support the move to `Scripts.`. The [start](./mqtt_topics.html#light-mixer-code-startscript)
and [stop](./mqtt_topics.html#light-mixer-code-stopScript) topics exists as a bridge;
they support both `Scripts.` and Global Scope, and switch their behavior to match.
