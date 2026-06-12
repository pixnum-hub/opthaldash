# OphthalDash PWA — Deployment Guide
© Manik Roy 2026. All Rights Reserved.

## Files Included

| File | Purpose |
|------|---------|
| `OphthalDash_v3.html` | Main app (with PWA tags injected) |
| `manifest.json` | Web App Manifest |
| `sw.js` | Service Worker (offline cache) |
| `favicon.ico` | Browser favicon (16/32/48px) |
| `apple-touch-icon.png` | iOS home screen icon (180×180) |
| `icon-*.png` | All PWA icons (16–512px) |
| `icon-192x192-maskable.png` | Android adaptive icon |
| `icon-512x512-maskable.png` | Android adaptive icon (large) |

## Deployment

### Option 1 — Static Hosting (Netlify / Vercel / GitHub Pages)
1. Upload **all files** from this folder to the root of your site
2. Ensure HTTPS is enabled (required for PWA)
3. Visit your URL — browser will show "Add to Home Screen" prompt

### Option 2 — Local Server
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```
Then open `http://localhost:8080/OphthalDash_v3.html`

> ⚠️ Service Workers require HTTPS or localhost — opening the HTML file directly (`file://`) will not register the SW.

## PWA Features
- **Installable** on Android, iOS, Windows, macOS, Linux
- **Offline capable** — all assets cached after first load
- **App shortcuts** — "Add Surgery" and "Dashboard" from long-press
- **Maskable icons** — adaptive shape on Android
- **Standalone display** — no browser chrome when installed

## Icon Sizes Reference
| Size | Used For |
|------|----------|
| 16, 32 | Browser favicon |
| 48 | Windows taskbar |
| 57, 60 | Old iOS |
| 72 | Android low-density |
| 76 | iPad non-retina |
| 96 | Android hdpi |
| 114, 120 | iPhone retina |
| 128 | Chrome Web Store |
| 144 | Windows tile / Android |
| 152 | iPad retina |
| 167 | iPad Pro |
| 180 | iPhone retina (apple-touch-icon) |
| 192 | Android home screen |
| 256 | Windows app list |
| 384 | Android xxxhdpi |
| 512 | PWA splash screen / Play Store |
