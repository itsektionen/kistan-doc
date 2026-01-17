# Kistan Specific Addons

**_Location:_** `kistan_specific`

These are a group of addons that only apply to things
within Kistan. Most commonly, it is for specific types
of fixtures.

These have the [Addon Suite](./addon_suite/) as a
required dependency.

## Roof

**_Location:_** `kistan_specific/roof`

### `roof_shader`

Arguments:

| name     | description                                           |
| -------- | ----------------------------------------------------- |
| shader   | See [shaders](./addon_suite/effects.html#shader)      |
| duration | How long to run this shader (ms), `nil` if indefinite |

The fragment shader gets the following parameters:

| name | description                                                        |
| ---- | ------------------------------------------------------------------ |
| x    | The x-coordinate of the pixel (higher=closer to scene)             |
| y    | The y-coordinate of the pixel (lower=closer to window the windows) |
| time | The time in ms since the start of the shader                       |

**_Example:_** Makes the roof slowly change in a rainbow pattern using shaders.

```lua
-- rainbow_roof_cyclic
function roof_hue_gradient(params)
    local hue = (params.y * -40 + params.x * -10 + time * 360 / 5000) % 360;
    local intensity = 120;

    if (Scripts.rainbow_roof_cyclic:is_stopped()) then
        return "STOP"
    end
    return hue_to_rgb(hue, intensity);
end
roof:add(0, roof_shader(roof_hue_gradient, nil))
```

## Sign

**_Location:_** `kistan_specific/sign`

Things for the "Kistan sign"

### `sign_shader`

| name     | description                                           |
| -------- | ----------------------------------------------------- |
| shader   | See [shaders](./addon_suite/effects.html#shader)      |
| duration | How long to run this shader (ms), `nil` if indefinite |

The fragment shader gets the following parameters:

| name | description                                  |
| ---- | -------------------------------------------- |
| x    | The x-coordinate of the pixel                |
| y    | The y-coordinate of the pixel                |
| time | The time in ms since the start of the shader |

### `sign_spiral`

Creates a spiral shader for the sign. Only argument is settings

| name          | type                                         | description                                   |
| ------------- | -------------------------------------------- | --------------------------------------------- |
| width         | number                                       | The width of the spiral                       |
| invert        | boolean?                                     | Inverts                                       |
| falloff_power | number                                       | The power of the falloff of the spiral        |
| color         | [RGBColor](./addon_suite/util.html#rgbcolor) | The color of the spiral, defaults to 0x010101 |

The fragment shader gets the following parameters:

| name | description                                  |
| ---- | -------------------------------------------- |
| x    | The x-coordinate of the pixel                |
| y    | The y-coordinate of the pixel                |
| time | The time in ms since the start of the shader |

**_Example:_** Creating a spiral:

```lua

local baseColor = {
    r=0x44,
    g=0x22,
    b=0x55
}

sign:add(0, sign_shader(sign_spiral({speed=5,
    width=40,
    falloff_power=2,
    invert=true,
    color=baseColor}), 100000))
```

**_Example:_** Creating a radar effect:

```lua
sign:add(0, set(whole_sign, 0x22, 0xff, 0xcc))
sign_dim:add(0, sign_shader(sign_spiral({
    speed=2,
    width=10000,
    falloff_power=20}), 100000))
```

:::note
The sign's coordinates are very spaced out. While on the roof it is 1unit/pixel, on the sign
it is significantly larger.
:::

### `sign_heartbeat`

Make the "heartbeat shaped A" pulse.

Settings:

| name         | type                                         | description                                         |
| ------------ | -------------------------------------------- | --------------------------------------------------- |
| width        | number?                                      | The width of the entire pulse, must > 0             |
| dimIn        | number?                                      | The width of the dim in part. dimIn+dimOut <= width |
| dimOut       | number?                                      | The width of the dim out part dimIn+dimOut <= width |
| color        | [RGBColor](./addon_suite/util.html#rgbcolor) | The color of the pulse                              |
| backColor    | [RGBColor](./addon_suite/util.html#rgbcolor) | The color of the background, defaults to 0x000000   |
| speed        | number?                                      | The speed of the pulse                              |
| easePowerIn  | number?                                      | The exponent of the fading in part                  |
| easePowerOut | number?                                      | The exponent of the fading out part                 |

***Example:*** Make the A pulse white
```lua
sign:add(speed*4.5, sign_heartbeat({
    color = {255, 255, 255}, 
    width = 2500, 
    speed = 0.5, 
    dimIn = 100, 
    dimOut = 2300, 
    easePowerIn = 10, 
    easePowerOut = 40}))
```

## Drink Lights

**_Location:_** `kistan_specific/drink_lights`

### `drinks_moving_blocks`

Makes multiple

| name       | type                                         | description                                       |
| ---------- | -------------------------------------------- | ------------------------------------------------- |
| blockWidth | number?                                      | The width of one block                            |
| colors     | [RGBColor](./addon_suite/util.html#rgbcolor) | Array of colors for each block.                   |
| stepTime   | number?                                      | The time in ms between each move                  |
| stepSize   | number?                                      | The number of pixels to move each step            |
| duration   | number?                                      | The time to show this effect                      |
| flip       | boolean?                                     | Mirror the effect                                 |
| flipPerRow | boolean?                                     | Alternates mirrored and non-mirrored for each row |
