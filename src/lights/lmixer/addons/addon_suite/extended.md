# Addon Suite Extensions

**_Location:_** `addon_suite/extended`

Various extensions to the default LMixer behavior.

A leading principle is to a single tables for parameters instead
of multiple arguments as this allows for more functionality later on.

## Fixtures

### `fixExt`

**_Location:_** `addon_suite/extended/fixtures`

A extended version of [`fix`](./../../scripting.html#fix).

Currently behaves the same as fix.

Params:

| Name     | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| chStart  | number | The starting channel of the fixtures  |
| chLength | number | The number of channels on the fixture |

## Layers

### `layerExt`

**_Location:_** `addon_suite/extended/layers`

`layerExt` extends [`layer`](./../../index.html#layers).

It functionally differs from normal `layer` in the following way:

1. When saving the layer file, the layers retain their data (old data is copied over using the name parameter)
2. Layers' data can be read out using mqtt

The part that is not backwards compatable is creation.

#### Create layerExt

Creation of a [LayerExt](#layerext) is done through a single table argument:

Table type:

| key     | name      | Optional | Description                                                                     |
| ------- | --------- | -------- | ------------------------------------------------------------------------------- |
| name    | Name      | No       | The name of the layer, should be the same as the variable the layer is saved to |
| parent  | Parent    | Yes      | Layer to do operation on, `nil` if this is the base layer                       |
| op      | Operation | No       | See operations below                                                            |
| size    | Size      | No       | How many bytes is this layer                                                    |
| default | default   | Yes      | Default value for all bytes in a layer                                          |

**Example:** Create a new layer that multiplies master with this. Default value is 1.

```lua
dimmer = layerExt({ name = "dimmer", parent = master, op = mul, default = 1 })
```

### `alpha_data_layer`

An Alpha-Data Layer works the same as a normal layerExt, except for the fact that it
has an alpha value, which defaults to 0. When the alpha is 0, this layer has no
effect, when the alpha is 1, this layer fully overrides whatever is below it in
the layer order.

The alpha is set on a per channel basis, this is done by accessing the layers
`alpha` property. This is another layer which can be altered in the same way as
other layers (i.e. `lay.alpha:add(...)`).

:::note
Even if the alpha is zero, effects are still executed.

For [set](./../../scripting.html#set) and [dim](./../../scripting.html#dim), the new data is
calculated, but does not take effect until the alpha is set to a non-zero value.

For [execute](./../../scripting.html#execute), [run](./../../scripting.html#run), [start](./../../scripting.html#start),
[play](./../../scripting.html#play), and [stop_play](./../../scripting.html#stop_play), since
they do not effect the data anyway, they are executed exactly like normal,
regardless of the alpha.
:::

### `take_control_of_fixture`

Sets the alpha of a fixture group to 1 over a transition time

| Name      | Optional | Description                |
| --------- | -------- | -------------------------- |
| Group     | No       | Group to iterate over      |
| Fade Time | No       | Fade time until alpha is 1 |

**_Example:_** Take control of the washes and lamps

```lua
jingle:add(0, take_control_of_fixture(lamps, 1000))
```

:::important
Remember to [release the control of the fixture](#release-control-of-fixture),
otherwise, when another script is ran, the fixture will still be controlled,
by the layer. 

(This can sometimes be desired however, see
[Alpha-data layer scripting](mixing.html#alpha-data-layer-scripting) for an
example of multi-script layer control)
:::

### `release_control_of_fixture`

Sets the alpha of a fixture group to 0 over a transition time

| Name      | Optional | Description                |
| --------- | -------- | -------------------------- |
| Group     | No       | Group to iterate over      |
| Fade Time | No       | Fade time until alpha is 0 |

**_Example:_** Releases control of the lamps

```lua
jingle:add(3000, release_control_of_fixture(lamps, 1000))
```

:::note
The "take control" and "release control" terminology can be slightly confusing
when it comes to priority. The priority is **_always_** whatever is latest in
the layer order (the order that layers are added as children).
:::