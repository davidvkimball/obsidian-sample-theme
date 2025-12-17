# Obsidian Sample Theme Plus

This is a sample theme for [Obsidian](https://obsidian.md) enhanced with AI-assisted development tools and best practices.

## What Makes This Enhanced Version Different?

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
- **Note**: Simple CSS themes don't require npm, but this template includes Stylelint for better development experience. You can edit `theme.css` directly without npm, but linting requires it.

## Recommended Tools and Plugins for Theme Development

These tools and plugins can significantly improve your theme development workflow:

### Theme Design Utilities

**[Theme Design Utilities](https://github.com/chrisgrieser/obsidian-theme-design-utilities)** - A comprehensive collection of utilities and quality-of-life features for Obsidian theme designers.

**Key features:**
- Mobile emulation mode for testing mobile layouts
- Cycle between Source Mode, Live Preview, and Reading Mode
- Cycle through installed themes for quick comparison
- Light/dark mode toggle
- Freeze Obsidian for capturing tooltips and context menus
- Red outlines for debugging CSS layout issues
- CSS feature compatibility checker (shows Chrome version)
- Cheatsheet of Obsidian CSS classes

### MySnippets Plugin

**[MySnippets](https://github.com/chetachiezikeuzor/MySnippets-Plugin)** - Manage CSS snippets directly within Obsidian. Perfect for testing theme changes without leaving your editor.

### Theme Picker Plugin

**[Theme Picker](https://github.com/trey-sedate/obsidian-theme-picker)** - Quickly switch between installed themes without opening settings. Great for comparing your theme with others during development.

### Print Preview Plugin

**[Print Preview](https://github.com/nothingislost/obsidian-print-preview)** - Debug "export to PDF" issues by inspecting how your theme renders in print format. Essential for ensuring your theme looks good when exported.

### Theme Hot Reload Plugin

**[Theme Hot Reload](https://github.com/mProjectsCode/obsidian-theme-hot-reload-plugin)** - Automatically reload your theme when CSS files change. Dramatically speeds up development by eliminating manual reloads.

### Stylelint Guide

**[Why and How to use Stylelint for your Obsidian Theme](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/Guides/Why+and+How+to+use+Stylelint+for+your+Obsidian+Theme)** - Comprehensive guide on setting up and using Stylelint for Obsidian theme development. Covers browser compatibility, configuration, and best practices.

## Quick Start

### For New Themes (Using This as a Template)

1. **Use this template** - Click "Use this template" on GitHub or clone this repo
2. **Optional: Install dependencies** (recommended): `npm install` (includes Stylelint for CSS linting)
   - **Note**: You can edit `theme.css` directly without npm, but linting requires it
3. **Optional: Setup reference materials** (recommended):
   - **Windows**: `scripts\setup-ref-links.bat`
   - **macOS/Linux**: `./scripts/setup-ref-links.sh`
4. **Start developing**: Edit `theme.css` to customize your theme
   - **Note**: Themes don't need a build step - just edit `theme.css` directly and reload Obsidian
5. **Optional: Check CSS quality**: Run `npm run lint` to validate your CSS (requires npm install)
   - Shows helpful success message when linting passes
   - Uses `scripts/lint-wrapper.mjs` (automatically created by setup script)

### For Existing Themes (Upgrading to This System)

You can add these enhancements to your existing theme:

1. **Copy these to your theme**:
   - `AGENTS.md` → Your theme root
   - `.agents/` folder → Your theme root
   - `scripts/` folder → Your theme root

2. **Setup reference materials**:
   - **Windows**: `scripts\setup-ref-links.bat`
   - **macOS/Linux**: `./scripts/setup-ref-links.sh`

3. **Optional: Setup Stylelint** (recommended):
   ```bash
   node scripts/setup-stylelint.mjs
   npm install
   npm run lint
   ```

4. **Done!** You now have AI-assisted development guides, reference materials, and CSS linting.

## Setup Scripts Details

### Stylelint Setup (`scripts/setup-stylelint.mjs`)

**What it does:**
- Updates `package.json` with Stylelint devDependencies and scripts
- Generates `.stylelintrc.json` configuration file (with Obsidian browser compatibility rules)
- Generates `.stylelintignore` file
- Migrates rules from existing Stylelint configs (if present)
- Copies `lint-wrapper.mjs` for helpful linting success messages

**Usage:**
```bash
node scripts/setup-stylelint.mjs
npm install
npm run lint        # Shows helpful success message when passing
npm run lint:fix     # Shows helpful success message when fixed
```

**Note:** Stylelint is pre-configured in this template. The setup script is primarily for adding Stylelint to existing themes or updating the configuration. The lint commands use `scripts/lint-wrapper.mjs` which adds helpful success messages when linting passes.

### Reference Materials Setup (`scripts/setup-ref-links.*`)

**What it does:**
- Creates `../.ref/obsidian-dev/` directory (central location for all reference repos)
- Clones or updates the 6 core Obsidian projects:
  - `obsidian-api` - Official API type definitions
  - `obsidian-sample-plugin` - Template plugin with best practices
  - `obsidian-developer-docs` - Source for docs.obsidian.md
  - `obsidian-plugin-docs` - Plugin-specific documentation
  - `obsidian-sample-theme` - Theme template
  - `eslint-plugin` - ESLint rules for Obsidian plugins
- Creates symlinks in your project's `.ref/` folder pointing to the central location
- Creates `plugins/` and `themes/` subdirectories for project-specific references

**Note:** The `.ref` folder is gitignored and acts as a "portal" to reference materials. It doesn't contain actual files, just symlinks. All your projects can share the same central reference repos.

**Windows Users:** Creating symlinks on Windows may require administrator privileges. If you get a "permission denied" error:
- Run PowerShell or Command Prompt as Administrator, then run the setup script
- Or enable Developer Mode in Windows Settings (Settings → Privacy & Security → For developers → Developer Mode)
- The script uses directory junctions (`mklink /J`) which work without admin rights in most cases

## First Time Publishing a Theme?

### Quick start

<img width="244" alt="Pasted image 20220822135601" src="https://user-images.githubusercontent.com/693981/186000386-4f4da987-fcaf-4aa5-aed4-e34b5901255d.png">

First, choose **Use this template**. That will create a copy of this repository (repo) under your Github profile. Then, you will want to _clone_ your new repository to your computer.

Once you have the repo locally on your computer, there are a couple of placeholder fields you will need to fill in.

1. Inside the `manifest.json` file, change the "name" field to whatever you want the name of your theme to be. For example:

  ```json
  {
    "name": "Moonstone",
    "version": "0.0.0",
    "minAppVersion": "1.0.0"
  }
  ```

2. Also inside the manifest.json file, you can include your name under next to the "author" field.

After you have those fields configured, all that's left to do is add your styles! All of your CSS needs to be inside the file `theme.css` which is located at root of your repository.

## How to Use

### Basic Development

- Clone this repo.
- Edit `theme.css` to customize your theme's appearance.
- Test your theme by copying `theme.css` and `manifest.json` to your vault's `.obsidian/themes/your-theme-name/` folder.
- Reload Obsidian to see your changes.

### Using the AI System

- Read `AGENTS.md` for project-specific instructions
- Check `.agents/` folder for development guides:
  - `quick-reference.md` - One-page cheat sheet
  - `common-tasks.md` - Quick code examples
  - `code-patterns.md` - Comprehensive patterns
  - `troubleshooting.md` - Common issues and solutions
  - And more...

### Using Reference Materials

- Access Obsidian API: `.ref/obsidian-api/obsidian.d.ts`
- View sample theme code: `.ref/obsidian-sample-theme/`
- View sample plugin code: `.ref/obsidian-sample-plugin/`
- See [`.agents/ref-instructions.md`](.agents/ref-instructions.md) for details

## Adding your theme to the Theme Gallery

### Add a screenshot thumbnail

Inside the repository, include a screenshot thumbnail of your theme. You can name the file anything, for example `screenshot.png`. This image will be used for the small preview in the theme list.

Your screenshot file should be `16:9` aspect ratio.
The recommended size is 512x288.

### Submit your theme for review

To have your theme included in the Theme Gallery, you will need to submit a Pull Request to [`obsidianmd/obsidian-releases`](https://github.com/obsidianmd/obsidian-releases#community-theme).

## Releasing Versions

If your theme is getting more and more complex, you might want to start thinking about how your theme will stay compatible with different versions of Obsidian. Introduced in v0.16 of Obsidian, themes support [Github Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository). This means that you can specify which versions of your theme are compatible with which versions of Obsidian.

### Steps for releasing the initial version of your theme (1.0.0)

1. From your theme's repository, click on "Releases".
   
<img width="235" alt="Pasted image 20220822145001" src="https://user-images.githubusercontent.com/693981/186000441-287a1a97-65f6-4b5f-ba66-810ceae91cd3.png">

2. On the Releases page, there should be a button to **Draft a new Release**. Press it.

<img width="202" alt="Pasted image 20220822145048" src="https://user-images.githubusercontent.com/693981/186000664-6c63ae14-f685-4d39-bfe6-324f95cd9669.png">

3. Fill out the Release information form.
	- **Choose a Tag**: Type in the name of the version number here. At the bottom of the dropdown should be a button to create a new tag with your latest theme changes. Choose this option.
		<img width="340" alt="Pasted image 20220822145648" src="https://user-images.githubusercontent.com/693981/186000848-bd1c2619-ea09-4e70-a886-40769cda6921.png">
	- **Release Title**: This can be the version number.
	- **Description** _Optional_: Anything that changed
	- **Files:** The most important part of this form is uploading the files. You can do this by dragging 'n dropping the `manifest.json` file and the `theme.css` file your for theme inside the file upload field.

<img width="946" alt="Pasted image 20220822145356" src="https://user-images.githubusercontent.com/693981/186000772-e689ecea-c3b7-4e9d-9204-7ad62c0123aa.png">

4. Click "Publish Release."
5. Make sure that `versions.json` is set up correctly. This file is a map.
  ```json
  {
    "1.0.0": "0.16.0"
  }
  ```
  
  This means that version 1.0.0 of your theme is compatible with version 0.16.0 of Obsidian. For the initial release of your theme, you shouldn't need to make any changes to this file.

### Steps for releasing new versions

Releasing a new version of your theme is the same as releasing the initial version.

1. From your theme's repository, click on "Releases."
2. On the Releases page, there should be a button to **Draft a new Release**. Press it.
3. Fill out the Release information form.
	- **Choose a Tag**: Type in the name of the version number here. At the bottom of the dropdown should be a button to create a new tag with your latest theme changes. Choose this option.
		<img width="333" alt="Pasted image 20220822145812" src="https://user-images.githubusercontent.com/693981/186000912-f494def9-0f67-4662-92bf-bd278082455f.png">
	- **Release Title**: This can be the version number.
	- **Description** _Optional_: Anything that changed
	- **Files:** The most important part of this form is uploading the files. You can do this by dragging 'n dropping the `manifest.json` file and the `theme.css` file your for theme inside the file upload field.

4. Click "Publish Release."
5. Update the `versions.json` file in your repository. For the initial release of your theme, you probably didn't need to make any changes to the `versions.json` file. When you release subsequent versions of your theme; however, it's best practice to include the new version as entry in the versions.json file. So this might look like:
  ```json
  {  
		"1.0.0": "0.16.0",
		"1.0.1": "0.16.0"
  }
  ```

  What's important to note here is: the new version is included as the "key" and the "value" is the minimum version of Obsidian that your theme compatible with. So if the new version of your theme is only compatible with an Insider version of Obsidian, it's important to set this value accordingly. This will prevent users on older versions of Obsidian from updating to the newer version of your theme.

> **Tip:** You can simplify the version bump process by running `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.
> The command will bump version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`.

## Troubleshooting

### Reference folder not working

If `.ref` folder is empty or symlinks are broken:
1. Re-run the appropriate setup script (`.bat` for Windows, `.sh` for macOS/Linux)
2. Check that the central location exists: `../.ref/obsidian-dev/`
3. Verify symlinks were created in your project's `.ref/` folder

**Windows symlink issues:**
- If you get "permission denied" errors, run PowerShell/CMD as Administrator
- Or enable Developer Mode: Settings → Privacy & Security → For developers → Developer Mode
- Directory junctions should work without admin rights in most cases

### Theme not appearing in Obsidian

1. Make sure `manifest.json` and `theme.css` are in the correct location: `.obsidian/themes/your-theme-name/`
2. Verify `manifest.json` has the correct `name` field
3. Reload Obsidian (Settings → Appearance → Themes)
4. Check that `theme.css` contains valid CSS

## Manually Installing the Theme

- Copy over `theme.css` and `manifest.json` to your vault `VaultFolder/.obsidian/themes/your-theme-name/`.
- Reload Obsidian and enable the theme in Settings → Appearance → Themes.

## Funding URL

You can include funding URLs where people who use your theme can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

If you have multiple URLs, you can also do:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API Documentation

See https://github.com/obsidianmd/obsidian-api
