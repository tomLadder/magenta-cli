# magenta-cli for LLMs

This guide helps AI assistants use magenta-cli effectively.

## Overview

magenta-cli is a command-line tool for interacting with Magenta Telekom Austria. It allows users to manage their account, view invoices, and download bills.

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/tomLadder/magenta-cli/main/install.sh | sh
```

Pre-built binaries are also available on the [Releases page](https://github.com/tomLadder/magenta-cli/releases).

## Authentication

Magenta uses password-based authentication with RSA encryption:

1. User provides their email/username and password
2. Password is encrypted with RSA-OAEP using Magenta's public key
3. Session tokens are stored locally in `~/.magenta/config.json`

### Interactive Login

```bash
magenta login
magenta login --username user@example.com
```

### Non-Interactive Login (for AI Agents)

Use the `--json` flag for machine-readable output:

```bash
magenta login --username user@example.com --password mypassword --json
```

Response:
```json
{
  "success": true,
  "user": {
    "loggedIn": true,
    "username": "user@example.com"
  }
}
```

Error response:
```json
{
  "success": false,
  "error": "Login failed: Invalid credentials"
}
```

## Common Tasks

### Check Login Status

```bash
magenta status
# or
magenta whoami
```

### List Invoices

```bash
# All invoices
magenta invoices list

# As JSON for parsing
magenta invoices list --json
```

### Download Invoice

```bash
# Download as PDF
magenta invoices download <bill-number>

# Custom output path
magenta invoices download <bill-number> --output /path/to/invoice.pdf
```

### View Tariffs

```bash
magenta tariffs
magenta tariffs --json
```

## JSON Output

All commands support `--json` flag for machine-readable output:

```bash
magenta whoami --json
magenta invoices list --json
magenta tariffs --json
```

## Error Handling

### Not Logged In

If a command fails with "Not logged in", run:

```bash
magenta login
```

### Session Expired

Access tokens expire after ~15 minutes. Re-authenticate with:

```bash
magenta login
```

## Scripting Tips

### Get User Email

```bash
magenta whoami --json | jq -r '.username'
```

### Get Latest Invoice Amount

```bash
magenta invoices list --json | jq -r '.[0].amountDue.amount'
```

### Calculate Total Invoices

```bash
magenta invoices list --json | jq '[.[].amountDue.amount] | add'
```

### Download All Invoices

```bash
for id in $(magenta invoices list --json | jq -r '.[].billNo'); do
  magenta invoices download "$id"
done
```

## Configuration

Config stored at: `~/.magenta/config.json`

```bash
# View config
magenta config get

# Set default output format
magenta config set outputFormat json

# Reset to defaults
magenta config reset
```

## Data Types

### Invoice Object

```json
{
  "billId": "TMA.123456789012",
  "billNo": "123456789012",
  "billStatus": "SETTLED",
  "billPeriod": "2026-02",
  "billDate": "2026-02-05",
  "amountDue": {
    "units": "EUR",
    "amount": 29.9
  },
  "paymentDueDate": "2026-02-18",
  "billingAccount": {
    "id": "1.12345678",
    "name": "Account Name",
    "isEBillActive": true
  },
  "relatedPartyName": "Customer Name",
  "downloadLinks": [
    {
      "name": "Rechnung 20260205",
      "url": "/documents/PEH.123456789012/attachments/bill_2026-02_123456789012.pdf"
    }
  ]
}
```

### Tariff/Asset Object

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "Internet L",
  "label": "Internet L",
  "customerNumber": "1.12345678",
  "category": "FIXED_INTERNET",
  "status": "Active"
}
```

### Profile Object

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-01",
  "username": "user@example.com",
  "passwordExist": true,
  "contactPhoneNo": "43699XXXXXXXX",
  "contactEmailAddress": "user@example.com"
}
```

## Tips for AI Assistants

1. Always check login status before running authenticated commands
2. Use `--json` flag when parsing output programmatically
3. Invoice IDs can be provided as just the number (`123456789012`) or full ID (`TMA.123456789012`)
4. Session tokens expire after ~15 minutes - handle "Not logged in" errors gracefully
5. Access token expiration can be checked with `magenta status --json`
