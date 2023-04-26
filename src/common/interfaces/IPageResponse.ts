/**
 * Response structure for requests with pagination
 * */
export interface IPageResponse<T> {
  /**
   * List paginated data
   * */
  data: T[];
  /**
   * Current query page
   * */
  page: number;
  /**
   * Size of page
   * */
  pageSize: number;
  /**
   * Total page, calculated by totalItem / pageSize
   * */
  totalPage: number;
  /**
   * Total item in database
   * */
  totalItem: number;
}
