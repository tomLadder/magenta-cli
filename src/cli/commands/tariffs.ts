import type { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getDashboard } from '../../api/dashboard.ts';
import { isLoggedIn } from '../../store/config.ts';

export function registerTariffCommands(program: Command): void {
  program
    .command('tariffs')
    .description('List all tariffs/contracts')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      if (!(await isLoggedIn())) {
        if (options.json) {
          console.log(JSON.stringify({ success: false, error: 'Not logged in' }));
        } else {
          console.log(chalk.red('Not logged in. Run:'), 'magenta login');
        }
        return;
      }

      const spinner = options.json ? null : ora('Fetching tariffs...').start();
      const result = await getDashboard();

      if (!result.success || !result.data) {
        if (options.json) {
          console.log(JSON.stringify({ success: false, error: result.error }));
        } else {
          spinner?.fail('Failed to fetch tariffs');
          console.log(chalk.red('Error:'), result.error);
        }
        return;
      }

      spinner?.stop();

      if (options.json) {
        console.log(JSON.stringify(result.data.assets, null, 2));
        return;
      }

      const assets = result.data.assets;

      if (assets.length === 0) {
        console.log(chalk.yellow('No tariffs found'));
        return;
      }

      console.log();
      for (const asset of assets) {
        console.log(chalk.bold(asset.name));
        console.log(chalk.gray('─'.repeat(40)));
        console.log(chalk.cyan('ID:'), asset.id);
        console.log(chalk.cyan('Label:'), asset.label);
        console.log(chalk.cyan('Customer #:'), asset.customerNumber);
        console.log(chalk.cyan('Category:'), formatCategory(asset.category));
        console.log(chalk.cyan('Status:'), formatStatus(asset.status));
        console.log();
      }
    });
}

function formatCategory(category: string): string {
  switch (category) {
    case 'FIXED_INTERNET':
      return 'Fixed Internet';
    case 'MOBILE':
      return 'Mobile';
    default:
      return category;
  }
}

function formatStatus(status: string): string {
  switch (status) {
    case 'Active':
      return chalk.green('Active');
    case 'Inactive':
      return chalk.red('Inactive');
    default:
      return status;
  }
}
