# Clip catalog schema

The canonical catalog is `catalog/clips.json`.

A clip record is designed to describe **what motion is shown**, **how it was captured**, and **where it came from** without forcing the file hierarchy to carry that meaning.

## Example

```json
{
  "id": "locomotion_walk_forward_001",
  "title": "Forward Walk",
  "category": "locomotion",
  "action": "walk_forward",
  "variant_group": "walk_forward",
  "tags": ["walk", "forward", "locomotion"],
  "view": "side",
  "capture_preset": "square_512",
  "loadout_profile": "none",
  "file": "clips/locomotion_walk_forward_001.mp4",
  "capture_creator": "belegradesstudio",
  "motion_provenance": "original",
  "source_name": null,
  "rights_status": "reviewed"
}
```

## Required fields

| Field | Meaning |
| --- | --- |
| `id` | Stable, unique archive identifier |
| `title` | Human-readable movement title |
| `category` | Broad grouping such as locomotion, reaction, combat, traversal |
| `action` | Machine-friendly action name |
| `tags` | Search terms |
| `view` | Presentation view |
| `capture_preset` | One of the approved OMR-1 canvas presets |
| `loadout_profile` | Functional carried-object / equipment profile |
| `file` | Site-relative MP4 path, normally `clips/<file>.mp4` |
| `capture_creator` | Person/studio responsible for the archive capture |
| `motion_provenance` | Provenance class for the underlying motion |
| `rights_status` | Archive review/status label |

## Optional fields

Useful optional fields include:

- `source_name`
- `source_reference`
- `notes`
- `variant_group` — groups front/side and alternate takes of the same action
- `variation` — numbered or named take within a view
- `sport` — domain-specific grouping such as `soccer`
- `duration_seconds`
- `fps`
- `hand`
- `loopable`

Do not infer provenance from filenames. Record it explicitly.
