---
name: AI tool assignments
description: AI 2 is OpenAI Codex. AI 1 is Claude Code by default but may change. Plans must be tool-agnostic.
type: project
---

**AI 2:** OpenAI Codex. Uses `.codex/config.toml` for MCP servers (project-scoped).
**AI 1:** Claude Code by default, but may change in future sessions. Uses `.mcp.json` for MCP servers.

**Why:** Founder confirmed on 2026-04-18. Both config files are already present in the repo.

**How to apply:**
- Plans handed to AI 2 must not rely on Claude Code-specific features (`/mcp`, Context7 MCP tool calls via Claude Code UI)
- Replace Context7 MCP tool call instructions with: "use your tool's context7 MCP server or read official docs at [URL]"
- Replace `/mcp` verification with: "confirm MCP servers are connected in your tool before starting"
- All file paths, bash commands, schemas, and dependency names are tool-agnostic — those stand unchanged
- If AI 1 changes tools, they should check `.mcp.json` still applies or add a new config file for their tool
