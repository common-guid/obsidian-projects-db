#!/bin/bash
# launch-gemini.sh: Launch Gemini CLI with the custom Obsidian sandbox configured

# 1. Set the Sandbox Type to Docker
export GEMINI_SANDBOX="docker"

# 2. Set the Custom Image Name
# Ensure you have built the image first: docker build -t obsidian-sandbox -f .gemini/sandbox.Dockerfile .
export GEMINI_SANDBOX_IMAGE="obsidian-sandbox"

# 3. Optional: X11 Forwarding (Linux Hosts Only)
# Uncomment the line below if you want GUI windows to appear on your physical monitor
# export SANDBOX_FLAGS="-e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix"

# 4. Launch Gemini CLI
# Any arguments passed to this script (e.g., ./launch-gemini.sh "refactor main.ts") 
# will be passed directly to the gemini command.
echo "Starting Gemini CLI in custom sandbox: $GEMINI_SANDBOX_IMAGE..."
gemini "$@"
