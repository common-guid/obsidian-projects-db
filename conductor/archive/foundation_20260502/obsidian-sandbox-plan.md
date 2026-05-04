# Research Report & Implementation Plan: Custom Obsidian Sandbox

## 1. Research Findings

### Obsidian v1.12.7 Requirements
Obsidian is built on the Electron framework. Version 1.12.7 specifically uses Electron v39.8.3. To run this in a containerized environment (Docker), the following are required:

- **System Libraries:** Approximately 25-30 shared libraries covering GTK3, X11, NSS, ALSA, and Mesa.
- **Display Server:** A virtual framebuffer (`Xvfb`) is needed since the sandbox environment typically lacks a physical GPU or monitor.
- **Sandbox Configuration:** Electron's internal SUID sandbox often fails in Docker without `--privileged` mode. The standard workaround is to launch with the `--no-sandbox` flag.
- **New Features:** v1.12.7 introduces a dedicated `obsidian-cli` binary which can be used for faster metadata operations, but the full GUI is still required for visual verification.

### Screenshot & Validation Strategy
To achieve repeatable visual verification, we will use a combination of:
1. **Xvfb:** Provides the virtual screen at a fixed resolution (e.g., 1280x800).
2. **Scrot/Maim:** Command-line tools to capture the `DISPLAY` state to a `.png` file.
3. **Wait-for-UI Logic:** Using `wmctrl` or `xdotool` to ensure the Obsidian window has actually rendered before taking the screenshot.

---

## 2. Implementation Plan

### Phase 1: Sandbox Image Definition
Create a custom Dockerfile (`.gemini/sandbox.Dockerfile`) that scaffolds the complete environment.

**Proposed `.gemini/sandbox.Dockerfile`:**
```dockerfile
FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install core utilities and dependencies for Obsidian/Electron
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    ca-certificates \
    gnupg \
    libnss3 \
    libgbm1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxext6 \
    libxfixes3 \
    libxss1 \
    libxtst6 \
    libgtk-3-0 \
    libgl1-mesa-glx \
    libgl1-mesa-dri \
    xvfb \
    scrot \
    wmctrl \
    xdotool \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Download and install Obsidian 1.12.7
RUN wget https://github.com/obsidianmd/obsidian-releases/releases/download/v1.12.7/obsidian_1.12.7_amd64.deb \
    && apt-get update \
    && apt-get install -y ./obsidian_1.12.7_amd64.deb \
    && rm obsidian_1.12.7_amd64.deb

# Set up work directory
WORKDIR /home/guid/projects/obsidian_dev/life_manager

# Set environment variables for display
ENV DISPLAY=:99

# Default command
CMD ["bash"]
```

**Key Components of Dockerfile:**
- **Base:** `ubuntu:22.04` (Stable and well-documented for GUI apps).
- **Tooling:** Node.js (v22+), npm, git, wget, curl.
- **GUI Stack:** `xvfb`, `libgtk-3-0`, `libnss3`, `libasound2`, `libgbm1`, `libxss1`, `scrot`, `wmctrl`.
- **Obsidian Setup:** Download and install the `.deb` package for automated dependency resolution.

### Phase 2: Automation Scripts
Develop a suite of scripts in `scripts/sandbox/` to manage the GUI lifecycle.

1.  **`start-display.sh`**: Initializes Xvfb on `:99`.
2.  **`capture-obsidian.sh`**:
    - Launches Obsidian pointing to the `tests/fixtures/test-vault`.
    - Waits for the "TaskDB" view to become visible.
    - Takes a screenshot and saves it to `/home/guid/.gemini/tmp/life-manager/verification/`.
    - Logs the process to `LOG_BOOK.md`.

### Phase 3: Gemini CLI Integration
Expose the new sandbox to the agent loop.

---

## 3. Custom Sandbox Instructions

To enable the custom Obsidian sandbox, follow these steps:

### Step 1: Build the Image
Run the following command from the project root:
```bash
docker build -t obsidian-sandbox -f .gemini/sandbox.Dockerfile .
```

### Step 2: Configure Gemini CLI
Add or update the following environment variables in your local session or `.env` file:
```bash
export GEMINI_SANDBOX=docker
export GEMINI_SANDBOX_IMAGE=obsidian-sandbox
# Optional: If you want to see the GUI on your host (Linux only)
# export SANDBOX_FLAGS="-e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix"
```

Alternatively, update `.gemini/settings.json`:
```json
{
  "tools": {
    "sandbox": "docker"
  }
}
```

### Step 3: Usage
Once configured, every `run_shell_command` will execute inside the new container. You can then run:
```bash
./scripts/sandbox/capture-obsidian.sh
```
This will generate a high-fidelity screenshot for your verification.

---

## 4. Next Steps
1. [ ] Create `.gemini/sandbox.Dockerfile`.
2. [ ] Implement `scripts/sandbox/capture-obsidian.sh`.
3. [ ] Verify the build by generating the first screenshot of the empty Obsidian interface.
