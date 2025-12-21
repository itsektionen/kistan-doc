# Macros

Macros are defined by starting _any_ line with `--#`.

## `--#DEPENDENCY`

Arguments:

| Name | Optional | Description                                                |
| ---- | -------- | ----------------------------------------------------------- |
| path | No       | The path to the addon that should be loaded before this one |

This is only used in addon scripts. It specifies that an addon
should be loaded before this one.

## `--#OLD_SCRIPT_NAME`

Arguments:

| Name | Optional | Description        |
| ---- | -------- | ------------------- |
| path | No       | The old script path |

This is used for moving scripts. When a script is moved, external references to
that script will be broken. This macro specifies a fallback, if the script is not
found, check if a script has OLD_SCRIPT_NAME matching.
