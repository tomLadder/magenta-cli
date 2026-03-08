# Contributing to magenta-cli

Thank you for your interest in contributing to magenta-cli!

## Code of Conduct

Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists
2. Include your OS and Bun version
3. Provide steps to reproduce
4. Include any error messages

### Feature Requests

1. Describe the feature and its use case
2. Explain why it would be useful
3. Consider if it fits the project scope

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run typecheck`
5. Submit a PR with a clear description

## Development Setup

```bash
git clone https://github.com/tomLadder/magenta-cli.git
cd magenta-cli
bun install
```

### Running

```bash
# Development mode
bun run dev

# With arguments
bun run src/index.ts login
```

### Building

```bash
bun run build
```

## Project Structure

```
src/
├── index.ts           # CLI entry point
├── api/               # API client modules
│   ├── auth.ts        # Authentication (RSA encrypted password)
│   ├── client.ts      # HTTP client
│   ├── profile.ts     # Profile endpoints
│   ├── dashboard.ts   # Dashboard/tariffs endpoints
│   └── invoices.ts    # Invoice endpoints
├── cli/
│   ├── index.ts       # CLI setup
│   └── commands/      # Command implementations
├── store/
│   └── config.ts      # Config management
└── types/
    └── index.ts       # TypeScript types
```

## API Discovery

The Magenta API was discovered using browser developer tools. To discover new endpoints:

1. Open https://www.magenta.at in Chrome/Firefox
2. Open Developer Tools (F12)
3. Go to the Network tab
4. Navigate through the "Mein Magenta" portal
5. Filter by "onewebbff" to see the API requests

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add invoice download command`
- `fix: handle expired session gracefully`
- `docs: update README with examples`
- `refactor: simplify auth flow`

## Testing

Currently no automated tests. Manual testing:

```bash
# Test login flow
bun run dev login

# Test invoice listing
bun run dev invoices list

# Test JSON output
bun run dev whoami --json
```

## Questions?

Open an issue with your question.
