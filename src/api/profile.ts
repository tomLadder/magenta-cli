import type { ApiResponse, Profile } from '../types/index.ts';
import { apiRequest } from './client.ts';

export async function getProfile(): Promise<ApiResponse<Profile>> {
  return apiRequest<Profile>('/v2/profile/manage-profile');
}
