# Bases Freeze Panes

Bases Freeze Panes keeps the header row and the first column of a Bases table in view while you scroll, like Freeze Panes in a spreadsheet.

It works in base files, in bases embedded in notes, and in base code blocks. Your notes and base files stay as they are.

The header row and one frozen column are free. Pro adds 2 or 3 frozen columns, a column count for single files, and a pinned last column. Pro costs $5 a month, or $15 once, through GitHub Sponsors. A total payment of $15 meets the payment requirement for Pro without further payment. Sign-in and the checks below still apply.

## Features

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/bases-freeze-panes.gif" alt="Scrolling a wide base down and to the right while the header row and the file name column stay put" width="720">

### Frozen header and first column in base files

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/base-file.png" alt="A base file scrolled down and to the right with the header row and the file name column in place" width="720">

Open a base file with more columns than fit on the screen. Scroll to the right and the first column stays where it was. The other columns slide under it, and a thin line marks its edge.

The plugin keeps frozen cells on the page and pins them. The header has a solid background.

### Embedded bases keep their header

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/embedded-base.png" alt="A base embedded in a note scrolls inside its own box, and its header row sticks at the top" width="720">

A base embedded in a note normally grows to the full height of its rows. Its header then scrolls away with the note.

Bases Freeze Panes gives embedded tables a maximum height, 500 pixels by default. A taller table scrolls inside this box, so its header row sticks to the top. Short tables keep their normal height.

### Frozen Markdown and Dataview tables

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/note-tables.png" alt="A Markdown table in its own scroll box with the header and first column in view" width="720">

Turn on "Freeze Markdown and Dataview tables" in the settings. This free feature gives each rendered table in a note tab its own scroll box. Hover previews and canvas cards do not change. The header stays at the top, and the first column stays on the left. Cell text does not wrap, so a wide table scrolls to the side. It works in reading view and live preview. Source text does not change.

The main switch and the file switch also apply. Turn off "Freeze the header row" to let the header scroll. Set "Frozen columns" to 0 to let the first column scroll. Note tables freeze at most one column, with or without Pro. They use the embedded table height setting. Dataview queries need the Dataview plugin.

### Two or three frozen columns (Pro)

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/two-columns.png" alt="Two frozen columns keep the title and the author in view" width="720">

With Pro you can freeze 2 or 3 columns, for example the file name and the author of a book. Each frozen column keeps its own width and place. To choose which columns come first, change the column order in the base.

### Pinned last column (Pro)

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/last-column.png" alt="The last column of a wide base stays at the right edge while the middle columns scroll" width="720">

Turn on "Freeze the last column" and the last column stays at the right edge of the table, while the middle columns scroll between the frozen columns. Use it for a status, a total or a due date.

### Reading view, live preview and code blocks

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/reading-view.png" alt="A base code block in reading view with the header row and the first column frozen" width="720">

Freezing works wherever a table view of a base shows up in a note: embedded base files, base code blocks, live preview and reading view.

### Solid cells in light and dark themes

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/light-theme.png" alt="The frozen cells stay solid in the light theme" width="720">

Frozen cells must cover the cells that slide under them. Bases Freeze Panes paints them with the background colors of your theme, for normal rows, the header, the row under the pointer and the summary rows.

### Choices for one file

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/file-columns.png" alt="Set frozen columns for the current file picks 0 to 3 columns for one base or note" width="720">

Two commands change one base file or note:

- "Turn frozen panes on or off for the current file" is free.
- "Set frozen columns for the current file" picks 0 to 3 columns for that file. This one needs Pro.

Each choice moves with its file or folder when you rename or move it, and goes away when you delete the file. The settings list the choices.

## Install

When Bases Freeze Panes is listed in the community directory, open Settings, then Community plugins, then Browse, and search for "Bases Freeze Panes". Select Install, then Enable.

To install by hand, download `main.js`, `manifest.json` and `styles.css` from the latest release. Put the three files in `<vault>/.obsidian/plugins/bases-freeze-panes/`. Reload the list of community plugins, then turn on Bases Freeze Panes.

Bases Freeze Panes needs Obsidian 1.13.4 or newer and the Bases core plugin. It was tested on desktop with Obsidian 1.13.4 and 1.14.4.

## Usage

1. Turn on the plugin. Bases tables now have a frozen header and first column.
2. Open a wide base and scroll down and to the right.
3. To compare with the normal table, run "Turn frozen panes on or off". Run it again to turn freezing back on.
4. For Pro, sponsor on GitHub, then open the settings and select "Sign in with GitHub".

