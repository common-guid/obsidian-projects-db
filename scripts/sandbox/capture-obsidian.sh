#!/bin/bash
# capture-obsidian.sh: Launch Obsidian and capture a screenshot for verification

VAULT_PATH="/home/guid/projects/obsidian_dev/life_manager/tests/fixtures/test-vault"
SCREENSHOT_DIR="/home/guid/.gemini/tmp/life-manager/verification"
SCREENSHOT_PATH="$SCREENSHOT_DIR/obsidian-capture-$(date +%Y%m%d-%H%M%S).png"
LOG_BOOK="/home/guid/projects/obsidian_dev/life_manager/LOG_BOOK.md"

# Use a writable directory for Obsidian's configuration
export HOME=/tmp/obsidian-home
export XDG_CONFIG_HOME=/tmp/obsidian-home/.config
mkdir -p "$XDG_CONFIG_HOME"
mkdir -p "$SCREENSHOT_DIR"

echo "Launching Obsidian (headless)..."
# Start Obsidian with --no-sandbox and --disable-gpu
obsidian --no-sandbox --disable-gpu "$VAULT_PATH" &
OBSIDIAN_PID=$!

echo "Waiting for Obsidian window to appear..."
# Wait up to 30 seconds for the window to be managed by the window manager
# Fallback to checking if the process is still running if wmctrl fails
MAX_WAIT=30
WAIT_COUNT=0
WINDOW_DETECTED=false

while [ $WAIT_COUNT -lt $MAX_WAIT ]; do
    if wmctrl -l | grep -i "Obsidian" > /dev/null; then
        echo "Obsidian window detected via wmctrl."
        WINDOW_DETECTED=true
        break
    fi
    # Check if the process died early
    if ! kill -0 $OBSIDIAN_PID 2>/dev/null; then
        echo "Error: Obsidian process died prematurely."
        exit 1
    fi
    sleep 1
    let WAIT_COUNT=WAIT_COUNT+1
done

if [ "$WINDOW_DETECTED" = false ]; then
    echo "Warning: Obsidian window not detected via wmctrl, but process is running."
    echo "Attempting capture anyway after extra wait..."
    sleep 10
fi

# Give it a few more seconds to finish rendering the content
echo "Waiting for rendering to complete..."
sleep 5

echo "Capturing screenshot to $SCREENSHOT_PATH..."
scrot -z "$SCREENSHOT_PATH"

echo "Updating LOG_BOOK.md..."
echo -e "\n## Visual Verification | $(date +%Y-%m-%d)\nScreenshot captured: \`$SCREENSHOT_PATH\`\n" >> "$LOG_BOOK"

echo "Cleaning up..."
kill $OBSIDIAN_PID

echo "Verification complete."
