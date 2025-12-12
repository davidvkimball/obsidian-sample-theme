<!--
Source: Project-specific instructions
Last synced: 2025-01-27
Update frequency: Update as reference management strategy evolves
Applicability: Both
-->

# .ref Folder Instructions

## Purpose

The `.ref` folder is a gitignored directory used to store reference materials, documentation, and cloned repositories that are useful for development but should not be committed to version control.

## Folder Organization

The `.ref` folder is organized as follows:

- **Root level**: Base Obsidian repositories (API, official docs, sample projects)
  - `obsidian-api/`
  - `obsidian-sample-plugin/`
  - `obsidian-developer-docs/`
  - `obsidian-plugin-docs/`
  - `obsidian-sample-theme/`

- **`plugins/`**: Community plugins you want to reference
  - Drop any plugins here for reference and learning
  - Example: `.ref/plugins/some-community-plugin/`

- **`themes/`**: Community themes you want to reference
  - Drop any themes here for reference and learning
  - Example: `.ref/themes/some-community-theme/`

## For AI Agents

**IMPORTANT**: When the user asks you to reference something in `.ref`, actively search for it. The `.ref` folder may be hidden by default in some file explorers, but it exists in the project root. Use tools like `list_dir`, `glob_file_search`, or `read_file` to access `.ref` contents.

**Organization to remember**:
- Base Obsidian repos are in `.ref/` root (e.g., `.ref/obsidian-api/`)
- Community plugins are in `.ref/plugins/` (e.g., `.ref/plugins/plugin-name/`)
- Community themes are in `.ref/themes/` (e.g., `.ref/themes/theme-name/`)

If you cannot find `.ref` initially, try:
- Listing the root directory with hidden files enabled
- Using `glob_file_search` with pattern `.ref/**`
- Directly reading files with paths like `.ref/obsidian-api/README.md` or `.ref/plugins/plugin-name/main.ts`

## Symlink Strategy for Windows

To efficiently manage shared reference repositories (like `obsidian-api`) across multiple Obsidian plugin projects, use Windows directory junctions (symlinks).

### Setup Steps

1. **Clone the reference repositories once to a central location**:
   ```powershell
   # Clone all reference repos to a central refs directory
   cd C:\Users\david\Development\.ref
   git clone https://github.com/obsidianmd/obsidian-api.git obsidian-api
   git clone https://github.com/obsidianmd/obsidian-sample-plugin.git obsidian-sample-plugin
   git clone https://github.com/obsidianmd/obsidian-developer-docs.git obsidian-developer-docs
   git clone https://github.com/obsidianmd/obsidian-plugin-docs.git obsidian-plugin-docs
   git clone https://github.com/obsidianmd/obsidian-sample-theme.git obsidian-sample-theme
   ```
   
   **Note**: If you've already cloned these repos, you can skip this step.

2. **Create directory junctions in each plugin project**:
   ```powershell
   # Navigate to your plugin project root
   cd C:\Users\david\Development\obsidian-ui-tweaker
   
   # Create the .ref directory if it doesn't exist
   New-Item -ItemType Directory -Force -Path .ref
   
   # Create directory junctions pointing to the central clones
   mklink /J .ref\obsidian-api C:\Users\david\Development\.ref\obsidian-api
   mklink /J .ref\obsidian-sample-plugin C:\Users\david\Development\.ref\obsidian-sample-plugin
   mklink /J .ref\obsidian-developer-docs C:\Users\david\Development\.ref\obsidian-developer-docs
   mklink /J .ref\obsidian-plugin-docs C:\Users\david\Development\.ref\obsidian-plugin-docs
   mklink /J .ref\obsidian-sample-theme C:\Users\david\Development\.ref\obsidian-sample-theme
   ```

3. **Update all references at once**:
   ```powershell
   # Navigate to the central location and pull updates
   cd C:\Users\david\Development\.ref\obsidian-api
   git pull
   
   cd ..\obsidian-sample-plugin
   git pull
   
   cd ..\obsidian-developer-docs
   git pull
   
   cd ..\obsidian-plugin-docs
   git pull
   
   cd ..\obsidian-sample-theme
   git pull
   ```
   
   All plugin projects using the junctions will immediately see the updated content.

### Benefits

- **Single source of truth**: One clone that all projects reference
- **Easy updates**: One `git pull` updates all projects
- **Disk space efficient**: No duplicate clones
- **Works with Git**: Junctions are transparent to Git operations

### Alternative: Multiple Clones

If you prefer to have separate clones in each project (simpler but less efficient):

```powershell
cd .ref
git clone https://github.com/obsidianmd/obsidian-api.git obsidian-api
git clone https://github.com/obsidianmd/obsidian-sample-plugin.git obsidian-sample-plugin
git clone https://github.com/obsidianmd/obsidian-developer-docs.git obsidian-developer-docs
git clone https://github.com/obsidianmd/obsidian-plugin-docs.git obsidian-plugin-docs
git clone https://github.com/obsidianmd/obsidian-sample-theme.git obsidian-sample-theme
```

