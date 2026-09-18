# Published motion clips

Upload published MP4 motion-reference clips to this folder.

Do not encode the full catalog taxonomy into filenames. Keep filenames stable and reasonably descriptive; searchable titles, categories, loadout profiles, capture presets, provenance, and tags live in `catalog/clips.json`.

Current OMR-1 defaults for the first archive set:
- capture preset: `square_512` (512x512)
- root locked / archive anchor fixed
- fixed floor alignment
- orthographic presentation

After new MP4 files are uploaded, update `catalog/clips.json` and run:

```bash
node scripts/validate-catalog.mjs
```
