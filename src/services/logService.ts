import pino from 'pino';

// Configuração do logger
const logger = pino({
  level: window?.location ?.hostname === 'localhost' ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
      colorize: true,
    },
  },
});

export interface LogService {
  debug: (msg: string, ...args: any[]) => void;
  info: (msg: string, ...args: any[]) => void;
  warn: (msg: string, ...args: any[]) => void;
  error: (msg: string, ...args: any[]) => void;
  fatal: (msg: string, ...args: any[]) => void;
  trace: (msg: string, ...args: any[]) => void;
}

export class LoggerService {
  private static instance: LoggerService;
  private logger: pino.Logger;

  private constructor() {
    this.logger = logger;
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  public debug(msg: string, ...args: any[]): void {
    this.logger.debug(msg, ...args);
  }

  public info(msg: string, ...args: any[]): void {
    this.logger.info(msg, ...args);
  }

  public warn(msg: string, ...args: any[]): void {
    this.logger.warn(msg, ...args);
  }

  public error(msg: string, ...args: any[]): void {
    this.logger.error(msg, ...args);
  }

  public fatal(msg: string, ...args: any[]): void {
    this.logger.fatal(msg, ...args);
  }

  public trace(msg: string, ...args: any[]): void {
    this.logger.trace(msg, ...args);
  }
}

// Export do singleton
export const log = LoggerService.getInstance();
