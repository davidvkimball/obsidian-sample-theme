# Obsidian Sample Theme Plus

This is a sample theme for [Obsidian](https://obsidian.md) with AI-assisted development tools and best practices.

## What Makes This Plus Version Different?

This template includes additional tools and documentation to improve your development experience:

### AI-Assisted Development System

- **`AGENTS.md`** - Project-specific instructions for AI coding assistants
- **`.agents/` folder** - Comprehensive development guides, code patterns, and best practices
- Helps AI assistants understand your project structure and coding conventions
- Provides quick reference guides and common task examples

### Reference Materials System (`.ref` folder)

- **Symlinks to Obsidian repositories** - Easy access to API docs, sample code, and examples
- **Centralized storage** - All projects share the same reference repos (no duplication)
- **6 core Obsidian projects** - API definitions, documentation, sample plugins, sample themes
- **Project-specific references** - Add your own plugin/theme references as needed

### Stylelint CSS Linting

- **Pre-configured by default** - Stylelint is set up and ready to use (requires `npm install`)
- **Browser compatibility checking** - Validates CSS against Obsidian's browser targets (Chrome and iOS)
- **Automatic migration** - Setup script available for adding Stylelint to existing themes
- **Catches common issues** - Invalid CSS properties, unsupported features, and more

**See also:** [obsidian-sample-plugin-plus](https://github.com/davidvkimball/obsidian-sample-plugin-plus) - The companion plugin template with similar enhancements.

## Recommended Tools and Plugins for Theme Development

These tools and plugins can significantly improve your theme development workflow:

### Theme Design Utilities

**[Theme Design Utilities](https://github.com/chrisgrieser/obsidian-theme-design-utilities)** - A comprehensive collection of utilities for Obsidian theme designers:
- Mobile emulation mode for testing mobile layouts
- Cycle between Source Mode, Live Preview, and Reading Mode
- Cycle through installed themes for quick comparison
- Light/dark mode toggle
- Red outlines for debugging CSS layout issues
- CSS feature compatibility checker

### MySnippets Plugin

**[MySnippets](https://github.com/chetachiezikeuzor/MySnippets-Plugin)** - Manage CSS snippets directly within Obsidian. Perfect for testing theme changes without leaving your editor.

### Theme Picker Plugin

**[Theme Picker](https://github.com/trey-sedate/obsidian-theme-picker)** - Quickly switch between installed themes without opening settings. Great for comparing your theme with others during development.

### Theme Hot Reload Plugin

**[Theme Hot Reload](https://github.com/mProjectsCode/obsidian-theme-hot-reload-plugin)** - Automatically reload your theme when CSS files change. Dramatically speeds up development by eliminating manual reloads.

## Quick Start

### For New Themes (Using This as a Template)

1. **Use this template** - Click "Use this template" on GitHub or clone this repo
2. **Optional: Install dependencies** (recommended): `npm install` (includes Stylelint for CSS linting)
3. **Optional: Setup reference materials** (recommended):
   - **Windows**: `scripts\setup-ref-links.bat`
   - **macOS/Linux**: `./scripts/setup-ref-links.sh`
4. **Start developing**: Edit `theme.css` to customize your theme
5. **Optional: Check CSS quality**: Run `npm run lint` to validate your CSS

### For Existing Themes (Upgrading to This System)

1. **Copy these to your theme**:
   - `AGENTS.md` → Your theme root
   - `.agents/` folder → Your theme root
   - `scripts/` folder → Your theme root

2. **Setup reference materials**:
   - **Windows**: `scripts\setup-ref-links.bat`
   - **macOS/Linux**: `./scripts/setup-ref-links.sh`

3. **Optional: Setup Stylelint**:
   ```bash
   node scripts/setup-stylelint.mjs
   npm install
   npm run lint
   ```

## First Time Publishing a Theme?

1. Choose **Use this template** to create a copy of this repository
2. Clone your new repository to your computer
3. Inside `manifest.json`, change the "name" field to your theme name
4. Add your name to the "author" field in `manifest.json`
5. Edit `theme.css` to add your styles

## How to Use

### Basic Development

- Clone this repo
- Edit `theme.css` to customize your theme's appearance
- Test your theme by copying `theme.css` and `manifest.json` to your vault's `.obsidian/themes/your-theme-name/` folder
- Reload Obsidian to see your changes

### Using the AI System

- Read `AGENTS.md` for project-specific instructions
- Check `.agents/` folder for development guides
- See `.agents/quick-reference.md` for a one-page cheat sheet

### Using Reference Materials

- Access Obsidian API: `.ref/obsidian-api/obsidian.d.ts`
- View sample theme code: `.ref/obsidian-sample-theme/`
- View sample plugin code: `.ref/obsidian-sample-plugin/`

## Adding your theme to the Theme Gallery

1. Include a screenshot thumbnail (16:9 aspect ratio, recommended size 512x288)
2. Submit a Pull Request to [`obsidianmd/obsidian-releases`](https://github.com/obsidianmd/obsidian-releases#community-theme)

## Releasing Versions

1. From your theme's repository, click on "Releases"
2. Click **Draft a new Release**
3. Fill out the Release information:
   - **Choose a Tag**: Create a new tag with your version number
   - **Release Title**: The version number
   - **Description**: What changed (optional)
   - **Files**: Upload `manifest.json` and `theme.css`
4. Click "Publish Release"
5. Update `versions.json` if needed (maps theme version → minimum Obsidian version)

> **Tip:** You can simplify the version bump process by running `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.

## Troubleshooting

### Reference folder not working

If `.ref` folder is empty or symlinks are broken:
1. Re-run the appropriate setup script (`.bat` for Windows, `.sh` for macOS/Linux)
2. Check that the central location exists: `../.ref/obsidian-dev/`

**Windows symlink issues:**
- Run PowerShell/CMD as Administrator, or
- Enable Developer Mode: Settings → Privacy & Security → For developers → Developer Mode

### Theme not appearing in Obsidian

1. Make sure `manifest.json` and `theme.css` are in `.obsidian/themes/your-theme-name/`
2. Verify `manifest.json` has the correct `name` field
3. Reload Obsidian (Settings → Appearance → Themes)
4. Check that `theme.css` contains valid CSS

## Manually Installing the Theme

- Copy over `theme.css` and `manifest.json` to your vault `VaultFolder/.obsidian/themes/your-theme-name/`
- Reload Obsidian and enable the theme in Settings → Appearance → Themes

## Funding URL

You can include funding URLs in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

Or for multiple URLs:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors"
    }
}
```

## API Documentation

See https://github.com/obsidianmd/obsidian-api
