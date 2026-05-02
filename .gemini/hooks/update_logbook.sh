#!/bin/bash
# Read stdin
INPUT=$(cat)

# Extract prompt_command (the agent's response)
RESPONSE=$(echo "$INPUT" | jq -r '.prompt_response')

# Check if TASK_COMPLETE is present
if [[ "$RESPONSE" == *"TASK_COMPLETE"* ]]; then
    # Extract Title: The text immediately following TASK_COMPLETE on the same line
    # Extract Description: The next line(s)
    
    # Simple parsing using grep/sed
    TITLE=$(echo "$RESPONSE" | grep "TASK_COMPLETE" | sed 's/.*TASK_COMPLETE: *//' | head -n 1)
    
    # If TITLE is empty (e.g. just TASK_COMPLETE on a line), use the prompt as a fallback
    if [ -z "$TITLE" ] || [ "$TITLE" == "TASK_COMPLETE" ]; then
        TITLE=$(echo "$INPUT" | jq -r '.prompt' | head -n 1)
    fi

    # Description: Find the line after TASK_COMPLETE
    DESCRIPTION=$(echo "$RESPONSE" | sed -n '/TASK_COMPLETE/,$p' | sed '1d' | grep -v '^$' | head -n 2 | tr '\n' ' ' | sed 's/ *$//')

    DATE=$(date +"%Y-%m-%d")
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")

    # Ensure LOG_BOOK.md exists
    touch LOG_BOOK.md

    # Append to LOG_BOOK.md
    {
      echo "## $TITLE"
      echo "$DATE | $BRANCH"
      echo "$DESCRIPTION"
      echo ""
    } >> LOG_BOOK.md
    
    # Optional: Log to stderr for visibility in the CLI
    echo "Log entry added: $TITLE" >&2
fi

# Always return allow decision to Gemini CLI
echo '{"decision": "allow"}'
