# Getting Started

magenta-cli is an unofficial command-line interface for managing your Magenta Telekom Austria account.

## Quick Start

### 1. Install

```bash
# Clone and build
git clone https://github.com/tomLadder/magenta-cli.git
cd magenta-cli
bun install
bun run build

# Move to PATH
mv dist/magenta /usr/local/bin/
```

### 2. Login

```bash
magenta login
```

You'll be prompted for your email and password.

### 3. Explore

```bash
# View your profile
magenta whoami

# List your tariffs
magenta tariffs

# List invoices
magenta invoices list

# Download an invoice
magenta invoices download 123456789012
```

## What's Next?

- [Installation](/guide/installation) - Detailed installation instructions
- [Configuration](/guide/configuration) - Configure the CLI
- [Commands](/commands/) - Full command reference
