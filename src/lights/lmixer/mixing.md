# Mixing technique

## Basics

Color mixing of lights are a bit different from normal color mixing. Since we
can't add black as a color, black is just no light on. Some colors are hard to
represent, this is in part dependent on what type of LED is used but also some
other factors. Most of our lamps only have RGB, and can not produce
"yellow" or "white" light very well.

## Color fades

The `dim` function can be used to fade fixtures with RGB values between colors.
Note that the colors will mix between colors during the fade resulting in a
timeline like the picture below.

![fade_normal]

It is also possible to change color and lower the intensity at the same time.
In this case the red color is only set to 20% of the blue colors intensity.
It is also possible to accomplish this using the multi-layer technic below.

![fade_dim]

## Multi-layer scripting

Layers can be used to create effects stacked on top of each other. The most
common use is to run a script on the `master` layer and multiply that with a
`dimmer` layer. One of the already existing scripts can run normally on the
master layer and the dimmer layer can add in some randomness by flickering
lights off and on. Great use for a spooky theme.

![fade_on_off]

The dimmer layer can also be used to "turn off" some lights in a specified area.
An example that have been used is to turn of the roof pixels above the dance
floor when the DJ lightning is running. And then on top of that have a third
layer added to the data so that the DJ area can run roof patters even tho the
rest is running another script.

[fade_normal]: ./images/fade_normal.png "A fade between blue and red"

[fade_dim]: ./images/fade_dim.png "A fade between blue and red with 
intensity going down"

[fade_on_off]: ./images/fade_on_off.png "A fade between blue and red with 
another layer creating on/off pattern"

<ExclusiveTo exclusiveTo="LMixerAddonSuiteExtensions">

## Alpha-data layer scripting

If you have a base script loop, but want to a temporary jingle or similar, then
placing the jingle on a seperate layer (`jingle` in the example) allows for the
jingle to return the base script afterwards.

***Example:*** take control of the washes, lamps, the microwaves, and box lights.
After 30 seconds release the control.
```lua
local ownedFixtures = {washes, lamps, micro1, box};

-- Set the "starting state" of the fixtures
jingle:add(0, set(box, 255, 0, 255))
-- ETC. for the rest of the fixtures

jingle:add(100, take_control_of_fixture(ownedFixtures, 1000))

-- BUNCH OF CODE

jingle:add(30000, release_control_of_fixture(ownedFixtures, 1000))
```

`take_control_of_fixture` and `release_control_of_fixture` do not have to be in the
same script. For instance, to make the DJ floor situation described in 
[Multi-layer scripting](#multi-layer-scripting), having a `dj` layer, taking
control of the fixtures is done in a start script and releasing control in an end script.

***Example:*** Multi-script layer control:
```lua
-- DJ_Start
dj:add(0, take_control_of_fixture(djFixtures, 1000))
```
```lua
-- DJ_Stop
dj:add(0, release_control_of_fixture(djFixtures, 1000))
```

</ExclusiveTo>