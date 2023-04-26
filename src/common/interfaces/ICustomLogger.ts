import { ILogDetail } from './ILogDetail';

/**
 * Custom logger for application, use default Logger of nestjs behind
 * */
export interface ICustomLogger {
  /**
   * Write a 'log' level log.
   */
  log(data: string | ILogDetail): void;
  /**
   * Write a 'warn' level log.
   */
  warn(data: string | ILogDetail): void;
  /**
   * Write an 'error' level log.
   */
  error(data: string | ILogDetail): void;
}
