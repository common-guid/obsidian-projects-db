#!/bin/bash
# Reference command to activate Chrome for remote debugging in this environment.
BASEDIR=$HOME/tools/chromium

# Force software rendering to avoid GPU-related crashes in headless environments
export GALLIUM_DRIVER=llvmpipe

# Start Chrome in the background with safe headless flags
$BASEDIR/latest/chrome \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --remote-debugging-port=9222 \
  --user-data-dir="$BASEDIR/debug" \
  --disable-dev-shm-usage \
  --window-size=1280,800 \
  $* &> /dev/null &

# Wait for the DevTools endpoint to become ready
MAX_ATTEMPTS=30
COUNT=0
until curl -s http://127.0.0.1:9222/json/version > /dev/null || [ $COUNT -eq $MAX_ATTEMPTS ]; do
  sleep 0.5
  let COUNT=COUNT+1
done

if [ $COUNT -eq $MAX_ATTEMPTS ]; then
  echo "Error: Chrome failed to start or port 9222 is not responding."
  exit 1
fi

echo "Chrome started successfully on port 9222 with GALLIUM_DRIVER=llvmpipe."
