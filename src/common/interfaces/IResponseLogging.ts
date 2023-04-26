/**
 * Message logging structure for completed requests
 * */
export interface IResponseLogging {
  /**
   * Status code of request
   * */
  statusCode: string | number;
  /**
   * Method of request: GET, POST,...
   * */
  method: string;
  /**
   * Path of request
   * */
  url: string;
  /**
   * Data responding to the request
   * */
  data: any;
  /**
   * Time to complete request
   * */
  time: string | number;
}
