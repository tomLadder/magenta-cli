import type { ApiResponse, CustomerBillsResponse, CustomerBill } from '../types/index.ts';
import { apiRequest, downloadFile } from './client.ts';

export async function getInvoices(): Promise<ApiResponse<CustomerBillsResponse>> {
  return apiRequest<CustomerBillsResponse>('/v2/customer-bills');
}

export async function getInvoice(billId: string): Promise<ApiResponse<CustomerBill>> {
  const result = await getInvoices();

  if (!result.success || !result.data) {
    return {
      success: false,
      error: result.error || 'Failed to fetch invoices',
    };
  }

  const invoice = result.data.customerBills.find(
    (bill) => bill.billId === billId || bill.billNo === billId
  );

  if (!invoice) {
    return {
      success: false,
      error: `Invoice not found: ${billId}`,
    };
  }

  return {
    success: true,
    data: invoice,
  };
}

export async function downloadInvoicePdf(
  billId: string,
  outputPath: string
): Promise<ApiResponse<string>> {
  // First get the invoice to find the download URL
  const invoiceResult = await getInvoice(billId);

  if (!invoiceResult.success || !invoiceResult.data) {
    return {
      success: false,
      error: invoiceResult.error || 'Invoice not found',
    };
  }

  const invoice = invoiceResult.data;

  if (!invoice.downloadLinks || invoice.downloadLinks.length === 0) {
    return {
      success: false,
      error: 'No download link available for this invoice',
    };
  }

  // The API returns URLs like "/documents/..." but the actual endpoint is "/v1/documents/..."
  let downloadUrl = invoice.downloadLinks[0].url;
  if (downloadUrl.startsWith('/documents/')) {
    downloadUrl = '/v1' + downloadUrl;
  }

  return downloadFile(downloadUrl, outputPath);
}