## Pro

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/pro-settings.png" alt="The Pro section of the settings after sign in, with the GitHub account and the Pro status" width="720">

To get Pro:

1. Sponsor [theluckystrike on GitHub Sponsors](https://github.com/sponsors/theluckystrike) with $5 a month, or $15 once. A total payment of $15 meets the payment requirement for Pro without further payment. Sign-in and the checks below still apply.
2. In Obsidian, open the settings of Bases Freeze Panes and select "Sign in with GitHub".
3. The plugin copies a code and opens github.com/login/device. Paste the code there and approve.

The status line then shows your GitHub login and the tier. If you sponsor after you sign in, select Refresh. A negative sponsorship answer turns Pro off. Your choices stay saved and come back when Pro is on again.

## Settings

<img src="https://raw.githubusercontent.com/theluckystrike/bases-freeze-panes/HEAD/docs/settings.png" alt="Settings with the Pro section, the main switch, the header row, the number of frozen columns and the height of embedded tables" width="720">

| Setting | Default | Allowed values |
| --- | --- | --- |
| Freeze panes | On | On or off |
| Freeze the header row | On | On or off |
| Freeze Markdown and Dataview tables | Off | On or off (free) |
| Frozen columns | 1 | 0 to 3 (2 and 3 need Pro) |
| Freeze the last column | Off | On or off (Pro) |
| Embedded table height | 500 | 200 to 1200 pixels, in steps of 50 |

"Choices for single files" lists every file with its own choice; delete an entry to remove it. If a saved value is out of range, the plugin moves it to the nearest allowed value.

## FAQ

### Why did my CSS snippet for the first column not work?

The core table draws only the cells that are in view, to stay fast with large bases. After you scroll right, the cells of the first column no longer exist on the page. The plugin tells the table to keep the frozen cells, and then pins them.

### Does it change my base files or notes?

No. It writes only its own settings file, `data.json` in the plugin folder.

### What happens after an Obsidian update?

The Bases table has no public interface for this, so the plugin checks that the table looks as expected before it changes anything. If a future update changes the table, the columns are no longer frozen and the settings tab says so. The header row keeps working.

### Why is the outline of the selected cell not visible in a frozen column?

The core app draws that outline in a separate layer that does not know about frozen columns. You can still click and edit the cell.

### Does it work for cards and list views?

No. Only table views have rows and columns to freeze.

## Payment, account and network

The core features are free. Pro features need a GitHub Sponsors sponsorship of theluckystrike: $5 a month or more, or $15 once. A total payment of $15 meets the payment requirement for Pro without further payment. Sign-in and the checks below still apply. Your notes stay readable and editable with or without Pro.

GitHub handles the payment. Sponsor at https://github.com/sponsors/theluckystrike. You need no account for the free features. Pro needs the GitHub account that sponsors.

Until you select "Sign in with GitHub" in the settings, Bases Freeze Panes makes no network requests. Sign in uses the GitHub device flow. Bases Freeze Panes sends its public client ID and the scope `read:user` to `https://github.com/login/device/code` and shows you a code. While you enter the code at https://github.com/login/device, it asks `https://github.com/login/oauth/access_token` every few seconds to check the sign-in status. The scope permits profile reads only. GitHub needs this access to show the sponsorship tier. It grants no repository scope and no write access.

After sign in, Bases Freeze Panes sends one query to `https://api.github.com/graphql`. It checks if the signed-in account sponsors theluckystrike. It asks for the tier and the total payment to theluckystrike. The plugin reuses a successful check for 7 days. Failed checks can retry after 6 hours. Select Refresh to request an earlier check. It sends no note content, file names or other vault data, and it has no telemetry.

After a successful check, Pro can work offline for up to 14 days. Sign out or a negative sponsorship answer turns Pro off. The plugin stores the GitHub token through the secret storage API of Obsidian. It does not put the token in its saved settings or its local sponsorship data. The local storage of this device keeps your GitHub login, the tier and the time of the last check. Sign out clears the token. You can also revoke the access in your GitHub settings, under Applications.

## Support

Report bugs and feature requests in this repository's issue tracker. Please include your Obsidian version, your theme, and the view settings of the base that shows the problem.

To build from source:

```
npm ci
npm run build
npm test
```

The tests check golden cases for the column layout and the GitHub Sponsors rules. An end-to-end test scrolls real tables in Obsidian and checks that the header and the first column stay in place.

## License

MIT
