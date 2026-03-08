# invoices

Manage your invoices.

## Commands

- [`invoices list`](#list) - List all invoices
- [`invoices get <id>`](#get) - Get invoice details
- [`invoices download <id>`](#download) - Download invoice as PDF

---

## list

List all invoices.

### Usage

```bash
magenta invoices list [options]
```

### Options

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

### Examples

```bash
# Pretty output
magenta invoices list

# JSON output
magenta invoices list --json
```

### Output

```
Invoices
────────────────────────────────────────────────────────────────────────────────
Bill No          Period     Date         Amount       Due Date     Status
────────────────────────────────────────────────────────────────────────────────
123456789012     2026-03    2026-03-05   €39.90       2026-03-18   Processing
123456789011     2026-02    2026-02-05   €39.90       2026-02-18   Paid
```

---

## get

Get detailed information about a specific invoice.

### Usage

```bash
magenta invoices get <id> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `<id>` | Invoice ID or Bill Number |

### Options

| Option | Description |
|--------|-------------|
| `--json` | Output result as JSON |

### Examples

```bash
# Get invoice details
magenta invoices get 123456789012

# Using full bill ID
magenta invoices get TMA.123456789012

# JSON output
magenta invoices get 123456789012 --json
```

### Output

```
Invoice Details
────────────────────────────────────────
Bill ID:   TMA.123456789012
Bill No:   123456789012
Period:    2026-02
Date:      2026-02-05
Amount:    €39.90 EUR
Status:    Paid
Due Date:  2026-02-18
Account:   Account Name (1.12345678)
E-Bill:    Active
Party:     Customer Name

Downloads
────────────────────────────────────────
• Rechnung 20260205
```

---

## download

Download an invoice as PDF.

### Usage

```bash
magenta invoices download <id> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `<id>` | Invoice ID or Bill Number |

### Options

| Option | Description |
|--------|-------------|
| `-o, --output <path>` | Custom output file path |

### Examples

```bash
# Download with default filename
magenta invoices download 123456789012
# Output: Invoice downloaded to: magenta-invoice-123456789012.pdf

# Custom output path
magenta invoices download 123456789012 --output ~/invoices/feb-2026.pdf
magenta invoices download 123456789012 -o /path/to/invoice.pdf
```

## Bill Status Values

| Status | Display | Description |
|--------|---------|-------------|
| `SETTLED` | Paid | Invoice has been paid |
| `IN_PROCESS` | Processing | Payment is being processed |
| `OPEN` | Open | Invoice is unpaid |
