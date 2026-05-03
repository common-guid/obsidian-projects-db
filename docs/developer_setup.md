# Developer Setup Guide: Obsidian Sandbox Environment

This guide provides instructions for setting up the custom Docker-based sandbox environment required for developing and testing the Obsidian TaskDB plugin. This environment supports the Obsidian GUI, headless rendering via Xvfb, and automated screenshot capture.

## Prerequisites

- Docker installed on your host machine.
- Gemini CLI installed and configured.

---

## Phase 1: Sandbox Image Definition

The sandbox image is defined in `.gemini/sandbox.Dockerfile`. It contains all the necessary Electron dependencies, X11 utilities, and Obsidian v1.12.7.

### Build the Image

Run the following command from the project root:

```bash
docker build -t obsidian-sandbox -f .gemini/sandbox.Dockerfile .
```

### Dockerfile Content

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

---

## Phase 2: Automation Scripts

Two scripts are provided in `scripts/sandbox/` to manage the GUI lifecycle within the container.

### 1. `scripts/sandbox/start-display.sh`

Initializes the virtual framebuffer.

```bash
#!/bin/bash
# start-display.sh: Initialize Xvfb for headless GUI testing

echo "Starting Xvfb on DISPLAY :99..."
Xvfb :99 -screen 0 1280x800x24 &
XVFB_PID=$!

# Wait for Xvfb to be ready
timeout 10 bash -c 'until xset -q &>/dev/null; do sleep 0.5; done'

if [ $? -eq 0 ]; then
    echo "Xvfb started successfully (PID: $XVFB_PID)"
else
    echo "Error: Xvfb failed to start within 10 seconds"
    exit 1
fi
```

### 2. `scripts/sandbox/capture-obsidian.sh`

Launches Obsidian, waits for the UI, and captures a screenshot.

```bash
#!/bin/bash
# capture-obsidian.sh: Launch Obsidian and capture a screenshot for verification

VAULT_PATH="/home/guid/projects/obsidian_dev/life_manager/tests/fixtures/test-vault"
SCREENSHOT_DIR="/home/guid/.gemini/tmp/life-manager/verification"
SCREENSHOT_PATH="$SCREENSHOT_DIR/obsidian-capture-$(date +%Y%m%d-%H%M%S).png"
LOG_BOOK="/home/guid/projects/obsidian_dev/life_manager/LOG_BOOK.md"

mkdir -p "$SCREENSHOT_DIR"

echo "Launching Obsidian (headless)..."
# Start Obsidian with --no-sandbox because we are in a container
obsidian --no-sandbox "$VAULT_PATH" &
OBSIDIAN_PID=$!

echo "Waiting for Obsidian window to appear..."
# Wait up to 30 seconds for the window to be managed by the window manager
MAX_WAIT=30
WAIT_COUNT=0
while [ $WAIT_COUNT -lt $MAX_WAIT ]; do
    if wmctrl -l | grep -i "Obsidian" > /dev/null; then
        echo "Obsidian window detected."
        break
    fi
    sleep 1
    let WAIT_COUNT=WAIT_COUNT+1
done

if [ $WAIT_COUNT -eq $MAX_WAIT ]; then
    echo "Error: Obsidian window did not appear within $MAX_WAIT seconds."
    kill $OBSIDIAN_PID
    exit 1
fi

# Give it a few more seconds to finish rendering the content
echo "Waiting for rendering to complete..."
sleep 5

echo "Capturing screenshot to $SCREENSHOT_PATH..."
scrot "$SCREENSHOT_PATH"

echo "Updating LOG_BOOK.md..."
echo -e "\n## Visual Verification | $(date +%Y-%m-%d)\nScreenshot captured: \`$SCREENSHOT_PATH\`\n" >> "$LOG_BOOK"

echo "Cleaning up..."
kill $OBSIDIAN_PID

echo "Verification complete."
```

---

## Phase 3: Gemini CLI Integration

To use the custom sandbox for development:

1.  **Set Environment Variables:**
    ```bash
    export GEMINI_SANDBOX=docker
    export GEMINI_SANDBOX_IMAGE=obsidian-sandbox
    ```

2.  **Optional: X11 Forwarding (Host Display):**
    If you are on a Linux host and want to see the GUI windows on your physical screen:
    ```bash
    export SANDBOX_FLAGS="-e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix"
    ```

3.  **Run Verification:**
    Once the environment is set, execute the capture script via Gemini CLI to verify the setup:
    ```bash
    ./scripts/sandbox/start-display.sh
    ./scripts/sandbox/capture-obsidian.sh
    ```

Check the `verification/` folder in your project temp directory for the generated `.png` files.
