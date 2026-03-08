# Commands

## Quick Reference

| Command | Description |
|---------|-------------|
| [`login`](/commands/login) | Authenticate with Magenta |
| [`logout`](/commands/logout) | Clear stored credentials |
| [`whoami`](/commands/whoami) | Display current user info |
| [`status`](/commands/status) | Check login status |
| [`tariffs`](/commands/tariffs) | List all tariffs/contracts |
| [`invoices list`](/commands/invoices#list) | List all invoices |
| [`invoices get`](/commands/invoices#get) | Get invoice details |
| [`invoices download`](/commands/invoices#download) | Download invoice as PDF |
| [`config`](/commands/config) | Manage CLI configuration |

## Global Options

These options are available on all commands:

| Option | Description |
|--------|-------------|
| `-h, --help` | Display help for the command |
| `-V, --version` | Display CLI version (root command only) |

## JSON Output

All commands support `--json` for machine-readable output:

```bash
magenta whoami --json
magenta invoices list --json
magenta tariffs --json
```
