import type { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig, saveConfig, resetConfig, getConfigPath } from '../../store/config.ts';

export function registerConfigCommands(program: Command): void {
  const config = program
    .command('config')
    .description('Manage CLI configuration');

  config
    .command('get')
    .description('Show current configuration')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      const cfg = await loadConfig();

      if (options.json) {
        // Remove sensitive data for display
        const sanitized = {
          ...cfg,
          auth: cfg.auth ? { username: cfg.auth.username, hasSession: !!cfg.auth.sessionId } : undefined,
        };
        console.log(JSON.stringify(sanitized, null, 2));
        return;
      }

      console.log();
      console.log(chalk.bold('Configuration'));
      console.log(chalk.gray('-'.repeat(40)));
      console.log(chalk.cyan('Output format:'), cfg.settings.outputFormat);
      console.log(chalk.cyan('Logged in:'), cfg.auth ? 'Yes' : 'No');
      if (cfg.auth?.username) {
        console.log(chalk.cyan('Username:'), cfg.auth.username);
      }
      console.log();
      console.log(chalk.gray('Config file:'), getConfigPath());
    });

  config
    .command('set <key> <value>')
    .description('Set a configuration value')
    .action(async (key, value) => {
      const cfg = await loadConfig();

      switch (key) {
        case 'outputFormat':
        case 'output-format':
          if (value !== 'pretty' && value !== 'json') {
            console.log(chalk.red('Invalid value. Must be "pretty" or "json"'));
            return;
          }
          cfg.settings.outputFormat = value;
          break;
        default:
          console.log(chalk.red('Unknown config key:'), key);
          console.log(chalk.gray('Available keys: outputFormat'));
          return;
      }

      await saveConfig(cfg);
      console.log(chalk.green('Configuration updated'));
    });

  config
    .command('reset')
    .description('Reset configuration to defaults')
    .action(async () => {
      await resetConfig();
      console.log(chalk.green('Configuration reset to defaults'));
    });

  config
    .command('path')
    .description('Show configuration file path')
    .action(() => {
      console.log(getConfigPath());
    });
}