Then update each clone separately when needed.

### Common Reference Repositories

**Base Obsidian Repositories (Root Level)**:
- `obsidian-api`: Official Obsidian API documentation and type definitions
- `obsidian-sample-plugin`: Template plugin with best practices (contains `AGENTS.md` to sync from)
- `obsidian-developer-docs`: Source vault for docs.obsidian.md (official documentation)
- `obsidian-plugin-docs`: Plugin-specific documentation and guides
- `obsidian-sample-theme`: Theme template (useful for organizational patterns, less critical for plugins)

**Community References (Organized in Subfolders)**:
- `plugins/`: Add community plugins here for reference and learning
- `themes/`: Add community themes here for reference and learning

**To add a community plugin or theme**:
```powershell
# For a plugin
cd .ref\plugins
git clone https://github.com/username/plugin-name.git plugin-name

# For a theme
cd .ref\themes
git clone https://github.com/username/theme-name.git theme-name
```

**Note**: See [sync-procedure.md](sync-procedure.md) for the standard procedure to keep `.agents` content synchronized with updates from these repositories.

## Adding Project-Specific References

Sometimes you want to reference another project on your PC that's specific to this plugin/theme project (not shared across all projects). Choose the method based on your use case:

### Option A: External Project or Repository

**Use when**: Referencing an external project or repository where you want to check for updates periodically, or you're not actively developing it alongside this project.

**For community plugins or themes**, use the organized subfolders:
```powershell
# For a community plugin
cd .ref\plugins
git clone https://github.com/username/plugin-name.git plugin-name

# For a community theme
cd .ref\themes
git clone https://github.com/username/theme-name.git theme-name
```

**For other projects** (not plugins/themes), clone directly into `.ref`:
```powershell
# From your project root
cd .ref

# Clone the repository directly into .ref
git clone https://github.com/username/repo-name.git repo-name

# Or if it's a local Git repo
git clone C:\path\to\local\project.git repo-name
```

**Benefits**: 
- Can check for updates with `git pull`
- Full Git history available
- Easy to keep in sync when needed

**To check for updates later**:
```powershell
cd .ref\repo-name
git pull
```

### Option B: Concurrent Development (Live Updates)

**Use when**: You're actively developing another project alongside this one and want to see changes in real-time.

```powershell
# From your project root
# Create a directory junction pointing to the local project
cmd /c mklink /J .ref\project-name C:\path\to\local\project
```

**Benefits**:
- No duplication - references existing project
- Changes in original project are immediately visible
- Perfect for projects you're actively developing alongside this one

**Examples**:
```powershell
# Reference another Obsidian plugin you're working on concurrently
# (can go in plugins/ subfolder or root, depending on preference)
cmd /c mklink /J .ref\plugins\my-other-plugin C:\Users\david\Development\my-other-plugin

# Or reference a theme you're developing
cmd /c mklink /J .ref\themes\my-theme C:\Users\david\Development\my-theme
```

**Note**: With symlinks, any changes you make to the original project are immediately visible in `.ref/project-name/` - no need to pull or sync.

### Option C: Static Snapshot (Rarely Needed)

If the project isn't a Git repo and you just need a one-time snapshot:

```powershell
# For plugins or themes, use the organized subfolders
Copy-Item -Path C:\path\to\local\plugin -Destination .ref\plugins\plugin-name -Recurse
Copy-Item -Path C:\path\to\local\theme -Destination .ref\themes\theme-name -Recurse

# For other projects, copy directly to .ref
Copy-Item -Path C:\path\to\local\project -Destination .ref\project-name -Recurse
```

**Note**: This creates a static copy - changes to the original won't be reflected. Usually Option A or B is better.

### Quick Decision Guide

- **Project you're actively developing alongside this one** → Use **Option B (Symlink)** - See live changes as you work
- **External project or repository you want to reference** → Use **Option A (Git Clone)** - Can check for updates with `git pull`

### Quick Workflow

1. **Decide which option** based on your use case (see above)
2. **Add to `.ref`** using the appropriate method:
   - **Plugins/Themes**: Use `plugins/` or `themes/` subfolders for organization
   - **Other projects**: Add directly to `.ref/` root
3. **Reference in your work** - AI agents can now access it via:
   - `.ref/plugins/plugin-name/` for plugins
   - `.ref/themes/theme-name/` for themes
   - `.ref/project-name/` for other projects
4. **Update as needed**:
   - **Option A (Git)**: `cd .ref/plugins/plugin-name && git pull` (or appropriate path)
   - **Option B (Symlink)**: Changes automatically visible - no action needed
   - **Option C (Copy)**: Re-copy if you need a fresh snapshot

### Notes

- Directory junctions (`mklink /J`) work on Windows and are preferred over symbolic links (`mklink /D`) for directories
- Junctions require administrator privileges or Developer Mode enabled in Windows 10/11
- The `.ref` folder should be added to `.gitignore` (see project `.gitignore`)

