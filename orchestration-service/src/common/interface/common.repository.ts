export interface CommonRepository<T> {
  create(data: Partial<T>): T;
  save(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOneById(id: string): Promise<T | null>;
  remove(data: T): Promise<void>;
}
