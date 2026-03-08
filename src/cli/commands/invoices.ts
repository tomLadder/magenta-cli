import type { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getInvoices, getInvoice, downloadInvoicePdf } from '../../api/invoices.ts';
import { isLoggedIn } from '../../store/config.ts';
import { join } from 'path';

export function registerInvoiceCommands(program: Command): void {
  const invoices = program
    .command('invoices')
    .description('Manage invoices');

  invoices
    .command('list')
    .description('List all invoices')
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

      const spinner = options.json ? null : ora('Fetching invoices...').start();
      const result = await getInvoices();

      if (!result.success || !result.data) {
        if (options.json) {
          console.log(JSON.stringify({ success: false, error: result.error }));
        } else {
          spinner?.fail('Failed to fetch invoices');
          console.log(chalk.red('Error:'), result.error);
        }
        return;
      }

      spinner?.stop();

      if (options.json) {
        console.log(JSON.stringify(result.data.customerBills, null, 2));
        return;
      }

      const bills = result.data.customerBills;

      if (bills.length === 0) {
        console.log(chalk.yellow('No invoices found'));
        return;
      }

      console.log();
      console.log(chalk.bold('Invoices'));
      console.log(chalk.gray('─'.repeat(80)));
      console.log(
        chalk.bold(padRight('Bill No', 16)),
        chalk.bold(padRight('Period', 10)),
        chalk.bold(padRight('Date', 12)),
        chalk.bold(padRight('Amount', 12)),
        chalk.bold(padRight('Due Date', 12)),
        chalk.bold(padRight('Status', 12))
      );
      console.log(chalk.gray('─'.repeat(80)));

      for (const bill of bills) {
        const statusColor = getStatusColor(bill.billStatus);
        console.log(
          padRight(bill.billNo, 16),
          padRight(bill.billPeriod, 10),
          padRight(bill.billDate, 12),
          padRight(`€${bill.amountDue.amount.toFixed(2)}`, 12),
          padRight(bill.paymentDueDate, 12),
          statusColor(padRight(formatStatus(bill.billStatus), 12))
        );
      }
      console.log();
    });

  invoices
    .command('download <id>')
    .description('Download invoice as PDF')
    .option('-o, --output <path>', 'Output file path')
    .action(async (id, options) => {
      if (!(await isLoggedIn())) {
        console.log(chalk.red('Not logged in. Run:'), 'magenta login');
        return;
      }

      // Normalize the ID - user can pass just the number or full ID
      const billId = id.startsWith('TMA.') ? id : id;

      const outputPath = options.output || join(
        process.cwd(),
        `magenta-invoice-${id.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
      );

      const spinner = ora(`Downloading invoice ${id}...`).start();

      const result = await downloadInvoicePdf(billId, outputPath);

      if (!result.success) {
        spinner.fail('Download failed');
        console.log(chalk.red('Error:'), result.error);
        return;
      }

      spinner.succeed(`Invoice downloaded to: ${outputPath}`);
    });

  invoices
    .command('get <id>')
    .description('Get invoice details')
    .option('--json', 'Output as JSON')
    .action(async (id, options) => {
      if (!(await isLoggedIn())) {
        if (options.json) {
          console.log(JSON.stringify({ success: false, error: 'Not logged in' }));
        } else {
          console.log(chalk.red('Not logged in. Run:'), 'magenta login');
        }
        return;
      }

      const spinner = options.json ? null : ora('Fetching invoice...').start();
      const result = await getInvoice(id);

      if (!result.success || !result.data) {
        if (options.json) {
          console.log(JSON.stringify({ success: false, error: result.error }));
        } else {
          spinner?.fail('Failed to fetch invoice');
          console.log(chalk.red('Error:'), result.error);
        }
        return;
      }

      spinner?.stop();

      const bill = result.data;

      if (options.json) {
        console.log(JSON.stringify(bill, null, 2));
        return;
      }

      console.log();
      console.log(chalk.bold('Invoice Details'));
      console.log(chalk.gray('─'.repeat(40)));
      console.log(chalk.cyan('Bill ID:'), bill.billId);
      console.log(chalk.cyan('Bill No:'), bill.billNo);
      console.log(chalk.cyan('Period:'), bill.billPeriod);
      console.log(chalk.cyan('Date:'), bill.billDate);
      console.log(chalk.cyan('Amount:'), `€${bill.amountDue.amount.toFixed(2)} ${bill.amountDue.units}`);
      console.log(chalk.cyan('Status:'), formatStatus(bill.billStatus));
      console.log(chalk.cyan('Due Date:'), bill.paymentDueDate);
      console.log(chalk.cyan('Account:'), `${bill.billingAccount.name} (${bill.billingAccount.id})`);
      console.log(chalk.cyan('E-Bill:'), bill.billingAccount.isEBillActive ? 'Active' : 'Inactive');
      console.log(chalk.cyan('Party:'), bill.relatedPartyName);

      if (bill.downloadLinks.length > 0) {
        console.log();
        console.log(chalk.bold('Downloads'));
        console.log(chalk.gray('─'.repeat(40)));
        for (const link of bill.downloadLinks) {
          console.log(chalk.cyan(`• ${link.name}`));
        }
      }

      if (bill.stateDescription) {
        console.log();
        console.log(chalk.bold('Note'));
        console.log(chalk.gray('─'.repeat(40)));
        console.log(bill.stateDescription.trim());
      }
    });
}

function padRight(str: string, len: number): string {
  return str.padEnd(len);
}

function formatStatus(status: string): string {
  switch (status) {
    case 'SETTLED':
      return 'Paid';
    case 'IN_PROCESS':
      return 'Processing';
    case 'OPEN':
      return 'Open';
    default:
      return status;
  }
}

function getStatusColor(status: string): (str: string) => string {
  switch (status) {
    case 'SETTLED':
      return chalk.green;
    case 'IN_PROCESS':
      return chalk.yellow;
    case 'OPEN':
      return chalk.red;
    default:
      return chalk.white;
  }
}
