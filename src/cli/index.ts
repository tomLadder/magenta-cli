import { Command } from 'commander';
import { registerAuthCommands } from './commands/auth.ts';
import { registerConfigCommands } from './commands/config.ts';

export function createCLI(): Command {
  const program = new Command();

  program
    .name('magenta')
    .description('Unofficial CLI for Magenta Telekom Austria')
    .version('0.0.1');

  // Register all command groups
  registerAuthCommands(program);
  registerConfigCommands(program);

  return program;
}
