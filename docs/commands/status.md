# status

Check current login status and session information.

## Usage

```bash
magenta status [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

## Examples

### Pretty Output

```bash
magenta status
```

Output when logged in:
```
Logged in as: user@example.com
Token expires in: 12 minutes
```

Output when not logged in:
```
Not logged in
```

### JSON Output

```bash
magenta status --json
```

```json
{
  "loggedIn": true,
  "username": "user@example.com",
  "tokenExpiresAt": "2026-03-08T15:30:00.000Z"
}
```

## Notes

- Access tokens expire after ~15 minutes
- If expired, run `magenta login` to re-authenticate
