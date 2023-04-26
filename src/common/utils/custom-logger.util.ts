import { Logger } from '@nestjs/common';
import { ICustomLogger, ILogDetail } from '../interfaces';

export class CustomLogger implements ICustomLogger {
  private readonly logger: Logger;
  private readonly context: string;

  constructor(context: string) {
    this.logger = new Logger(context);
    this.context = context;
  }

  log(data: string | ILogDetail) {
    if (typeof data === 'string') {
      this.logger.log(data);
    } else {
      this.logger.log(data.message, data.context || this.context);
    }
  }

  warn(data: string | ILogDetail) {
    if (typeof data === 'string') {
      this.logger.warn(data);
    } else {
      this.logger.warn(data.message, data.context || this.context);
    }
  }

  error(data: string | ILogDetail) {
    if (typeof data === 'string') {
      this.logger.error(data, undefined, this.context);
    } else {
      this.logger.error(data.message, data.stack, data.context || this.context);
    }
  }
}
