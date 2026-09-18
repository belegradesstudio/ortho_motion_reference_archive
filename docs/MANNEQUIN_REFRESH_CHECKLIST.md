# Mannequin refresh checklist

This checklist tracks the older non-soccer captures that should be recaptured with the current orientation-readable mannequin before deeper catalog cleanup.

## Refresh rules

For a straight visual refresh of the same motion:

- use the current mannequin revision
- preserve the OMR-1 camera, subject scale, root lock, floor position, and 512x512 preset
- keep the same public path when the action is genuinely the same; replacing the file in place keeps catalog IDs and links stable
- if the new capture is meaningfully different in action, timing, view, or loadout, publish it as a new variant instead of overwriting
- record motion provenance separately from the public archive title

### Naming rule

Public archive names should be clear, neutral descriptions of the motion. They do **not** need to match an upstream/source animation title, but they also should not be changed merely to disguise provenance.

If a motion came from another permitted source, keep the exact upstream title/provider in provenance metadata while giving the archive clip a consistent descriptive title.

Suggested split:

- **archive title / filename:** what the motion visibly does
- **source provider:** where the underlying motion came from, when applicable
- **source title:** exact original source animation title, when applicable
- **capture creator:** who produced the OMR capture
- **capture mannequin revision:** current mannequin revision used for the render

Until the mannequin name is finalized, use a neutral internal revision such as `mannequin_v2`.

## Current non-soccer clips on `main`

The repository currently contains **25** non-soccer MP4s. If the local source collection has more than these, compare it against this list before the refresh pass.

### Character / idle — 2

- [ ] `public/clips/character/breathing_idle.mp4`
- [ ] `public/clips/character/warrior_idle.mp4`

### Combat — 6

- [ ] `public/clips/combat/fireball.mp4`
- [ ] `public/clips/combat/great_sword_walk.mp4`
- [ ] `public/clips/combat/heavy_weapon_swing.mp4`
- [ ] `public/clips/combat/sheathing_sword.mp4`
- [ ] `public/clips/combat/shooting_arrow.mp4`
- [ ] `public/clips/combat/withdrawing_sword.mp4`

### Locomotion / posture / reaction — 17

- [ ] `public/clips/locomotion/change_direction.mp4`
- [ ] `public/clips/locomotion/dying.mp4`
- [ ] `public/clips/locomotion/dying(1).mp4`
- [ ] `public/clips/locomotion/dying(2).mp4`
- [ ] `public/clips/locomotion/getting_up.mp4`
- [ ] `public/clips/locomotion/getting_up(1).mp4`
- [ ] `public/clips/locomotion/getting_up(2).mp4`
- [ ] `public/clips/locomotion/jumping.mp4`
- [ ] `public/clips/locomotion/kneeling_down.mp4`
- [ ] `public/clips/locomotion/run_to_stop.mp4`
- [ ] `public/clips/locomotion/running_to_turn.mp4`
- [ ] `public/clips/locomotion/sneak_walk.mp4`
- [ ] `public/clips/locomotion/standard_run.mp4`
- [ ] `public/clips/locomotion/standing_up.mp4`
- [ ] `public/clips/locomotion/walking(f).mp4`
- [ ] `public/clips/locomotion/walking(m).mp4`
- [ ] `public/clips/locomotion/walking_injured.mp4`

## Review during recapture

For each motion, decide:

- [ ] same motion, same view -> replace file in place
- [ ] meaningfully different take -> add as a new variant
- [ ] current filename is a good neutral archive name
- [ ] current filename should be normalized for the archive
- [ ] source provider/title recorded if applicable
- [ ] new mannequin orientation markers are clearly visible
- [ ] clip starts and ends cleanly
- [ ] root stays locked at the archive anchor
- [ ] floor alignment matches OMR-1
- [ ] capture uses the intended 512x512 preset

## Local-library reconciliation

The live repository currently has 100 clips total: 75 soccer clips and 25 non-soccer clips.

If the expected source library is about 105 clips, there are roughly five files not represented in the repository. Before calling the mannequin refresh complete, compare the local source folders against the published tree and decide whether those missing motions should also be recaptured and added.
