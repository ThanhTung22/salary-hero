import { HttpStatus } from '@nestjs/common';

/**
 * Response structure for all success request
 * */
export interface IResponseSuccess {
  /**
   * Status code of request
   * */
  statusCode: HttpStatus;
  /**
   * Data responding to the request
   * */
  data: any;
}
