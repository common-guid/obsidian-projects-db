# Project
The objective of this project is to develop an obsidian plugin that operates as a configurable task manager and project manager.

# Rules
1. Be sure to ask the user any clarifying questions you have about the next step or phase in the IMPLEMENTATION plan. If you have no questions then proceed with the next section of the plan.
2. the PROGRESS.md file records the project's progression. The file must be consulted upon any of the following events:
	1. Upon beginning a new session always begin by checking the PROGRESS.md file
	2. Prior to starting a new session, working on a feature request, or implementing a bug fix.
```markdown
# Project Progress

## Phase 1 <title> | <date>
<phase summary>
<tasks completed>

### Next Steps & Continuity

## Phase 2 <title> | <date>
...

## Outstanding
<running list of any items that were deferred or skipped during phase execution. cross out or strikethrough items when completed>
```
3. review the LOG_BOOK.md file this file will be used to log each of the tasks that the agent (you) have completed. For each feature or fix you complete append a new section to the LOG_BOOK.md file in the following format:
```markdown
## name of feature or fix | date of completion
1 or 2 sentence description of the feature or fix.
```
4. **Completion Criteria:**
    Upon completing each feature or fix assigned to you you must: 
    - append an entry to the PROGRESS.md file with a summary of the actions taken and accomplishments, as well as including your intended next steps for continuity between sessions.
    - append an entry to the LOG_BOOK.md file with a description of the task.
5. Developer Documentation is located in the dev-docs directory
6. Obsidian uses `npm` to build the plugin