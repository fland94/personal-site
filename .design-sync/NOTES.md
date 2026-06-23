# Design-sync notes — FL Portfolio

## Repo quirks

**This is a Next.js app, not a published component library.**
The package has no `dist/`, no `main`/`module`/`exports` fields, and the package name
(`federico-landozzi-portfolio`) does not appear in `node_modules`. The converter runs in
synth-entry mode: pass `--entry .design-sync/_placeholder` (non-existent path) so the
converter walks up from `.design-sync/` to find `package.json` at repo root and uses
`src/components/` as the source dir.

Re-sync command:
```
node .ds-sync/package-build.mjs \
  --config .design-sync/config.json \
  --node-modules ./node_modules \
  --entry .design-sync/_placeholder \
  --out ./ds-bundle
```

**`next/link` process.env references**
`Header.tsx` imports `next/link`, which reads 6 `process.env.__NEXT_*` vars at module
scope. These crash in a plain browser IIFE (no `process` global). Fix: forked
`.ds-sync/lib/bundle.mjs` → `.design-sync/overrides/bundle.mjs`, extended the esbuild
`define` map with all 6 vars. See the header comment in that file.

**node_modules symlink**
`.design-sync/node_modules` → `../.ds-sync/node_modules` (symlink, gitignored).
The override needs this to resolve `esbuild` and `common.mjs`. Re-create if the symlink
is broken:
```
ln -sfn ../.ds-sync/node_modules .design-sync/node_modules
```

**Dark mode CSS scope**
The dark mode selector is `:root[data-theme="dark"]` (not a generic `[data-theme]`).
Setting `data-theme="dark"` on any element other than `html` does NOT activate dark mode.
Preview authored with `ref` callback: `el.ownerDocument.documentElement.setAttribute('data-theme', 'dark')`.
Side-effect: the preview body background also turns dark (correct dark mode behaviour).

**Header preview: cardMode column**
Header stories render wider than the default grid cell (it's a full-width sticky bar).
Config sets `overrides.Header.cardMode = "column"` to use full card width per story.

## Re-sync risks

- **Adding a component**: add the file to `src/components/`, it auto-discovers. No config change needed.
- **Adding a new `process.env.__NEXT_*` reference**: update the `define` map in `.design-sync/overrides/bundle.mjs` if a new Next.js import brings in an unknown env var.
- **Changing the dark mode selector** (e.g. switching from `:root[data-theme]` to a class): update the DarkTheme preview in `.design-sync/previews/Header.tsx` accordingly.
- **Upgrading Next.js**: re-check that the 6 `__NEXT_*` define values still cover all references from `next/link`. Run the build and look for `[BUNDLE_EXPORT] ReferenceError: process is not defined`.
- **Renaming the package** (`package.json > name`): update `pkg` and `globalName` in `.design-sync/config.json` to match.
