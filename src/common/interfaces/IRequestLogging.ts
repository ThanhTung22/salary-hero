import { HttpStatus } from '@nestjs/common';

/**
 * Message logging structure for incoming requests
 * */
export interface IRequestLogging {
  /**
   * Status code of request
   * */
  statusCode: HttpStatus | string;
  /**
   * Method of request: GET, POST,...
   * */
  method: string;
  /**
   * Path of request
   * */
  url: string;
  /**
   * Body of request
   * */
  body: any;
  /**
   * Params of request
   * */
  params: any;
  /**
   * Query of request
   * */
  query: any;
}
