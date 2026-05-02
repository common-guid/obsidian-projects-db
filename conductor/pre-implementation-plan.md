# Pre-Implementation Plan: Environment & Build Setup

## Objective
Establish the foundational infrastructure for the Obsidian TaskDB plugin. This includes resolving NPM permission issues, scaffolding the source code and build pipeline, and configuring a headless testing environment with screenshot capabilities for visual verification.

## Background & Motivation
The project currently lacks the necessary source files (`src/`) and build configuration (`esbuild.config.mjs`). Furthermore, running `npm install` fails due to global permission restrictions (`EACCES` on `~/.npm`). Finally, to ensure quality and provide verification, we need a way to capture screenshots of the UI components within the sandboxed environment where no physical display (or `xvfb`) is available.

## Implementation Steps

### Phase 1: Environment & Build Pipeline
1. **Fix NPM Configuration:**
   - Create a `.npmrc` file in the project root to set a local cache and prefix (e.g., `prefix=./.npm-packages` and `cache=./.npm-cache`) to bypass the global `~/.npm` permission errors.
2. **Scaffold Source Code:**
   - Create `src/main.ts` as the entry point for the Obsidian plugin.
   - Create `src/types.ts` for foundational interfaces (Tasks, Subtasks).
3. **Restore Build Configuration:**
   - Create `esbuild.config.mjs` matching standard Obsidian plugin configurations (compiling `src/main.ts` to `main.js`).
4. **Install Dependencies:**
   - Re-run `npm install` to ensure all core dependencies are installed successfully.

### Phase 2: Headless Test Environment & Screenshots
*Note: Since the sandbox lacks `xvfb` to run the full Obsidian Electron app, we will test the React UI components headlessly using standard browser automation.*
1. **Install Testing Tools:**
   - Install `playwright` and `@vitest/browser` locally for component testing.
2. **Mock Obsidian Environment:**
   - Create a mocked version of the Obsidian API (`app.workspace`, `app.metadataCache`) necessary to render the database view.
3. **Setup Test Vault Data:**
   - Create a `tests/fixtures/test-vault` directory with sample markdown files to serve as test data.
4. **Implement Verification Script:**
   - Write a Vitest browser test (`tests/ui.test.tsx`) that mounts the React table component, populates it with the mocked vault data, and uses Playwright's screenshot API to save images to `/home/guid/.gemini/tmp/life-manager/verification/`.

## Verification & Testing
- **Build Success:** Running `npm run build` generates `main.js` and `manifest.json` without errors.
- **Test Success:** Running `npm run test` executes the UI tests, passes assertions, and successfully saves a `.png` screenshot to the verification directory.

## Alternatives Considered
- **Running Obsidian natively:** Attempting to install Xvfb or a virtual display in the sandbox to run the actual Obsidian binary. *Rejected* because it requires root permissions and introduces instability in standard CI/sandbox environments. Mocking the API and testing the React views via Playwright is standard practice for Obsidian plugin UI testing.