import { HttpStatus } from '@nestjs/common';
import { IErrorDetail } from './IErrorDetail';

/**
 * Response structure for all error request
 * */
export interface IResponseError {
  /**
   * Status code of request
   * */
  statusCode: HttpStatus;
  /**
   * Detail of the error
   * */
  error: IErrorDetail;
  /**
   * Time when the error occurs
   * */
  timestamp?: string | Date | number;
}
