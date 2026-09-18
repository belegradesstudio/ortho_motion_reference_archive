# Contributing

Ortho Motion Archive is curated around a strict capture standard.

## Motion clips

**Public motion-clip submissions are not currently accepted.**

Please do not open pull requests that add MP4 files or new motion catalog entries unless you have been explicitly invited as a trusted contributor.

A future trusted-contributor process may use the same studio/export software as the main archive so camera, avatar, floor, root lock, canvas presets, and metadata are generated consistently.

## Site and documentation

Bug fixes and improvements to the browser, documentation, validation scripts, and metadata tooling are welcome.

Before opening a pull request:

1. keep the site dependency-free unless a dependency is clearly justified
2. preserve the catalog schema and capture-spec versioning rules
3. run `node scripts/validate-catalog.mjs`
4. do not add a blanket media license without an explicit repository decision

## Reporting a clip

For ownership/provenance concerns, broken playback or downloads, incorrect metadata, or inappropriate content, use the **Report a clip or catalog issue** issue form rather than a pull request.
