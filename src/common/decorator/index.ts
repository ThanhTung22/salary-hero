import { Column, ColumnOptions } from "typeorm";

class ColumnNumberTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export function DecimalColumn(options: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'decimal',
    transformer: new ColumnNumberTransformer(),
    ...options,
  })}