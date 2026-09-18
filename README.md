# Ortho Motion Archive

A curated, searchable archive of standardized orthographic motion reference clips.

Every published clip follows the same capture specification so movements can be compared directly without changes in subject scale, floor position, camera projection, or framing origin.

## Capture standard

**OMR Capture Spec v1** currently uses:

- a fixed orthographic camera and consistent avatar presentation
- root-locked motion with the subject kept at the archive anchor
- a fixed floor position
- a neutral, uncluttered presentation
- one focused movement or action per clip
- three approved canvas presets: **512x512**, **1024x512**, and **1024x1024**
- larger canvases expand around the same subject/floor placement rather than reframing the subject

The current library is primarily 512x512. Clean, readable motion is prioritized over high resolution.

See [CAPTURE_SPEC.md](CAPTURE_SPEC.md) for the archive contract.

## Browse

The public browser is built as a small static site in this repository. Once GitHub Pages is enabled, it is intended to live at:

https://belegradesstudio.github.io/ortho_motion_reference_archive/

The browser reads the catalog metadata, provides search and filters, previews clips in place, and links directly to each downloadable MP4.

## Repository layout

```text
catalog/
  clips.json              Canonical clip catalog

public/
  clips/                  Published MP4 files

site/
  index.html              Archive browser
  styles.css
  app.js

scripts/
  validate-catalog.mjs    Catalog/file validation

.github/
  ISSUE_TEMPLATE/         Reporting workflow
  workflows/              Validation and Pages deployment
```

## Contributions

The archive is curated. **Public motion-clip submissions are not currently accepted.**

A small trusted-contributor workflow may be introduced later. Any future motion contributor will be expected to capture through the archive's studio/export process so the same camera, anchor, floor, canvas, and metadata rules remain intact.

Site, documentation, and catalog bug reports are welcome.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Rights and provenance

This repository does **not** currently apply a blanket license to all motion clips. Provenance and rights information should be recorded per clip in the catalog.

If a clip raises an ownership, provenance, safety, or metadata concern, use the repository's **Report a clip or catalog issue** form.

See [RIGHTS_AND_PROVENANCE.md](RIGHTS_AND_PROVENANCE.md).
