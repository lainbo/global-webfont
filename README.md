# Global-webfont

[简体中文文档](./README.zh-hans.md)

Generate a Tampermonkey userscript that applies configured local fonts. Configure fonts in `src/scss/var.scss`, install them on your computer, then run:

```sh
pnpm install --frozen-lockfile
pnpm run build
pnpm run check
```

The project pins pnpm 8.15.9. Paste the complete `dist/index.user.js` into the existing Tampermonkey editor, save, and reload the target page. Building does not update the installed userscript automatically.

The default family is `MiSans VF`. `$regular-weight: 425` maps ordinary weight 400 to the variable font’s 425 instance; other requested weights retain their values within the font’s supported range of 150–700. HONOR Sans CN is also supported through its nine static font files; `$regular-weight` applies only to variable fonts.

The global rules provide default fonts and local aliases for common font names. Site overrides live in `src/specified/<domain>/index.scss`; comma-separated directory names share rules across domains. Matching includes the exact domain and its subdomains.

X/Twitter overrides cover text, numbers, punctuation, form controls and dynamically inserted content while preserving code fonts and SVG icons. Font fallback depends on installed fonts and their glyph coverage. See the Chinese documentation for the CSS model and its limits.

For browser regression checks, serve the repository with `python3 -m http.server 8765 --bind 127.0.0.1` and open `http://127.0.0.1:8765/tests/font-coverage.html`. The fixture runs the generated script with simulated hostnames inside real browser documents; verify the live website separately. Download the JSON report for reproducible results and the generated script hash.
