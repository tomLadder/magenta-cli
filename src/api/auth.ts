import forge from 'node-forge';
import type { ApiResponse, LoginStatus, MagentaLoginResponse } from '../types/index.ts';
import { setAuth, clearAuth, getAuth, getDeviceId } from '../store/config.ts';

const BFF_DOMAIN = 'https://onewebbff.svc.magenta.at';
const API_KEY = '3618a760-c2c6-4b4b-8b76-4eac52e0120d';

const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIDANBgkqhkiG9w0BAQEFAAOCAQ0AMIIBCAKCAQEA0EsuGonW8+y5Oq2Hopru
5oFCaXEDMBrWPDkzIeY1Vvot3z/l9Q3/bcUQV3Yo6DvbhlARQnMeqiKJ5dutZmdx
uj+nhZq9FcL20RUywqGnxTCHaGAEb05Qlovu7Rbld2GeJa4nFP1RY5glUlr/DYVB
+tIHqPfZVUSc1PS+l5QkB9TJir57ALxERBJGjT5vhQixXGf6IqmLkxm1okIbuGJa
2ttmSWNq0OVi2cF40ZsV64ly7a3m6n2WBYmhqd3ghSprNHXwJBwYwu1L+9CF9oLQ
XHs9cUDhqyQB+3iDU2Ro/rtZsGcnvnIiDHRIWZ94zcOTOpdUH4pBujc8jF3qdw99
UwIBJQ==
-----END PUBLIC KEY-----`;

function encryptPassword(password: string): string {
  const publicKey = forge.pki.publicKeyFromPem(RSA_PUBLIC_KEY);
  const encrypted = publicKey.encrypt(forge.util.encodeUtf8(password), 'RSA-OAEP');
  return forge.util.encode64(encrypted);
}

function generateUUID(): string {
  return crypto.randomUUID();
}

export async function login(
  username: string,
  password: string
): Promise<ApiResponse<LoginStatus>> {
  const deviceId = await getDeviceId();
  const sessionId = generateUUID();
  const trackingId = generateUUID();

  const encryptedPassword = encryptPassword(password);

  const response = await fetch(`${BFF_DOMAIN}/v1/login/usernamepassword`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': API_KEY,
      'Origin': 'https://www.magenta.at',
      'Referer': 'https://www.magenta.at/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
      'x-request-session-id': sessionId,
      'x-request-tracking-id': trackingId,
    },
    body: JSON.stringify({
      username,
      password: encryptedPassword,
      deviceId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      success: false,
      error: `Login failed: ${response.status} - ${errorText}`,
      statusCode: response.status,
    };
  }

  const data: MagentaLoginResponse = await response.json();

  if (!data.token?.accessToken) {
    return {
      success: false,
      error: 'Login failed: No access token received',
    };
  }

  const now = Date.now();
  await setAuth({
    accessToken: data.token.accessToken,
    refreshToken: data.token.refreshToken,
    accessExpiresAt: now + data.token.accessExpiresIn * 1000,
    refreshExpiresAt: now + data.token.refreshExpiresIn * 1000,
    deviceId,
    username,
  });

  return {
    success: true,
    data: {
      loggedIn: true,
      username,
    },
  };
}

export async function logout(): Promise<ApiResponse<void>> {
  const auth = await getAuth();

  if (auth?.accessToken) {
    const trackingId = generateUUID();
    const sessionId = generateUUID();

    try {
      await fetch(`${BFF_DOMAIN}/v1/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`,
          'x-request-session-id': sessionId,
          'x-request-tracking-id': trackingId,
        },
      });
    } catch {
      // Ignore logout errors
    }
  }

  await clearAuth();
  return { success: true };
}

export async function getStatus(): Promise<ApiResponse<LoginStatus>> {
  const auth = await getAuth();

  if (!auth?.accessToken) {
    return {
      success: true,
      data: {
        loggedIn: false,
      },
    };
  }

  // Check if token is expired
  if (Date.now() > auth.accessExpiresAt) {
    // TODO: Implement token refresh
    return {
      success: true,
      data: {
        loggedIn: false,
      },
    };
  }

  return {
    success: true,
    data: {
      loggedIn: true,
      username: auth.username,
    },
  };
}
