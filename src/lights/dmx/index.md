# DMX Protocol

DMX is a wired protocol for controlling stage and effect lights mainly used on
big stages and theaters. The protocol is usually run on 5- or 3-pin XLR cables.
But in some cases network cables is also used.

## DMX Components

DMX protocol specifies some common components that are explained further here.
The basic on how this works is good to know when working with DMX controlled
lights.

#### Universe

A universe is one single DMX network. It has a maximum of 512 channels and this
also limits how many fixtures can be added to it.

#### Channel

Each byte in the universe is called a *channel*. A fixture might consume more
than one channel to receive more data-parameters. An RGB fixture might have one
channel for red, one for green and one for blue. Normally the setting on the
fixture is the first channel used by that light. And the manual specifies how
many channels each fixture uses.

Since the fixtures only read the data that they need in the universe it is
possible to use several lights on the same channel if they never need to be
controlled individually.

#### Values

Since each channel is represented as a byte, the values for every channel is
0-255.

## dmxd

This tool is used to receive frame information from LMixer and output it to a
seral port at a high speed suitable for DMX data.

**GitHub**: [https://github.com/Daedaluz/dmxd][1]

## DMX Network

![planned]

[planned]: https://raw.githubusercontent.com/insektionen/kistan/master/images/kistan_new_dmx_1.png

:::note
This DMX Network Drawing is outdated and needs to be updated
:::

[1]: https://github.com/Daedaluz/lmixer
