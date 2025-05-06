import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OtherDebtsRepository {
  constructor(private prisma: DatabaseService) {}

  async getOne(params: {
    where: Record<string, unknown>;
    select?: Record<string, boolean>;
  }) {
    const otherDebt = await this.prisma.otherDebt.findFirst({
      where: params.where,
      select: params.select,
    });

    if (!otherDebt) throw new Error('Other debt not found');
    return otherDebt;
  }

  async getAll(params: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, string>;
    take?: number;
    skip?: number;
  }) {
    return await this.prisma.otherDebt.findMany({
      ...params,
    });
  }

  async createOtherDebt(data: {
    taxpayerId: string;
    debtType: string;
    debtIdentifier?: string;
    creditorName: string;
    interestExpenses: number;
    remainingBalance: number;
    taxYear: number;
    taxReturnId?: number;
  }) {
    // First create the parent Debt record
    const debt = await this.prisma.debt.create({
      data: {
        taxpayerId: data.taxpayerId,
        debtType: 'other_debt',
        taxYear: data.taxYear,
        taxReturnId: data.taxReturnId,
        // Create the child OtherDebt record with the relation
        otherDebt: {
          create: {
            debtType: data.debtType,
            debtIdentifier: data.debtIdentifier,
            creditorName: data.creditorName,
            interestExpenses: new Decimal(data.interestExpenses.toString()),
            remainingBalance: new Decimal(data.remainingBalance.toString()),
          },
        },
      },
      include: {
        otherDebt: true,
      },
    });

    return debt.otherDebt;
  }

  async updateOtherDebt(
    id: number,
    data: Partial<{
      debtType: string;
      debtIdentifier: string;
      creditorName: string;
      interestExpenses: number;
      remainingBalance: number;
      taxYear: number;
    }>,
  ) {
    // Convert numeric values to Decimal for Prisma
    const updateData: any = { ...data };
    if (data.interestExpenses !== undefined) {
      updateData.interestExpenses = new Decimal(
        data.interestExpenses.toString(),
      );
    }
    if (data.remainingBalance !== undefined) {
      updateData.remainingBalance = new Decimal(
        data.remainingBalance.toString(),
      );
    }

    return await this.prisma.otherDebt.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteOtherDebt(id: number) {
    // First get the debtId from OtherDebt
    const otherDebt = await this.prisma.otherDebt.findUnique({
      where: { id },
      select: { debtId: true },
    });

    if (!otherDebt) {
      throw new Error('Other debt not found');
    }

    // Delete the parent Debt record will cascade to delete the OtherDebt
    return await this.prisma.debt.delete({
      where: { id: otherDebt.debtId },
      include: {
        otherDebt: true,
      },
    });
  }
}
