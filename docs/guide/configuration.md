# Configuration

Configuration is stored in `~/.magenta/config.json`.

## Settings

| Key | Values | Default | Description |
|-----|--------|---------|-------------|
| `outputFormat` | `pretty`, `json` | `pretty` | Default output format |

## Commands

### View Configuration

```bash
magenta config get
```

### Set a Value

```bash
# Set default output to JSON
magenta config set outputFormat json

# Set default output to pretty
magenta config set outputFormat pretty
```

### Reset to Defaults

```bash
magenta config reset
```

### Show Config File Path

```bash
magenta config path
# Output: /Users/username/.magenta/config.json
```

## File Structure

```json
{
  "auth": {
    "accessToken": "...",
    "refreshToken": "...",
    "accessExpiresAt": 1234567890,
    "refreshExpiresAt": 1234567890,
    "deviceId": "...",
    "username": "user@example.com"
  },
  "deviceId": "...",
  "settings": {
    "outputFormat": "pretty"
  }
}
```

::: warning
The config file contains sensitive session tokens. It's created with secure permissions (0600) and should not be shared.
:::
