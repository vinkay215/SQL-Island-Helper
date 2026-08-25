# SQL Island Helper

A lightweight Chrome/Chromium extension designed to assist with exercises on **SQL Island**.

SQL Island Helper detects the current exercise, matches it with the corresponding SQL solution, and allows the user to view, copy, or insert the answer directly into the SQL editor using configurable keyboard shortcuts.

> Built for learning, practicing, and navigating SQL Island exercises more conveniently.

## Features

- Automatically detects the **current SQL Island exercise**
- Matches the exercise with its corresponding **SQL answer**
- Displays the current question and answer in a compact overlay
- Insert the SQL answer directly into the **Ace Editor**
- Copy the current SQL answer to the clipboard
- Menu is hidden by default
- Customizable keyboard shortcuts
- Settings popup accessible from the extension toolbar
- Shortcut settings are saved locally using `chrome.storage.local`
- Supports both HTTP and HTTPS versions of SQL Island
- Lightweight and requires no external server

## Default Keyboard Shortcuts

| Action | Default Shortcut |
|---|---|
| Show / Hide Answer Menu | `Ctrl + B` |
| Insert Current Answer | `Ctrl + N` |
| Copy Current Answer | `Ctrl + M` |

All shortcuts can be changed from the extension's **Settings**.

## Shortcut Settings

Click the **SQL Island Helper** icon in the browser toolbar to open the Settings panel.

From there, you can configure shortcuts for:

- Show / Hide Menu
- Insert Answer
- Copy Answer

To change a shortcut:

1. Click the shortcut you want to modify.
2. Press the new key combination.
3. The new shortcut is saved automatically.
4. The change takes effect immediately.

The extension prevents multiple actions from using the same shortcut.

Use **Restore Defaults** to return to:

```text
Ctrl + B → Show / Hide Menu
Ctrl + N → Insert Answer
Ctrl + M → Copy Answer
```

## How It Works

SQL Island displays the current exercise inside:

```html
<h3 id="exercise_text">
    ...
</h3>
```

SQL Island Helper reads the text from `#exercise_text` and compares it against its built-in question and answer database.

When a matching exercise is found, the extension prepares the corresponding SQL query.

For example:

```sql
SELECT *
FROM INHABITANT
WHERE job = 'baker'
ORDER BY gold DESC;
```

The extension does **not automatically submit or execute** the SQL query.

The user decides whether to:

- View the answer
- Copy the answer
- Insert the answer into the editor

## Answer Menu

The answer menu is **hidden by default**.

Press:

```text
Ctrl + B
```

to show it.

The menu displays:

**Current Question**

The exercise currently detected from SQL Island.

**Current Answer**

The SQL query associated with the detected exercise.

Press `Ctrl + B` again to hide the menu.

## Insert Answer

Press:

```text
Ctrl + N
```

or click **Insert Answer** inside the menu.

The extension inserts the SQL query directly into SQL Island's **Ace Editor**.

Instead of modifying the visible `.ace_content` HTML, SQL Island Helper communicates with the actual Ace Editor instance and sets its value correctly.

## Copy Answer

Press:

```text
Ctrl + M
```

or click **Copy**.

The current SQL answer will be copied to your clipboard.

This also works while the answer menu is hidden.

## Installation

### Install from Source

1. Download or clone this repository.

```bash
git clone https://github.com/YOUR_USERNAME/SQL-Island-Helper.git
```

2. Open Chrome or another Chromium-based browser.

3. Navigate to:

```text
chrome://extensions
```

4. Enable:

```text
Developer mode
```

5. Click:

```text
Load unpacked
```

6. Select the extension directory.

7. Open SQL Island:

```text
https://sql-island.informatik.uni-kl.de/
```

8. Refresh the page if necessary.

SQL Island Helper is now ready.

## Project Structure

```text
SQL-Island-Helper/
│
├── manifest.json
├── background.js
├── content.js
├── page.js
├── style.css
│
├── popup.html
├── popup.css
├── popup.js
│
└── README.md
```

### `manifest.json`

Chrome Extension Manifest V3 configuration.

Defines permissions, content scripts, toolbar popup, background service worker, and supported SQL Island URLs.

### `content.js`

Main extension logic.

Responsible for:

- Reading the current exercise
- Matching questions
- Managing answers
- Displaying the answer menu
- Handling shortcuts
- Communicating with the Ace Editor

### `page.js`

Runs in the page context and communicates directly with SQL Island's Ace Editor.

### `background.js`

Initializes default extension settings.

### `popup.html`

Settings interface displayed when the extension icon is clicked.

### `popup.js`

Handles shortcut recording, validation, storage, and restoration.

### `style.css`

Styles the SQL Island answer overlay.

### `popup.css`

Styles the extension Settings interface.

## Permissions

SQL Island Helper uses only the permissions required for its functionality.

### `storage`

Used to save custom keyboard shortcuts locally.

### `activeTab`

Allows interaction with the current SQL Island tab when necessary.

### `scripting`

Allows extension scripts to interact with supported SQL Island pages.

### Host Permission

The extension is designed to operate on:

```text
https://sql-island.informatik.uni-kl.de/*
http://sql-island.informatik.uni-kl.de/*
```

## Privacy

SQL Island Helper does not require an account and does not send exercise data to an external server.

Shortcut preferences are stored locally through Chrome's extension storage.

## Purpose

This project was created as a learning utility for SQL Island.

It can be useful for:

- Reviewing SQL syntax
- Checking solutions after attempting an exercise
- Navigating SQL Island more efficiently
- Studying SQL statements such as `SELECT`, `WHERE`, `UPDATE`, `DELETE`, `INSERT`, `ORDER BY`, `GROUP BY`, aggregate functions, and multi-table queries

Users are encouraged to attempt each exercise themselves before checking the solution.

## Compatibility

Designed primarily for:

- Google Chrome
- Chromium-based browsers
- Manifest V3

The extension depends on the current structure of the SQL Island website. If SQL Island changes its DOM structure or editor implementation, some functionality may require updates.

## Disclaimer

This project is an independent educational tool and is not an official extension of SQL Island or Rheinland-Pfälzische Technische Universität Kaiserslautern-Landau.

All trademarks, website content, and related materials belong to their respective owners.

## Author

**NguyenQuocVinh**

## Copyright

Copyright © 2026 NguyenQuocVinh.

All rights reserved.