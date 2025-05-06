import { DatabaseService, Prisma } from '@tax/database';

export function BaseRepository<T, Model = unknown>(entity: Prisma.ModelName) {
  return class BaseRepositoryClass {
    prisma: DatabaseService;

    constructor(prisma: DatabaseService) {
      this.prisma = prisma;
    }

    findAll(where?: T, include?) {
      return this.prisma[entity].findMany({ where, include });
    }

    findOne(id: number) {
      return this.prisma[entity].findFirst({ where: { id } });
    }

    create(data: Omit<Model, 'id'>): Promise<Model> {
      return this.prisma[entity].create({ data });
    }

    createOrUpdate(
      where,
      newRecord: Omit<Model, 'id'>,
      existingRecord: Partial<Omit<Model, 'id'>>,
      include = {},
    ): Promise<Model> {
      return this.prisma[entity].upsert({
        where,
        include,
        create: newRecord,
        update: existingRecord,
      });
    }

    update(where: T, data: Partial<Omit<Model, 'id'>>) {
      return this.prisma[entity].update({
        where,
        data,
      });
    }

    async deleteOne(where): Promise<boolean> {
      if (!where) {
        throw new Error('Please specify a delete condition');
      }
      try {
        // @TODO: Dig deeper into this use case
        await this.prisma[entity].delete({ where });
      } catch {
        return false;
      }
      return true;
    }
  };
}
