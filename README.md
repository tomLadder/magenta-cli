<h1 align="center">📡 magenta-cli</h1>

<p align="center">
  <strong>The unofficial command-line interface for Magenta Telekom Austria</strong>
</p>

<p align="center">
  Manage your Magenta account directly from the terminal. Built with TypeScript, powered by Bun.
</p>

<p align="center">
  <a href="https://tomladder.github.io/magenta-cli/">📖 Documentation</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#commands">Commands</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <a href="https://tomladder.github.io/magenta-cli/"><img src="https://img.shields.io/badge/docs-online-E20174.svg" alt="Documentation"></a>
  <img src="https://img.shields.io/badge/version-0.0.1-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/bun-%3E%3D1.0-black.svg" alt="Bun">
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey.svg" alt="Platform">
</p>

---

> [!CAUTION]
> **Legal Disclaimer / Rechtlicher Hinweis**
>
> This is an **unofficial** tool and is **not affiliated** with Magenta Telekom (T-Mobile Austria GmbH). Using this program may violate Magenta's terms of service. You are solely responsible for ensuring your use complies with applicable terms and laws. The developers accept no liability for any damages or legal consequences arising from its use. **Use at your own risk.**
>
> Dies ist ein **inoffizielles** Tool und steht in **keiner Verbindung** zu Magenta Telekom (T-Mobile Austria GmbH). Die Verwendung dieses Programms kann gegen die Nutzungsbedingungen von Magenta verstoßen. Sie sind selbst dafür verantwortlich, die Rechtmäßigkeit Ihrer Nutzung sicherzustellen. Die Entwickler übernehmen keine Haftung für Schäden oder rechtliche Konsequenzen. **Die Nutzung erfolgt auf eigenes Risiko.**

---

## Features

**Account Management**
- View customer information
- Check login status
- Secure password authentication with RSA encryption

**Invoice Management**
- List all invoices with status
- Download invoices as PDF
- View invoice details

**Tariff Information**
- View active tariffs and contracts
- See contract details and status

**Developer Experience**
- JSON output for scripting and AI agents
- Beautiful terminal UI with spinners
- Cross-platform compatibility

---

## Installation

### Quick Install (macOS / Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/tomLadder/magenta-cli/main/install.sh | sh
```

Pre-built binaries are also available on the [Releases page](https://github.com/tomLadder/magenta-cli/releases).

### From Source

**Prerequisites:** [Bun](https://bun.sh) v1.0 or higher

```bash
# Clone the repository
git clone https://github.com/tomLadder/magenta-cli.git
cd magenta-cli

# Install dependencies
bun install

# Build the standalone executable
bun run build

# Move to your PATH (optional)
mv dist/magenta /usr/local/bin/
```

### Development Mode

```bash
# Run directly without building
bun run dev -- --help
```

---

## Quick Start

### 1. Login to your account

```bash
magenta login
```

You'll be prompted for your email and password.

### 2. Check your identity

```bash
magenta whoami
```

### 3. List your tariffs

```bash
magenta tariffs
```

### 4. List your invoices

```bash
magenta invoices list
```

### 5. Download an invoice

```bash
magenta invoices download 123456789012
```

---

## Commands

### Quick Reference

| Command | Description |
|---------|-------------|
| `magenta login` | Authenticate with Magenta |
| `magenta logout` | Clear stored credentials |
| `magenta whoami` | Display current user info |
| `magenta status` | Check login status |
| `magenta tariffs` | List all tariffs/contracts |
| `magenta invoices list` | List all invoices |
| `magenta invoices get <id>` | Get invoice details |
| `magenta invoices download <id>` | Download invoice as PDF |
| `magenta config get` | Show all settings |
| `magenta config set <key> <value>` | Set a configuration value |
| `magenta config reset` | Reset to defaults |
| `magenta config path` | Show config file location |

### Global Options

These options are available on all commands:

| Option | Description |
|--------|-------------|
| `-h, --help` | Display help for the command |
| `-V, --version` | Display CLI version (root command only) |

```bash
# Show general help
magenta --help

# Show help for a specific command
magenta login --help
magenta invoices --help
magenta invoices download --help

# Show version
magenta --version
```

---

## Command Reference

### `magenta login`

Authenticate with your Magenta account using email and password.

```bash
magenta login [options]
```

| Option | Description |
|--------|-------------|
| `-u, --username <username>` | Username or email |
| `-p, --password <password>` | Password |
| `--json` | Output result as JSON |

**Examples:**

```bash
# Interactive login (prompts for credentials)
magenta login

# Provide username upfront
magenta login --username myuser@email.com

