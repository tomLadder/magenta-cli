import type { ApiResponse, LoginStatus } from '../types/index.ts';
import { setAuth, clearAuth, getAuth } from '../store/config.ts';

// TODO: Implement actual Magenta API authentication
// This is a dummy implementation for initial setup

export async function login(
  username: string,
  password: string
): Promise<ApiResponse<LoginStatus>> {
  // Dummy implementation - replace with actual Magenta API calls
  console.log('[DEBUG] Login called with username:', username);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: Replace with actual authentication logic
  // For now, we'll simulate a successful login
  const dummySessionId = `magenta_session_${Date.now()}`;

  await setAuth({
    sessionId: dummySessionId,
    username: username,
  });

  return {
    success: true,
    data: {
      loggedIn: true,
      username: username,
    },
  };
}

export async function logout(): Promise<ApiResponse<void>> {
  await clearAuth();
  return { success: true };
}

export async function getStatus(): Promise<ApiResponse<LoginStatus>> {
  const auth = await getAuth();

  if (!auth?.sessionId) {
    return {
      success: true,
      data: {
        loggedIn: false,
      },
    };
  }

  // TODO: Validate session with Magenta API
  return {
    success: true,
    data: {
      loggedIn: true,
      username: auth.username,
    },
  };
}
