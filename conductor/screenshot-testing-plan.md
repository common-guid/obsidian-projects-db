# Plan: Robust Screenshot Verification Suite

## Objective
Enhance the headless screenshot testing suite (`capture-obsidian.sh`) to automatically load the locally built TaskDB plugin and capture its active interface (the React-based interactive database view), rather than just the blank Obsidian startup screen.

## Strategy
To achieve this, we need to bridge the gap between our source code and the Obsidian binary running in the test vault. This involves compiling the plugin, injecting it into the test vault, disabling Obsidian's Safe Mode, and using UI automation to open the plugin's view before taking the picture.

## Implementation Steps

### 1. Test Vault Configuration (One-Time Setup)
To allow the plugin to load without manual intervention, the test vault's configuration needs to be pre-seeded:
- **Disable Safe Mode:** Create `tests/fixtures/test-vault/.obsidian/app.json` and set `"restrictedMode": false`.
- **Enable Plugin:** Create `tests/fixtures/test-vault/.obsidian/community-plugins.json` and add `["obsidian-taskdb"]` to the array.

### 2. Automate Plugin Injection
Update `scripts/sandbox/capture-obsidian.sh` to inject the latest plugin code before launching Obsidian:
- Run the build process (e.g., `npm run build` or the `esbuild` script) to ensure the latest changes are compiled.
- Create the plugin directory: `mkdir -p "$VAULT_PATH/.obsidian/plugins/obsidian-taskdb"`.
- Copy the built assets (`main.js`, `manifest.json`, and `styles.css` if it exists) into this directory.

### 3. UI Automation via `xdotool`
Instead of attempting to reverse-engineer Obsidian's complex `workspace.json` to have the view open on startup, we will simulate user interaction. This serves as an end-to-end functional test of the plugin's command palette registration.
- After the script detects the Obsidian window via `wmctrl`, introduce `xdotool` to send keystrokes to the headless display:
  - `xdotool key ctrl+p` (Opens the command palette)
  - `sleep 1`
  - `xdotool type "TaskDB: Open TaskDB"`
  - `sleep 1`
  - `xdotool key Return` (Activates the view)
- *Note:* We will need to ensure `xdotool` is added to `.gemini/sandbox.Dockerfile` if it is not already installed.

### 4. Rendering Wait and Capture
- Add a strategic `sleep` (e.g., 3-5 seconds) after the `xdotool` commands to allow the React `Root` to mount and the TanStack Table to render the vault data.
- Proceed with the existing `scrot` capture mechanism.

## Alternatives Considered
- **Obsidian URI Handler:** Registering a custom URI (e.g., `obsidian://taskdb/open`) in the plugin and calling it via the command line. *Rejected* as it adds unnecessary plugin code solely for testing purposes, whereas `xdotool` tests existing user-facing functionality.
- **Pre-configured `workspace.json`:** Manually setting up a workspace layout where the plugin is already open. *Rejected* because `workspace.json` is highly dynamic and prone to breaking across Obsidian version updates; keyboard automation is more robust.
