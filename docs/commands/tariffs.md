# tariffs

List all tariffs and contracts associated with your account.

## Usage

```bash
magenta tariffs [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

## Examples

### Pretty Output

```bash
magenta tariffs
```

Output:
```
Internet L
────────────────────────────────────────
ID:          xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Label:       Internet L
Customer #:  1.12345678
Category:    Fixed Internet
Status:      Active
```

### JSON Output

```bash
magenta tariffs --json
```

```json
[
  {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "name": "Internet L",
    "label": "Internet L",
    "customerNumber": "1.12345678",
    "category": "FIXED_INTERNET",
    "status": "Active"
  }
]
```

## Categories

| Category | Description |
|----------|-------------|
| `FIXED_INTERNET` | Fixed line internet |
| `MOBILE` | Mobile phone contract |
