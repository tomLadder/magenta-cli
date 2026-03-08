import type { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { login, logout, getStatus } from '../../api/auth.ts';
import { isLoggedIn, getAuth } from '../../store/config.ts';

export function registerAuthCommands(program: Command): void {
  program
    .command('login')
    .description('Login to Magenta Telekom')
    .option('-u, --username <username>', 'Username or email')
    .option('-p, --password <password>', 'Password')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      const jsonOutput = options.json;

      // Check if already logged in
      if (await isLoggedIn()) {
        const status = await getStatus();
        if (status.success && status.data?.loggedIn) {
          if (jsonOutput) {
            console.log(JSON.stringify({ success: false, error: 'Already logged in', user: status.data.username }));
            return;
          }
          console.log(chalk.yellow('Already logged in as:'), status.data.username);
          const { confirmLogout } = await prompts({
            type: 'confirm',
            name: 'confirmLogout',
            message: 'Do you want to logout and login again?',
            initial: false,
          });
          if (!confirmLogout) {
            return;
          }
          await logout();
        }
      }

      // Get username
      let username = options.username;
      if (!username) {
        if (jsonOutput) {
          console.log(JSON.stringify({ success: false, error: 'Username required (--username)' }));
          return;
        }
        const response = await prompts({
          type: 'text',
          name: 'username',
          message: 'Enter your username or email:',
          validate: (value) => {
            if (!value || value.length < 3) {
              return 'Please enter a valid username or email';
            }
            return true;
          },
        });
        username = response.username;
        if (!username) {
          console.log(chalk.red('Login cancelled'));
          return;
        }
      }

      // Get password
      let password = options.password;
      if (!password) {
        if (jsonOutput) {
          console.log(JSON.stringify({ success: false, error: 'Password required (--password)' }));
          return;
        }
        const response = await prompts({
          type: 'password',
          name: 'password',
          message: 'Enter your password:',
          validate: (value) => {
            if (!value || value.length < 1) {
              return 'Please enter your password';
            }
            return true;
          },
        });
        password = response.password;
        if (!password) {
          console.log(chalk.red('Login cancelled'));
          return;
        }
      }

      // Login
      const spinner = jsonOutput ? null : ora('Logging in...').start();
      const loginResult = await login(username, password);

      if (!loginResult.success) {
        if (jsonOutput) {
          console.log(JSON.stringify({ success: false, error: loginResult.error }));
        } else {
          spinner?.fail('Login failed');
          console.log(chalk.red('Error:'), loginResult.error);
        }
        return;
      }

      if (jsonOutput) {
        console.log(JSON.stringify({ success: true, user: loginResult.data }));
      } else {
        spinner?.succeed('Login successful');
        console.log(chalk.green('Welcome,'), loginResult.data?.username || 'User');
      }
    });

  program
    .command('logout')
    .description('Logout from Magenta Telekom')
    .action(async () => {
      if (!(await isLoggedIn())) {
        console.log(chalk.yellow('Not logged in'));
        return;
      }

      await logout();
      console.log(chalk.green('Logged out successfully'));
    });

  program
    .command('whoami')
    .description('Show current user information')
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

      const result = await getStatus();

      if (!result.success || !result.data) {
        if (options.json) {
          console.log(JSON.stringify({ success: false, error: result.error }));
        } else {
          console.log(chalk.red('Error:'), result.error);
        }
        return;
      }

      if (options.json) {
        console.log(JSON.stringify(result.data, null, 2));
        return;
      }

      console.log();
      console.log(chalk.bold('User Information'));
      console.log(chalk.gray('-'.repeat(40)));
      console.log(chalk.cyan('Username:'), result.data.username);
      console.log(chalk.cyan('Logged in:'), result.data.loggedIn ? 'Yes' : 'No');
    });

  program
    .command('status')
    .description('Check login status')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
      const auth = await getAuth();
      const status = await getStatus();

      if (options.json) {
        console.log(JSON.stringify({
          loggedIn: status.data?.loggedIn || false,
          username: auth?.username,
          ...status.data,
        }, null, 2));
        return;
      }

      if (!status.success || !status.data?.loggedIn) {
        console.log(chalk.yellow('Not logged in'));
        return;
      }

      console.log(chalk.green('Logged in as:'), status.data.username);
    });
}
