import { IPageRequest } from './IPageRequest';
import { IPageResponse } from './IPageResponse';

/**
 * Base repository for most repository needing basic crud
 * */
export interface IBaseRepository<T> {
  /**
   * Create one resource
   * */
  createOne(data: T): Promise<T>;
  /**
   * Create many resources
   * */
  createMany(array: T[]): Promise<T[]>;
  /**
   * Get one resource
   * */
  getOne(findCondition: any): Promise<T>;
  /**
   * Get many resources by given condition
   * */
  getMany(request: IPageRequest): Promise<IPageResponse<T> | T[]>;
  /**
   * Update one resource by given condition
   * */
  updateOne(findCondition: any, data: any): Promise<boolean>;
  /**
   * Delete one resource by given condition
   * */
  deleteOne(findCondition: any, softDelete: boolean): Promise<boolean>;
}
