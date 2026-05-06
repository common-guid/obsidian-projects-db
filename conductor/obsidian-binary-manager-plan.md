# Obsidian Binary Manager Implementation Plan

## Objective
Replace the static, repo-bloating Obsidian binary with a dynamic dependency manager. The solution will download, extract, and cache specific versions of the Obsidian AppImage on demand, ensuring fast local runs while keeping the Git repository clean.

## Key Files & Context
- `project_board/.gitignore`: Needs updating to ignore binary caches.
- `project_board/scripts/sandbox/manage-obsidian.sh`: **(New File)** The script responsible for downloading and extracting the binary.
- `project_board/scripts/sandbox/capture-obsidian.sh`: Needs updating to use the new manager script before launching the tests.
- `project_board/.obsidian-bin/`: The directory currently holding the static binary, which will become our local cache.

## Implementation Steps

### 1. Update Gitignore & Clean Up
- Add `.obsidian-bin/` to `project_board/.gitignore` to ensure the downloaded AppImages and extracted files are never committed.
- Remove the existing `.obsidian-bin/` directory from Git tracking if it was previously committed (`git rm -r --cached .obsidian-bin/`).

### 2. Create the Dependency Manager Script (`manage-obsidian.sh`)
- Write a bash script that accepts a target Obsidian version (defaulting to a known stable version like `1.5.12`).
- The script will check if `.obsidian-bin/squashfs-root-$VERSION` already exists.
- If it doesn't exist, the script will:
  - Download the AppImage from the official `obsidianmd/obsidian-releases` GitHub repository.
  - Make the AppImage executable.
  - Extract it using `./Obsidian.AppImage --appimage-extract` into a version-specific folder (e.g., `squashfs-root-$VERSION`).
  - Create a generic symlink (`.obsidian-bin/squashfs-root` -> `.obsidian-bin/squashfs-root-$VERSION`) so other scripts have a predictable path.

### 3. Update the Capture Script (`capture-obsidian.sh`)
- Modify `capture-obsidian.sh` to execute `manage-obsidian.sh` before attempting to launch Obsidian.
- Update the launch command to explicitly point to the extracted executable (e.g., `../.obsidian-bin/squashfs-root/AppRun` or `../.obsidian-bin/squashfs-root/obsidian`) instead of relying on a global `obsidian` command in the `PATH`.

## Verification & Testing
- Delete the local `.obsidian-bin/` folder manually.
- Run `capture-obsidian.sh`.
- **Expected Result:** The script should pause to download and extract the AppImage, successfully launch Obsidian, capture the screenshot, and exit cleanly.
- Run `capture-obsidian.sh` a second time.
- **Expected Result:** The script should immediately launch Obsidian using the cached binary without attempting to download it again.
- Verify `git status` shows a clean working tree (the new `.obsidian-bin` files are ignored).