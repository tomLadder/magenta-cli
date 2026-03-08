# whoami

Display detailed information about the currently logged-in user.

## Usage

```bash
magenta whoami [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

## Examples

### Pretty Output

```bash
magenta whoami
```

Output:
```
User Information
────────────────────────────────────────
Name:       John Doe
Username:   user@example.com
Email:      user@example.com
Phone:      +43 699XXXXXXXX
Birth Date: 1990-01-01
Profile ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### JSON Output

```bash
magenta whoami --json
```

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-01",
  "username": "user@example.com",
  "contactPhoneNo": "43699XXXXXXXX",
  "contactEmailAddress": "user@example.com"
}
```
