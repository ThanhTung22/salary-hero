/**
 * Error detail when request get an error
 * */
export interface IErrorDetail {
  /**
   * Custom error code of project
   * */
  code: string | number;
  /**
   * Message for the error
   * */
  message: any;
  /**
   * More data for the error
   * */
  data?: any;

  /**
   * Translate args for i18n
   * */
  args?: any;
}
