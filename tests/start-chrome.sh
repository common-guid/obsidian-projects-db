#!/bin/bash
# Reference command to activate Chrome for remote debugging in this environment.
BASEDIR=$HOME/tools/chromium

# Start Chrome in the background
$BASEDIR/latest/chrome --user-data-dir="$BASEDIR/debug" --remote-debugging-port=9222 $* &> /dev/null &

echo "Chrome started on port 9222 for remote debugging."
