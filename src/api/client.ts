import type { ApiResponse } from '../types/index.ts';
import { getAuth } from '../store/config.ts';

// TODO: Update with actual Magenta API base URL
const BASE_URL = 'https://api.magenta.at';

const DEFAULT_HEADERS: Record<string, string> = {
  'accept': 'application/json',
  'content-type': 'application/json',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
};

export async function apiRequest<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    authenticated?: boolean;
    headers?: Record<string, string>;
  } = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, authenticated = true, headers = {} } = options;

  const requestHeaders: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...headers,
  };

  // Add session if authenticated request
  if (authenticated) {
    const auth = await getAuth();
    if (auth?.sessionId) {
      requestHeaders['Authorization'] = `Bearer ${auth.sessionId}`;
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      if (contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // Ignore JSON parse errors
        }
      }
      return {
        success: false,
        error: errorMessage,
        statusCode: response.status,
      };
    }

    // Return raw response for binary content
    if (contentType.includes('application/pdf') || contentType.includes('application/vnd')) {
      return {
        success: true,
        data: response as unknown as T,
        statusCode: response.status,
      };
    }

    // Parse JSON response
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return {
        success: true,
        data: data as T,
        statusCode: response.status,
      };
    }

    // Return text for other content types
    const text = await response.text();
    return {
      success: true,
      data: text as unknown as T,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function downloadFile(
  endpoint: string,
  outputPath: string
): Promise<ApiResponse<string>> {
  const auth = await getAuth();

  const headers: Record<string, string> = {
    ...DEFAULT_HEADERS,
    'accept': '*/*',
  };

  if (auth?.sessionId) {
    headers['Authorization'] = `Bearer ${auth.sessionId}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}`,
        statusCode: response.status,
      };
    }

    const buffer = await response.arrayBuffer();
    const fs = await import('fs/promises');
    await fs.writeFile(outputPath, Buffer.from(buffer));

    return {
      success: true,
      data: outputPath,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
