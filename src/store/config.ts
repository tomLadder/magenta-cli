import { homedir } from 'os';
import { join } from 'path';
import type { Config, AuthSession } from '../types/index.ts';

const CONFIG_DIR = join(homedir(), '.magenta');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

const DEFAULT_CONFIG: Config = {
  settings: {
    outputFormat: 'pretty',
  },
};

async function ensureConfigDir(): Promise<void> {
  const fs = await import('fs/promises');
  try {
    await fs.mkdir(CONFIG_DIR, { recursive: true, mode: 0o700 });
  } catch (error) {
    // Directory might already exist
  }
}

export async function loadConfig(): Promise<Config> {
  const fs = await import('fs/promises');
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export async function saveConfig(config: Config): Promise<void> {
  const fs = await import('fs/promises');
  await ensureConfigDir();
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), {
    mode: 0o600,
  });
}

export async function getAuth(): Promise<AuthSession | undefined> {
  const config = await loadConfig();
  return config.auth;
}

export async function setAuth(auth: AuthSession): Promise<void> {
  const config = await loadConfig();
  config.auth = auth;
  await saveConfig(config);
}

export async function clearAuth(): Promise<void> {
  const config = await loadConfig();
  delete config.auth;
  await saveConfig(config);
}

export async function isLoggedIn(): Promise<boolean> {
  const auth = await getAuth();
  if (!auth?.accessToken) return false;
  // Check if token is expired
  return Date.now() < auth.accessExpiresAt;
}

export async function getDeviceId(): Promise<string> {
  const config = await loadConfig();
  if (config.deviceId) {
    return config.deviceId;
  }
  // Generate and persist a new device ID
  const deviceId = crypto.randomUUID();
  config.deviceId = deviceId;
  await saveConfig(config);
  return deviceId;
}

export async function getSetting<K extends keyof Config['settings']>(
  key: K
): Promise<Config['settings'][K]> {
  const config = await loadConfig();
  return config.settings[key];
}

export async function setSetting<K extends keyof Config['settings']>(
  key: K,
  value: Config['settings'][K]
): Promise<void> {
  const config = await loadConfig();
  config.settings[key] = value;
  await saveConfig(config);
}

export async function resetConfig(): Promise<void> {
  await saveConfig(DEFAULT_CONFIG);
}

export function getConfigPath(): string {
  return CONFIG_FILE;
}
