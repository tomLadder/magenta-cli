import type { ApiResponse, DashboardResponse } from '../types/index.ts';
import { apiRequest } from './client.ts';

export async function getDashboard(): Promise<ApiResponse<DashboardResponse>> {
  return apiRequest<DashboardResponse>('/v1/dashboard');
}
