import { Injectable } from '@nestjs/common';
import { DatabaseService, PrismaModelName } from '@tax/database';

import logger from '../logger';

import { PageInfo } from './page-info.type';

@Injectable()
export default class PaginationService {
  constructor(private readonly database: DatabaseService) {}

  createPaginationObject<T extends Record<string, any>>({
    data,
    pageInfo,
    totalCount,
  }: {
    data: T[];
    pageInfo: PageInfo;
    totalCount: number;
  }): {
    data: T[];
    pageInfo: PageInfo;
    totalCount: number;
  } {
    return {
      data,
      pageInfo,
      totalCount,
    };
  }

  /**
   * Generate a cursor for a record based on its ID
   */
  generateCursor(id: number | string): string {
    return Buffer.from(`id:${id}`).toString('base64');
  }

  /**
   * Decode a cursor to get the ID
   */
  decodeCursor(cursor: string): string | number {
    try {
      const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
      const [field, value] = decoded.split(':');
      if (field === 'id') {
        return isNaN(Number(value)) ? value : Number(value);
      }
      return value;
    } catch (e) {
      logger.error('Error decoding cursor', e);
      return -1;
    }
  }

  async paginate(
    modelName: PrismaModelName,
    args: {
      filter: any;

      paging: any;
    },
  ): Promise<PageInfo> {
    // Get total count for internal logic - even if not directly returned
    await this.getTotalCount(modelName, args.filter);

    const { paging } = args || {};
    const { limit = 10, after, before } = paging || {};

    // Define pagination parameters
    const take = limit;
    // Define cursor as any type to avoid TypeScript errors

    let cursor: any = undefined;
    let skip = 0;

    // Implement cursor-based pagination logic
    if (after) {
      const cursorId = this.decodeCursor(after);
      cursor = { id: cursorId };
      skip = 1; // Skip the cursor item
    } else if (before) {
      const cursorId = this.decodeCursor(before);
      cursor = { id: cursorId };
      skip = 1;
      // When using before, we need to get the items before the cursor in reversed order
      // Take negative value means we take items before the cursor
      // This will be handled in the repository
    }

    // If we're fetching with 'before', we need to know if there are more items going backward
    const hasPreviousPage = before
      ? await this.hasPreviousItems(modelName, args.filter, cursor)
      : after
        ? true
        : false;

    // Check if there are more items going forward
    const hasNextPage = await this.hasNextItems(
      modelName,
      args.filter,
      cursor,
      take,
      skip,
      before ? true : false,
    );

    return {
      hasNextPage,
      hasPreviousPage,
      startCursor: undefined, // Will be set after fetching data
      endCursor: '', // Will be set after fetching data, setting default empty string to satisfy TS
    };
  }

  private async hasPreviousItems(
    modelName: PrismaModelName,

    filter: any,

    cursor: any,
  ): Promise<boolean> {
    // If there's no cursor, there are no previous items
    if (!cursor) return false;

    // Look for 1 item before the cursor

    const count = await (this.database[modelName] as any).count({
      where: {
        ...filter,
        id: { lt: cursor.id },
      },
      take: 1,
    });

    return count > 0;
  }

  private async hasNextItems(
    modelName: PrismaModelName,

    filter: any,

    cursor: any,
    take: number,
    skip: number,
    reverse = false,
  ): Promise<boolean> {
    // If we're looking at the previous page, we need to check for items after the cursor
    const operatorForDirection = reverse ? 'lt' : 'gt';

    // If there's no cursor, check if there are more items than the limit
    const whereClause = cursor
      ? {
          ...filter,
          id: { [operatorForDirection]: cursor.id },
        }
      : filter;

    // Look for one more item than the limit

    const count = await (this.database[modelName] as any).count({
      where: whereClause,
      take: take + 1,
      skip,
    });

    return count > take;
  }

  private async getTotalCount(modelName: PrismaModelName, args: any) {
    try {
      const countFilters = args ? this.removeNullKeys(args) : {};

      return await (this.database[modelName] as any).count({
        where: countFilters,
      });
    } catch (e) {
      logger.error(e);
      return 0;
    }
  }

  private removeNullKeys(obj: Record<string, any>) {
    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(obj).filter(([_, v]) => v !== null),
    );
  }
}
