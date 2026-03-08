# login

Authenticate with your Magenta account.

## Usage

```bash
magenta login [options]
```

## Options

| Option | Description |
|--------|-------------|
| `-u, --username <username>` | Username or email |
| `-p, --password <password>` | Password |
| `--json` | Output result as JSON |

## Examples

### Interactive Login

```bash
magenta login
```

You'll be prompted for your email and password.

### Provide Username

```bash
magenta login --username user@example.com
```

### Non-Interactive Login

For scripts and automation:

```bash
magenta login --username user@example.com --password mypassword --json
```

## Output

### Success

```json
{
  "success": true,
  "user": {
    "loggedIn": true,
    "username": "user@example.com"
  }
}
```

### Error

```json
{
  "success": false,
  "error": "Login failed: Invalid credentials"
}
```

## Notes

- Your password is encrypted with RSA before being sent
- Your password is never stored locally
- Session tokens expire after ~15 minutes
