# config

Manage CLI configuration.

## Commands

- [`config get`](#get) - Show all settings
- [`config set`](#set) - Set a configuration value
- [`config reset`](#reset) - Reset to defaults
- [`config path`](#path) - Show config file location

---

## get

Display current CLI configuration.

### Usage

```bash
magenta config get [options]
```

### Options

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

### Example

```bash
magenta config get
```

Output:
```
Configuration
────────────────────────────────────────
Output format: pretty
Logged in:     Yes
Username:      user@example.com

Config file:   /Users/username/.magenta/config.json
```

---

## set

Set a configuration value.

### Usage

```bash
magenta config set <key> <value>
```

### Arguments

| Argument | Description |
|----------|-------------|
| `<key>` | Configuration key |
| `<value>` | Value to set |

### Available Keys

| Key | Values | Description |
|-----|--------|-------------|
| `outputFormat` | `pretty`, `json` | Default output format |

### Examples

```bash
# Set default output to JSON
magenta config set outputFormat json

# Set default output to pretty
magenta config set outputFormat pretty
```

---

## reset

Reset all configuration to default values.

### Usage

```bash
magenta config reset
```

::: warning
This clears your settings but preserves authentication.
:::

---

## path

Display the path to the configuration file.

### Usage

```bash
magenta config path
```

### Example

```bash
magenta config path
# Output: /Users/username/.magenta/config.json
```
