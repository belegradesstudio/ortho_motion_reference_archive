# OMR Capture Spec v1

The archive is useful because the capture is standardized. This document defines the minimum contract for clips published under **OMR-1**.

## Geometry and presentation

The following remain consistent across OMR-1 clips:

- orthographic camera projection
- archive avatar/rig presentation
- subject anchor / root-locked position
- floor position
- neutral background and uncluttered scene
- consistent subject scale

Changing canvas size must **not** move or rescale the subject or floor. The canvas expands around the existing composition.

## Approved canvas presets

| Preset ID | Size |
| --- | ---: |
| `square_512` | 512x512 |
| `wide_1024x512` | 1024x512 |
| `square_1024` | 1024x1024 |

The current collection is primarily `square_512`.

## Clip scope

Each clip should show one focused movement or action. A clip may include the anticipation, action, and recovery needed to make the movement readable, but it should not become a montage of unrelated actions.

## Root motion

Published OMR-1 clips are root-locked for presentation. The avatar remains at the archive anchor while the body demonstrates the movement.

## Loadout variants

Loadout is metadata, not a change to the capture geometry.

Initial profiles include:

- `none`
- `one_hand_long` — a neutral long-object proxy held in one hand, suitable for showing the body mechanics of carrying a staff-, pole-, weapon-, or tool-like object

Additional profiles can be added later without changing OMR-1 camera or anchor rules.

## Versioning

If a future studio change intentionally alters subject scale, camera geometry, floor placement, or another alignment-critical rule, it should receive a new capture-spec version rather than silently changing OMR-1.
