const state = {
  clips: [],
  filtered: []
};

const grid = document.querySelector("#clip-grid");
const loading = document.querySelector("#loading-state");
const empty = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const search = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const loadoutFilter = document.querySelector("#loadout-filter");
const viewFilter = document.querySelector("#view-filter");
const presetFilter = document.querySelector("#preset-filter");
const dialog = document.querySelector("#clip-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogClose = document.querySelector("#dialog-close");

const presetLabels = {
  square_512: "512x512",
  wide_1024x512: "1024x512",
  square_1024: "1024x1024"
};

function humanize(value = "") {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function uniqueValues(field) {
  return [...new Set(state.clips.map(clip => clip[field]).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b)));
}

function populateFilter(select, values, labeler = humanize) {
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labeler(value);
    select.append(option);
  }
}

function searchText(clip) {
  return [
    clip.id,
    clip.title,
    clip.category,
    clip.action,
    clip.view,
    clip.loadout_profile,
    clip.variant_group,
    clip.variation,
    clip.sport,
    ...(clip.tags || [])
  ].join(" ").toLowerCase();
}

function applyFilters() {
  const query = search.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const loadout = loadoutFilter.value;
  const view = viewFilter.value;
  const preset = presetFilter.value;

  state.filtered = state.clips.filter(clip => {
    if (query && !searchText(clip).includes(query)) return false;
    if (category && clip.category !== category) return false;
    if (loadout && clip.loadout_profile !== loadout) return false;
    if (view && clip.view !== view) return false;
    if (preset && clip.capture_preset !== preset) return false;
    return true;
  });

  render();
}

function chip(text) {
  const span = document.createElement("span");
  span.className = "meta-chip";
  span.textContent = text;
  return span;
}

function openClip(clip) {
  dialogContent.replaceChildren();

  const video = document.createElement("video");
  video.className = "dialog-video";
  video.src = clip.file;
  video.controls = true;
  video.loop = true;
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;

  const info = document.createElement("div");
  info.className = "dialog-info";

  const title = document.createElement("h2");
  title.textContent = clip.title;

  const id = document.createElement("div");
  id.className = "card-id";
  id.textContent = clip.id;

  const details = document.createElement("div");
  details.className = "dialog-details";
  details.append(
    chip(humanize(clip.category)),
    chip(humanize(clip.loadout_profile)),
    chip(presetLabels[clip.capture_preset] || humanize(clip.capture_preset)),
    chip(humanize(clip.view))
  );
  if (clip.sport) details.append(chip(humanize(clip.sport)));
  if (clip.variation !== undefined) details.append(chip("Variant " + clip.variation));

  const download = document.createElement("a");
  download.className = "button primary";
  download.href = clip.file;
  download.download = "";
  download.textContent = "Download MP4";

  info.append(title, id, details, download);
  dialogContent.append(video, info);
  dialog.showModal();
}

function makeCard(clip) {
  const article = document.createElement("article");
  article.className = "clip-card";

  const previewButton = document.createElement("button");
  previewButton.className = "preview-button";
  previewButton.type = "button";
  previewButton.setAttribute("aria-label", "Preview " + clip.title);

  const video = document.createElement("video");
  video.src = clip.file;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";

  previewButton.append(video);
  previewButton.addEventListener("mouseenter", () => video.play().catch(() => {}));
  previewButton.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
  previewButton.addEventListener("focus", () => video.play().catch(() => {}));
  previewButton.addEventListener("blur", () => {
    video.pause();
    video.currentTime = 0;
  });
  previewButton.addEventListener("click", () => openClip(clip));

  const body = document.createElement("div");
  body.className = "card-body";

  const titleRow = document.createElement("div");
  titleRow.className = "card-title-row";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = clip.title;

  const id = document.createElement("span");
  id.className = "card-id";
  id.textContent = clip.id;

  titleRow.append(title, id);

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.append(
    chip(humanize(clip.category)),
    chip(humanize(clip.loadout_profile)),
    chip(presetLabels[clip.capture_preset] || humanize(clip.capture_preset)),
    chip(humanize(clip.view))
  );
  if (clip.sport) meta.append(chip(humanize(clip.sport)));
  if (clip.variation !== undefined) meta.append(chip("Variant " + clip.variation));

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const preview = document.createElement("button");
  preview.className = "button";
  preview.type = "button";
  preview.textContent = "Preview";
  preview.addEventListener("click", () => openClip(clip));

  const download = document.createElement("a");
  download.className = "button primary";
  download.href = clip.file;
  download.download = "";
  download.textContent = "Download";

  actions.append(preview, download);
  body.append(titleRow, meta, actions);
  article.append(previewButton, body);

  return article;
}

function render() {
  grid.replaceChildren();
  loading.hidden = true;

  const total = state.filtered.length;
  resultCount.textContent = total + (total === 1 ? " clip" : " clips");

  empty.hidden = total !== 0;
  if (total === 0) return;

  const fragment = document.createDocumentFragment();
  for (const clip of state.filtered) fragment.append(makeCard(clip));
  grid.append(fragment);
}

async function loadCatalog() {
  try {
    const response = await fetch("./data/clips.json", { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const catalog = await response.json();

    state.clips = Array.isArray(catalog.clips) ? catalog.clips : [];
    state.filtered = [...state.clips];

    populateFilter(categoryFilter, uniqueValues("category"));
    populateFilter(loadoutFilter, uniqueValues("loadout_profile"));
    populateFilter(viewFilter, uniqueValues("view"));
    populateFilter(
      presetFilter,
      uniqueValues("capture_preset"),
      value => presetLabels[value] || humanize(value)
    );

    render();

    if (state.clips.length === 0) {
      empty.hidden = false;
      empty.querySelector("strong").textContent = "The archive shell is ready.";
      empty.querySelector("span").textContent = "Clips will appear here as the first catalog entries are added.";
    }
  } catch (error) {
    loading.hidden = false;
    loading.querySelector("strong").textContent = "Could not load the catalog.";
    loading.append(document.createTextNode(" " + error.message));
  }
}

for (const control of [search, categoryFilter, loadoutFilter, viewFilter, presetFilter]) {
  control.addEventListener("input", applyFilters);
  control.addEventListener("change", applyFilters);
}

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  const video = dialog.querySelector("video");
  if (video) video.pause();
});

loadCatalog();
