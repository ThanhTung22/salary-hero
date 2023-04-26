export interface IPageRequest {
  /**
   * @field page
   * @type number
   * @description set current page
   * @example page=1
   */
  page?: number;
  /**
   * @field pageSize
   * @type number
   * @description size page request.
   * @example pageSize=10
   */
  pageSize?: number;
  /**
   * @field sort
   * @type string
   * @description sort param
   * @example sort: name=asc;address=desc
   */
  sort?: string;
  /**
   * @field equalSearch
   * @type string
   * @description search for absolute right data
   * @example where: name:abc;address=abc,
   */
  equalSearch?: string;
  /**
   * @field includeSearch
   * @type string
   * @description search for same like SQL
   * @example email=abc@example.com
   */
  includeSearch?: string;
  /**
   * @note NOT IMPLEMENTED
   * @field fullTextSearch
   * @type string
   * @description full text search
   * @example test
   */
  fullTextSearch?: string;
}
