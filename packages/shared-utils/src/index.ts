// ─── ARMA Academy Shared Utilities ──────────────────────────────────────────

// ─── Logger (Winston-based, JSON output) ────────────────────────────────────
export interface LoggerOptions {
  service: string;
  level?: 'error' | 'warn' | 'info' | 'debug' | 'verbose';
}

export interface Logger {
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
  debug: (message: string, meta?: Record<string, unknown>) => void;
}

/**
 * Creates a Winston-based structured JSON logger.
 * Import winston at runtime (it's a dependency of @arma-academy/shared-utils).
 */
export function createLogger(options: LoggerOptions): Logger {
  // Lazy import to avoid pulling winston into type-only consumers
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const winston = require('winston') as typeof import('winston');

  const winstonLogger = winston.createLogger({
    level: options.level ?? 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
    defaultMeta: { service: options.service },
    transports: [new winston.transports.Console()],
  });

  return {
    info: (message, meta) => winstonLogger.info(message, meta),
    warn: (message, meta) => winstonLogger.warn(message, meta),
    error: (message, meta) => winstonLogger.error(message, meta),
    debug: (message, meta) => winstonLogger.debug(message, meta),
  };
}

// ─── AppError ────────────────────────────────────────────────────────────────
/**
 * Platform-wide error class. Extends Error with HTTP status code and
 * machine-readable code for consistent API error responses.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

// ─── Validators ──────────────────────────────────────────────────────────────
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// ─── Pagination Helpers ──────────────────────────────────────────────────────
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export function normalizePagination(params: PaginationParams): { skip: number; take: number; page: number; limit: number } {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? 20));
  return { skip: (page - 1) * limit, take: limit, page, limit };
}
