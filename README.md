# Panda Police — Simple Website Blocker
![Panda Police Logo](./icons/icon-128.png)

## What is Panda Police Extension ?
A minimal browser extension to block websites by hostname. Useful for focused browsing and simple parental-control scenarios.
You can block or unblock any (https only) website at anytime.

## Features
- Block specific hostnames (e.g. `example.com`).
- Redirect blocked pages to a local `block-page.html`.
- Manage blocked sites from the `Block List` page (`option.html`).
- Lightweight: uses `chrome.storage.local` to persist blocked hostnames.

## Installation (Developer / Local)
1. Open Chrome (or a Chromium-based browser).
2. Go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select this extension folder (the project root containing `manifest.json`).

## Usage
- Click the extension icon to open the popup (`popup.html`).
- Use the **Block** button in the popup to add the current/desired site to the block list (implementation depends on the extension's popup script).
- Open **Block List** (the `option.html` page) to view and remove blocked hostnames. Click **Unblock** to remove a site.
- When a blocked hostname is visited (HTTPS pages), the extension redirects the tab to `block-page.html`.

## Files of Interest
- `manifest.json` — extension metadata and requested permissions.
- `background.js` — listens for tab URL changes and redirects blocked hostnames.
- `popup.html`, `popup.js` — extension popup UI and actions.
- `option.html`, `option.js` — Block List UI and management logic.
- `block-page.html` — local page shown when navigation is blocked.
- `style.css`, `icons/`, `images/` — styles and assets.

## Development Notes
- The extension stores blocked hostnames under the `Panda_police_data` key in `chrome.storage.local` with a `blockedWebsites` array.
- The background script checks `changeInfo.url` on `chrome.tabs.onUpdated` and only handles `https:` protocol URLs.
- To modify behavior (e.g., block by full URL or include non-HTTPS), update `background.js` accordingly.

## Permissions
This extension typically requires at least:
- `storage` — to persist blocked hostnames.
- `tabs` — to observe and update tabs.

Check `manifest.json` for the exact set of permissions before loading.

## Troubleshooting
- If a blocked site isn't redirected, ensure the hostname is listed in the Block List and that the tab's URL change is detected (background page is running).
- Use the browser's extension console (via `chrome://extensions/` ➜ Inspect views) to view `background.js` logs.

## License
This project is provided as-is for personal use and learning. Feel free to modify.

---
Created for a small, easy website-blocker extension.
