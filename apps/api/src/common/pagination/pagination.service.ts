import { Injectable } from '@nestjs/common';
import { DatabaseService, PrismaModelName } from '@tax/database';

import logger from '../logger';

import { PagingResultType } from './pagination.output';

@Injectable()
export default class PaginationService {
  constructor(private readonly database: DatabaseService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPaginationObject<T extends Record<string, any>>({
    data,
    paging,
  }: {
    data: T[];
    paging: PagingResultType;
  }): {
    data: T[];
    paging: PagingResultType;
  } {
    return {
      data,
      paging,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async paginate(
    modelName: PrismaModelName,
    args: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filter: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      paging: any;
    },
  ) {
    const totalCount = await this.getTotalCount(modelName, args.filter);

    const { paging } = args || {};
    const { skip, limit } = paging || { skip: 0, limit: 10 };

    return {
      skip,
      limit,
      totalCount,
      hasNext: skip + limit < totalCount,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async getTotalCount(modelName: PrismaModelName, args: any) {
    try {
      const countFilters = args ? this.removeNullKeys(args) : {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return await (this.database[modelName] as any).count({
        where: countFilters,
      });
    } catch (e) {
      logger.error(e);
      return 0;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private removeNullKeys(obj: Record<string, any>) {
    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(obj).filter(([_, v]) => v !== null),
    );
  }
}
