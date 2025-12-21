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

Alpha-data layers are layers with alpha support. The alpha blends between the layers below
this one and it self. An alpha of 0 means keep the layers below, an alpha of 1 means "replace"
the layers below with this layer.

The alpha is set on a per channel basis, this is done by accessing the layers
`alpha` property. This is another layer which can be altered in the same way as
other layers (i.e. `lay.alpha:add(...)`).

Alpha-data layers inherit from `layerExt`, thus the information about `layerExt` also applies here.

| key    | name   | Optional | Description                                                                                                             |
| ------ | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| name   | Name   | No       | The name of the layer, should be the same as the variable the layer is saved to. The alpha layer is the name + `_alpha` |
| parent | Parent | No       | Layer to do operation on, `nil` if this is the base layer                                                               |
| size   | Size   | No       | How many bytes is this layer                                                                                            |

:::note
size and default value are not applicable since theses are set by alpha_data_layer
:::

**Example:** Create a new alpha-data layer on master

```lua
jingle = alpha_data_layer({ name="jingle", parent = master, size = 512})
```

Alpha-data layers start with an alpha of 0, this needs to be changed for the layer to be visible,
see [alpha-data-layer.alpha](#alpha-data-layer-alpha).

:::warning
Do not add child layers to an alpha-data-layer **_unless_** their operation is `mul`. This is
because the alpha layer is processed first instead of last, causing the alpha to not apply
correctly on the children. This is unintended and usage is **_highly_** discouraged,
as it is subject to change.
:::

:::note
Even if the alpha is zero, effects are still executed.

For [set](./../../scripting.html#set) and [dim](./../../scripting.html#dim), the new data is
calculated, but does not take effect until the alpha is set to a non-zero value.

For [execute](./../../scripting.html#execute), [run](./../../scripting.html#run), [start](./../../scripting.html#start),
[play](./../../scripting.html#play), and [stop_play](./../../scripting.html#stop_play), since
they do not effect the data anyway, they are executed exactly like normal,
regardless of the alpha.
:::



### `<alpha-data-layer>.alpha`

Alpha-data layers are made of two layer, the data layer (the "main" layer"), and the alpha
layer which is accessed via .alpha. It is a standard layer, thus the :add works like expected.

**Example:** Sets the color of the lamp, but this is not visible until the layers alpha is set,
specifically the light has it's color components (Red, Green, Blue) set to the new value one by
one instead of all at once.

```lua
jingle:add(1000, set(lamp1, 255, 128, 255, 0))
jingle.alpha:add(2000, set(lamp1, 1, 0, 0, 0))
jingle.alpha:add(3000, set(lamp1, 1, 1, 0, 0))
jingle.alpha:add(4000, set(lamp1, 1, 1, 1, 0))
```

:::tip
In this case, direct alpha access makes sense, however, in general taking control of the entire
fixture is desired, for this [take_control_of_fixture](#take-control-of-fixture) and
[release_control_of_fixture](#release-control-of-fixture) should be used.
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