<h1 align="center">📡 magenta-cli</h1>

<p align="center">
  <strong>The unofficial command-line interface for Magenta Telekom Austria</strong>
</p>

<p align="center">
  Manage your Magenta account directly from the terminal. Built with TypeScript, powered by Bun.
</p>

<p align="center">
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
- Secure authentication

**Developer Experience**
- JSON output for scripting and AI agents
- Beautiful terminal UI with spinners
- Cross-platform compatibility

---

## Installation

### Prerequisites

- [Bun](https://bun.sh) v1.0 or higher

### From Source

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

### 2. Check your identity

```bash
magenta whoami
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

---

## Command Reference

### `magenta login`

Authenticate with your Magenta account.

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

# Non-interactive login (for scripts)
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

Display information about the currently logged-in user.

```bash
magenta whoami [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

---

### `magenta status`

Check current login status.

```bash
magenta status [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

---

### `magenta config get`

Display current CLI configuration.

```bash
magenta config get [options]
```

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

---

### `magenta config set <key> <value>`

Set a configuration value.

```bash
magenta config set <key> <value>
```

**Available Keys:**

| Key | Values | Description |
|-----|--------|-------------|
| `outputFormat` | `pretty`, `json` | Default output format for all commands |

---

### `magenta config reset`

Reset all configuration to default values.

```bash
magenta config reset
```

---

### `magenta config path`

Display the path to the configuration file.

```bash
magenta config path
```

---

## Configuration

Configuration is stored in `~/.magenta/`:

| File | Description |
|------|-------------|
| `config.json` | Settings and session data |

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <sub>Made with care in Austria</sub>
</p>
