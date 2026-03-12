// ─── ARMA Academy Shared Config Loader ──────────────────────────────────────

export interface ConfigValidationRule {
  key: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export interface LoadConfigOptions {
  rules: ConfigValidationRule[];
  serviceName: string;
}

export type Config = Record<string, string>;

/**
 * Loads and validates environment variables against a set of rules.
 * Throws on startup if required variables are missing — fail-fast principle.
 */
export function loadConfig(options: LoadConfigOptions): Config {
  const config: Config = {};
  const missing: string[] = [];

  for (const rule of options.rules) {
    const value = process.env[rule.key];

    if (value !== undefined) {
      config[rule.key] = value;
    } else if (rule.defaultValue !== undefined) {
      config[rule.key] = rule.defaultValue;
    } else if (rule.required) {
      missing.push(rule.key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[${options.serviceName}] Missing required environment variables:\n` +
      missing.map(k => `  - ${k}`).join('\n') +
      '\nCheck your .env file against .env.example',
    );
  }

  return config;
}

// ─── Pre-built rule sets for common variables ────────────────────────────────
export const BASE_CONFIG_RULES: ConfigValidationRule[] = [
  { key: 'NODE_ENV', required: true, defaultValue: 'development' },
  { key: 'PORT', required: false, defaultValue: '3000' },
  { key: 'LOG_LEVEL', required: false, defaultValue: 'info' },
];

export const DATABASE_CONFIG_RULES: ConfigValidationRule[] = [
  { key: 'DATABASE_URL', required: true, description: 'PostgreSQL connection string' },
];

export const REDIS_CONFIG_RULES: ConfigValidationRule[] = [
  { key: 'REDIS_URL', required: true, description: 'Redis connection string' },
];

export const AUTH_CONFIG_RULES: ConfigValidationRule[] = [
  { key: 'JWT_SECRET', required: true, description: 'Secret for JWT signing' },
  { key: 'JWT_EXPIRES_IN', required: false, defaultValue: '3600' },
];
