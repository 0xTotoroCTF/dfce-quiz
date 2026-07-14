# DFCE 2026 Quiz — Cybersecurity & Personal Data Protection

A local, static quiz web app (no build step) for the DFCE 2026 booth. Homepage collects a
username, then 10 questions on cybersecurity and personal data protection (incl. Brunei's PDPO)
are shown one at a time, followed by a results screen and leaderboard.

## Running locally (single device, no setup)

Works out of the box with a local-only leaderboard (stored in the browser via `localStorage`).

```
python -m http.server 8901
```

then open `http://localhost:8901`. (Double-clicking `index.html` also mostly works, but a local
server is more reliable.)

## Shared leaderboard across multiple devices (Firebase)

By default every device keeps its **own separate** leaderboard. To have one shared leaderboard
that every tablet/laptop/phone at the booth updates and sees live, wire up a free Firestore
database:

1. Go to the [Firebase console](https://console.firebase.google.com) → **Add project** (the free
   "Spark" plan is enough).
2. In the new project: **Build → Firestore Database → Create database** → start in
   **production mode** → pick any region.
3. **Project settings** (gear icon) → **General** → under "Your apps" click the **Web** icon
   (`</>`) → register the app (no need for Firebase Hosting).
4. Copy the `firebaseConfig` object it shows you.
5. Paste those values into [firebase-config.js](firebase-config.js) in this folder, replacing the
   `YOUR_...` placeholders.
6. In Firestore → **Rules**, paste the contents of [firestore.rules](firestore.rules) from this
   folder, then **Publish**. These rules let anyone read the leaderboard and submit one new score,
   but nobody can edit or delete existing scores from the client.
7. Reload the app — the leaderboard screen will say "Live — synced across all devices" once it's
   working.

If `firebase-config.js` is left unconfigured, the app silently falls back to the local-only
leaderboard, so it's safe to deploy either way.

Note: the Firebase config values (including the API key) are meant to be public in client-side
apps like this — they just identify your project. Actual protection comes from the Firestore
rules above, not from hiding the key.

## Exporting the leaderboard (CSV)

[admin.html](admin.html) is a private export page — it's not linked anywhere on the public quiz,
so visitors won't stumble onto it. Open it directly (e.g.
`https://<username>.github.io/<repo>/admin.html`, or `http://localhost:8901/admin.html` when
running locally) to:

- See how many attempts happened on a given day
- Download a CSV for just that day, or one CSV with every attempt ever recorded
- Works against whichever data source the main quiz is using (shared Firestore leaderboard, or
  local-only storage if Firebase isn't configured)

It's kept off the public site by simply not being linked from `index.html` — same data
visibility as the public top-10 leaderboard, just with a full CSV download instead of a top-10
view. Bookmark the URL for yourself.

## Hosting on GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo → **Settings → Pages** → Source: deploy from a branch → pick `main` (or your default
   branch) and `/ (root)` (or `/dfce-quiz` if the repo has other folders — adjust by moving these
   files to the repo root, or set the folder as the Pages source if using a `docs/` convention).
3. Your quiz will be live at `https://<username>.github.io/<repo>/`.
4. If you configured Firebase (above), every device that opens that URL shares the same
   leaderboard automatically — no extra config needed per device.

## Files

- `index.html` — page structure (home / quiz / results / leaderboard screens)
- `style.css` — theme and layout
- `questions.js` — the 10-question bank (edit here to change/add questions)
- `firebase-config.js` — optional Firebase project config (leave as placeholder for local-only mode)
- `firestore.rules` — Firestore security rules to paste into the Firebase console
- `script.js` — app logic, quiz flow, and leaderboard read/write (Firestore or localStorage)
- `admin.html` / `admin.js` — private CSV export page, not linked from the public site
