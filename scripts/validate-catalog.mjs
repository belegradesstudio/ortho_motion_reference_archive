import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "catalog", "clips.json");
const allowedPresets = new Set([
  "square_512",
  "wide_1024x512",
  "square_1024"
]);

function fail(message) {
  console.error("Catalog validation failed:");
  console.error(" - " + message);
  process.exitCode = 1;
}

if (!fs.existsSync(catalogPath)) {
  fail("catalog/clips.json does not exist.");
  process.exit();
}

let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
} catch (error) {
  fail("catalog/clips.json is not valid JSON: " + error.message);
  process.exit();
}

if (catalog.version !== 1) fail("catalog.version must be 1.");
if (catalog.capture_spec !== "OMR-1") fail('catalog.capture_spec must be "OMR-1".');
if (!Array.isArray(catalog.clips)) {
  fail("catalog.clips must be an array.");
  process.exit();
}

const required = [
  "id",
  "title",
  "category",
  "action",
  "tags",
  "view",
  "capture_preset",
  "loadout_profile",
  "file",
  "capture_creator",
  "motion_provenance",
  "rights_status"
];

const ids = new Set();

for (const [index, clip] of catalog.clips.entries()) {
  const label = clip?.id || ("clip #" + (index + 1));

  if (!clip || typeof clip !== "object" || Array.isArray(clip)) {
    fail("clip #" + (index + 1) + " must be an object.");
    continue;
  }

  for (const field of required) {
    if (!(field in clip)) fail(label + ": missing required field " + field + ".");
  }

  if (typeof clip.id === "string") {
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(clip.id)) {
      fail(label + ": id may contain only lowercase letters, numbers, hyphens, and underscores.");
    }
    if (ids.has(clip.id)) fail(label + ": duplicate id.");
    ids.add(clip.id);
  }

  if (!Array.isArray(clip.tags)) fail(label + ": tags must be an array.");

  if (clip.capture_preset && !allowedPresets.has(clip.capture_preset)) {
    fail(label + ": unsupported capture_preset " + clip.capture_preset + ".");
  }

  if (typeof clip.file === "string") {
    if (!clip.file.startsWith("clips/") || clip.file.includes("..")) {
      fail(label + ": file must be a safe site-relative path under clips/.");
    } else {
      const localPath = path.join(root, "public", clip.file);
      if (!fs.existsSync(localPath)) {
        fail(label + ": referenced file does not exist at public/" + clip.file + ".");
      }
    }
  }
}

if (!process.exitCode) {
  console.log(
    "Catalog OK: " + catalog.clips.length + " clip(s), capture spec " + catalog.capture_spec + "."
  );
}