# Non-interactive login (for scripts/AI agents)
magenta login --username myuser@email.com --password mypassword --json
```

---

### `magenta logout`

Clear stored session and credentials.

```bash
magenta logout
```

No options available.

---

### `magenta whoami`

Display detailed information about the currently logged-in user.

```bash
magenta whoami [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

**Examples:**

```bash
# Pretty output
magenta whoami

# JSON output (for scripting)
magenta whoami --json
```

---

### `magenta status`

Check current login status and session information.

```bash
magenta status [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

**Examples:**

```bash
# Pretty output
magenta status

# JSON output
magenta status --json
```

---

### `magenta tariffs`

List all tariffs and contracts associated with your account.

```bash
magenta tariffs [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

**Examples:**

```bash
# Pretty output
magenta tariffs

# JSON output
magenta tariffs --json
```

---

### `magenta invoices list`

List all invoices.

```bash
magenta invoices list [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

**Examples:**

```bash
# List all invoices
magenta invoices list

# JSON output
magenta invoices list --json
```

---

### `magenta invoices get <id>`

Get detailed information about a specific invoice.

```bash
magenta invoices get <id> [options]
```

| Argument | Description |
|----------|-------------|
| `<id>` | Invoice ID or Bill Number (e.g., `123456789012` or `TMA.123456789012`) |

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

**Examples:**

```bash
# Get invoice details
magenta invoices get 123456789012

# Using full bill ID
magenta invoices get TMA.123456789012

# JSON output
magenta invoices get 123456789012 --json
```

---

### `magenta invoices download <id>`

Download an invoice as PDF.

```bash
magenta invoices download <id> [options]
```

| Argument | Description |
|----------|-------------|
| `<id>` | Invoice ID or Bill Number |

| Option | Description |
|--------|-------------|
| `-o, --output <path>` | Custom output file path |

**Examples:**

```bash
# Download invoice as PDF (default filename)
magenta invoices download 123456789012

# Custom output path
magenta invoices download 123456789012 --output ~/invoices/march-2026.pdf
magenta invoices download 123456789012 -o /path/to/invoice.pdf
```

---

### `magenta config get`

Display current CLI configuration.

```bash
magenta config get [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

**Examples:**

```bash
# Pretty output
magenta config get

# JSON output
magenta config get --json
```

---

### `magenta config set <key> <value>`

Set a configuration value.

```bash
magenta config set <key> <value>
```

| Argument | Description |
|----------|-------------|
| `<key>` | Configuration key (see available keys below) |
| `<value>` | Value to set |

**Available Keys:**

| Key | Values | Description |
|-----|--------|-------------|
| `outputFormat` | `pretty`, `json` | Default output format for all commands |

**Examples:**

```bash
# Set default output to JSON
magenta config set outputFormat json

# Set default output to pretty (human-readable)
magenta config set outputFormat pretty
```

---

### `magenta config reset`

Reset all configuration to default values. This clears settings but preserves authentication.

```bash
magenta config reset
```

No options available.

---

### `magenta config path`

Display the path to the configuration file.

```bash
magenta config path
```

No options available.

**Example output:**

```
/Users/username/.magenta/config.json
```

---

## Configuration

Configuration is stored in `~/.magenta/`:

| File | Description |
|------|-------------|
| `config.json` | Settings and session data |

### Available Settings

| Key | Values | Default | Description |
|-----|--------|---------|-------------|
| `outputFormat` | `pretty`, `json` | `pretty` | Default output format |

---

## Scripting & Automation

### JSON Output

All commands support `--json` for machine-readable output:

```bash
# Get user email
magenta whoami --json | jq '.username'

# Get latest invoice amount
magenta invoices list --json | jq '.[0].amountDue.amount'

# Calculate total invoices
magenta invoices list --json | jq '[.[].amountDue.amount] | add'
```

### Batch Operations

```bash
# Download all invoices
for id in $(magenta invoices list --json | jq -r '.[].billNo'); do
  magenta invoices download "$id"
done

# Export invoice summary to CSV
magenta invoices list --json | jq -r '.[] | [.billDate, .billNo, .amountDue.amount] | @csv'
```

---

## Architecture

```
src/
├── index.ts           # CLI entry point
├── api/
│   ├── client.ts      # HTTP client with session handling
│   ├── auth.ts        # Password authentication with RSA encryption
│   ├── profile.ts     # User profile
│   ├── dashboard.ts   # Dashboard/tariffs
│   └── invoices.ts    # Invoice operations
├── cli/
│   └── commands/      # Command implementations
├── store/
│   └── config.ts      # Configuration management
└── types/
    └── index.ts       # TypeScript interfaces
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## FAQ

<details>
<summary><strong>How does authentication work?</strong></summary>

Magenta uses password-based authentication:
1. You provide your email/username and password
2. The password is encrypted using RSA-OAEP with Magenta's public key
3. The session tokens are stored locally in `~/.magenta/config.json`
</details>

<details>
<summary><strong>How long does a session last?</strong></summary>

Access tokens expire after approximately 15 minutes, but refresh tokens last much longer (about 14 days). The CLI will show token expiration in `magenta status`.
</details>

<details>
<summary><strong>Where are my credentials stored?</strong></summary>

Your session tokens are stored in `~/.magenta/config.json` with secure file permissions (0600). Your password is never stored - only the session tokens.
</details>

<details>
<summary><strong>What's the difference between invoice ID formats?</strong></summary>

Magenta uses two formats:
- **Bill Number**: `123456789012` (just the number)
- **Bill ID**: `TMA.123456789012` (with prefix)

The CLI accepts both formats for convenience.
</details>

---

## Acknowledgments

- Built with [Bun](https://bun.sh) - The fast JavaScript runtime
- CLI powered by [Commander.js](https://github.com/tj/commander.js)
- Beautiful output with [Chalk](https://github.com/chalk/chalk) and [Ora](https://github.com/sindresorhus/ora)
- RSA encryption with [node-forge](https://github.com/digitalbazaar/forge)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <sub>Made with care in Austria</sub>
</p>
