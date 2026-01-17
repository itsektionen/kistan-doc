# Utility Functions

**_Location:_** `addon_suite/util`

## Color

**_Location:_** `addon_suite/util/color`

There are two types of color used, `RGBColor` and `ColorTable`.
The former is preferred, as `ColorTable` is deprecated.

### RGBColor

**_Example:_** Create Laser violet as an RGBColor

```lua
local laserViolet = {
    r = 204,
    g = 153,
    b = 255
}
```

### `to_rgb`

Converts a color to RGBColor

Arguments

| name  | description                             |
| ----- | --------------------------------------- |
| value | A hex code or [ColorTable](#colortable) |

**_Example:_** Create Laser violet as an RGBColor

```lua
local laserViolet = to_rgb(0xcc99ff)
```

### `hue_to_rgb`

Arguments:

| name      | description                         |
| --------- | ----------------------------------- |
| hue       | The hue of the color, 0-360         |
| intensity | The intensity of the color, 0 - 255 |

Converts a hue to an [RGBColor](#rgbcolor). This is currently
not exact, and is subject to change the internal math.

### `color_lerp`

| name      | description                           |
| --------- | ------------------------------------- |
| colA      | The starting Color                    |
| colB      | The ending color                      |
| lerpValue | The position along the lerp, 0=A, 1=B |

### `color_from_srgb`

Converts a [RGBColor](#rgbcolor) from srgb to linear. Useful for displaying in
linear color gammas - such as LEDs.

### `linear_from_srgb_hex`

Same as [color_from_srgb](#color-from-srgb), except it takes in a hex value

**_Example:_** Make the sign laser violet

```lua
local laserViolet = linear_from_srgb_hex(0xcc99ff)
sign:add(0, set(laserViolet.r, laserViolet.g, laserViolet.g))
```

<ExclusiveTo exclusiveTo="Deprecated">

### ColorTable

**_Example:_** Create Laser violet as an ColorTable

```lua
local laserViolet = {
    204,
    153,
    255
}
```

### `rgb_color_to_rgb_table`

Converts [RGBColor](#rgbcolor) to [ColorTable](#colortable)

| name     | description              |
| -------- | ------------------------ |
| rgbColor | An [RGBColor](#rgbcolor) |

**_Example:_** Create Laser violet as an ColorTable

```lua
local laserViolet = rgb_color_to_rgb_table({
    r = 204,
    g = 153,
    b = 255
})
```

### `color_table_from_srgb`

Same as [color_from_srgb](#color-from-srgb), except with [ColorTable](#colortable)
instead of [RGBColor](#rgbcolor)

### `color_table_lerp`

Same as [color_lerp](#color-lerp), except with [ColorTable](#colortable)
instead of [RGBColor](#rgbcolor)

### `color_srgb_table_hex`

Same as [linear_from_srgb_hex](#linear-from-srgb-hex), except with [ColorTable](#colortable)
instead of [RGBColor](#rgbcolor)
</ExclusiveTo>

## Strings

**_Location:_** `addon_suite/util/strings`

### pad_number_to_string_length

Pads a string or number to be at least the specified length

Arguments

| name    | Optional | description                       |
| ------- | -------- | --------------------------------- |
| value   | No       | The string or number              |
| length  | No       | The minimum length                |
| padding | Yes      | The padding string, defaults to 0 |


