# magenta-cli for LLMs

This guide helps AI assistants use magenta-cli effectively.

## Overview

magenta-cli is a command-line tool for interacting with Magenta Telekom Austria (formerly T-Mobile Austria). It allows users to manage their account.

## Authentication

Magenta uses username/password authentication:

1. User provides their username/email and password
2. Session is stored locally in `~/.magenta/config.json`

### Interactive Login

```bash
magenta login
magenta login --username myuser@email.com
```

### Non-Interactive Login (for AI Agents)

Use the `--json` flag for machine-readable output:

```bash
magenta login --username myuser@email.com --password mypassword --json
```

Response:
```json
{
  "success": true,
  "user": {
    "loggedIn": true,
    "username": "myuser@email.com"
  }
}
```

Error response:
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

## Common Tasks

### Check Login Status

```bash
magenta status
# or
magenta whoami
```

## JSON Output

All commands support `--json` flag for machine-readable output:

```bash
magenta whoami --json
magenta status --json
```

## Error Handling

### Not Logged In

If a command fails with "Not logged in", run:

```bash
magenta login
```

### Session Expired

Sessions may expire. Re-authenticate with:

```bash
magenta login
```

## Configuration

Config stored at: `~/.magenta/config.json`

```bash
# View config
magenta config get

# Set default output format
magenta config set outputFormat json

# Reset to defaults
magenta config reset
```

## Tips for AI Assistants

1. Always check login status before running authenticated commands
2. Use `--json` flag when parsing output programmatically
3. Session may expire - handle "Not logged in" errors gracefully
