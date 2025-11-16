# LMixer

**GitHub:** [https://github.com/Daedaluz/lmixer][1]

LMixer is a mixing engine for lights built using small lua-scripts. The current
version is built with [lua 5.4][2] and some extensions. It renders a new frame
at 30 FPS, which is once every 32ms. A shorter time between two effects will not
be visible.

## Components

The LMixer software is made up of a couple of different components.

### Output

An output is used to send layer data using raw UDP socket to other programs.

### Input

An input can be created to bind an incoming UDP stream to layer data.

### Layers

A layer is the base for data storage and manipulation. A layer can be combined
with another layer using mathematical operations. Layers can be stacked and
nested. It is quite similar to how image editing programs use layers.

An output can be bound to a layer so that every render of the layer is sent 
to that output.

It is also possible to create layers from inputs. This can be used to add remote
sources of color information from other programs.

<ExclusiveTo exclusiveTo="LMixer">

### Alpha-Data Layers
An Alpha-Data Layer works the same as a normal layer, except for the fact that it
has an alpha value, which defaults to 0. When the alpha is 0, this layer has no
effect, when the alpha is 1, this layer fully overrides whatever is below it in
the layer order.

The alpha can be set on a per channel basis, this is done by accessing the layers
`alpha` property. This is another layer which can be altered in the same way as
other layers (i.e. `lay.alpha:add(...)`).

:::note
Even if the alpha is zero, effects are still executed.

For [set](scripting.html#set) and [dim](scripting.html#dim), the new data is
calculated, but does not take effect until the alpha is set to a non-zero value.

For [execute](scripting.html#execute), [run](scripting.html#run), 
[play](scripting.html#play), and [stop_play](scripting.html#stop_play), since
they do not effect the data anyway, they are executed exactly like normal,
regardless of the alpha.
:::

</ExclusiveTo>

### Fixtures

A fixture represent a single light or RGB-list. They can also be organized into
groups. This part of the LMixer defines the names for each fixture and where in
the layer they are located. Fixtures are not bound to a single layer.

### Scrips

Each script is a series of instructions that are added to a timeline each time
the run command is used. A script may repeat by running itself again. Make sure
that the repeat time is longer than the script time to not create overlapping.
Scripts are the main part of the LMixer and is where most code is written.

Scripts does not have a "running" state since each script only manipulates the
timeline ahead. However, it is possible to "stop" a script. This tells LMixer to
not apply any "run" commands to it again.

Any script can be removed by just making it completely empty and pressing run.
To rename a script the easiest way is to copy all code to the new one and then
deleting the old.

:::tip
The editor can save without running a script by pressing CTRL+S. Useful
for a looping script that loads the change on the next iteration.
:::

### Code

This act like a script but are only run once at startup (or when manually
triggered by the run function). Here some extra global code and different
utility functions can be placed.

[1]: https://github.com/Daedaluz/lmixer

[2]: https://www.lua.org/manual/5.4/manual.html