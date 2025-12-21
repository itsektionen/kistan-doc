# Effects

## Interval

**_Location:_** `addon_suite/effects/interval`

### `interval`

Run a function at a specified interval.

| name     | desc                                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| interval | The time in ms between executions                                                  |
| function | The function to call each time. The function gets the current layer as an argument |

## Shader

### `Shader`

The generic shader function. A shader is executed for every pixel of a layer. Each pixels either returns:

- An [RGBColor](./util.html#rgbcolor)
- `nil` for no change
- `"STOP"` to immediately stop the shader

The params to the fragment shader varies between pixels.

This function should not be directly called in scripts, instead, addons should wrap it for the specific
fixtures in use.