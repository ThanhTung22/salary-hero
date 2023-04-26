/**
 * Base interface for most entity with audit and soft delete
 * */
export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
