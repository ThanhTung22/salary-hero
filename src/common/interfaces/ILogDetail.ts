/**
 * Log detail for custom logger
 * */
export interface ILogDetail {
  /**
   * Message of the log
   * */
  message: any;
  /**
   * Stack trace for error log
   * */
  stack?: any;
  /**
   * Context (location) of the log
   * */
  context?: string;
}
