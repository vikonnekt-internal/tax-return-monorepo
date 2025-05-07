import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import PaginationService from '../common/pagination/pagination.service';
import { DebtTypeEnum } from './dto/debt-type.enum';

@Injectable()
export class DebtsRepository {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createDebtInput: CreateDebtInput) {
    const { debtType, housingLoan, otherDebt, ...debtData } = createDebtInput;

    // Create the parent debt record first
    const debt = await this.prisma.debt.create({
      data: {
        ...debtData,
        debtType,
      },
    });

    // Based on debtType, create the specific debt type record
    if (debtType === DebtTypeEnum.HOUSING_LOAN && housingLoan) {
      await this.prisma.housingLoan.create({
        data: {
          lenderName: housingLoan.lenderName || '',
          lenderId: housingLoan.lenderId || '',
          loanNumber: housingLoan.loanNumber || '',
          propertyAddress: housingLoan.propertyAddress || '',
          loanDate: housingLoan.loanDate || new Date(),
          annualPayments: housingLoan.annualPayments || 0,
          principalRepayment: housingLoan.principalRepayment || 0,
          interestExpenses: housingLoan.interestExpenses || 0,
          remainingBalance: housingLoan.remainingBalance || 0,
          loanTermYears: housingLoan.loanTermYears,
          debtId: debt.id,
        },
      });
    } else if (debtType === DebtTypeEnum.OTHER_DEBT && otherDebt) {
      await this.prisma.otherDebt.create({
        data: {
          debtType: otherDebt.debtType || '',
          debtIdentifier: otherDebt.debtIdentifier,
          creditorName: otherDebt.creditorName || '',
          interestExpenses: otherDebt.interestExpenses || 0,
          remainingBalance: otherDebt.remainingBalance || 0,
          debtId: debt.id,
        },
      });
    }

    return this.findOne(debt.id);
  }

  async findAll(
    params: { taxpayerId: string; taxYear: number },
    paginationInput?: PaginationInput,
  ) {
    const { taxpayerId, taxYear } = params;
    const filter = { taxpayerId, taxYear };

    if (!paginationInput) {
      const debts = await this.prisma.debt.findMany({
        where: filter,
        include: {
          housingLoan: true,
          otherDebt: true,
        },
        orderBy: { id: 'desc' },
      });

      return {
        data: debts,
        totalCount: debts.length,
        pageInfo: {
          hasNextPage: false,
          endCursor: debts.length > 0 ? String(debts[debts.length - 1].id) : '',
        },
      };
    }

    const { limit = 10, after, before } = paginationInput;

    // Configure cursor and pagination direction
    let cursor: any = undefined;
    let skip = 0;
    let take = limit;

    if (after) {
      cursor = { id: this.paginationService.decodeCursor(after) };
      skip = 1; // Skip the cursor item
    } else if (before) {
      cursor = { id: this.paginationService.decodeCursor(before) };
      skip = 1;
      take = -limit; // Take negative = take items before cursor
    }

    // Get data with pagination
    const debts = await this.prisma.debt.findMany({
      where: filter,
      include: {
        housingLoan: true,
        otherDebt: true,
      },
      cursor: cursor || undefined,
      skip: cursor ? skip : 0,
      take,
      orderBy: {
        id: before ? 'desc' : 'asc', // Reverse sort when paginating backwards
      },
    });

    // If we paginated backwards, we need to reverse the items to maintain the correct order
    const orderedDebts = before ? [...debts].reverse() : debts;

    // Get total count
    const totalCount = await this.prisma.debt.count({ where: filter });

    // Get page info for pagination
    const pageInfoBase = await this.paginationService.paginate('debt', {
      filter,
      paging: paginationInput,
    });

    const pageInfo = {
      ...pageInfoBase,
      startCursor:
        orderedDebts.length > 0
          ? this.paginationService.generateCursor(orderedDebts[0].id)
          : undefined,
      endCursor:
        orderedDebts.length > 0
          ? this.paginationService.generateCursor(
              orderedDebts[orderedDebts.length - 1].id,
            )
          : '',
    };

    return this.paginationService.createPaginationObject({
      data: orderedDebts,
      pageInfo,
      totalCount,
    });
  }

  async findOne(id: number) {
    return this.prisma.debt.findUnique({
      where: { id },
      include: {
        housingLoan: true,
        otherDebt: true,
      },
    });
  }

  async update(id: number, updateDebtInput: UpdateDebtInput) {
    const { debtType, housingLoan, otherDebt, ...debtData } = updateDebtInput;

    // Update the base debt
    const debt = await this.prisma.debt.update({
      where: { id },
      data: debtData,
    });

    // Update the specific debt type data
    if (debtType === DebtTypeEnum.HOUSING_LOAN && housingLoan) {
      if (housingLoan.id) {
        await this.prisma.housingLoan.update({
          where: { id: housingLoan.id },
          data: {
            ...housingLoan,
            debtId: debt.id,
          },
        });
      } else {
        await this.prisma.housingLoan.upsert({
          where: { debtId: debt.id },
          update: {
            lenderName: housingLoan.lenderName || '',
            lenderId: housingLoan.lenderId || '',
            loanNumber: housingLoan.loanNumber || '',
            propertyAddress: housingLoan.propertyAddress || '',
            loanDate: housingLoan.loanDate || new Date(),
            annualPayments: housingLoan.annualPayments || 0,
            principalRepayment: housingLoan.principalRepayment || 0,
            interestExpenses: housingLoan.interestExpenses || 0,
            remainingBalance: housingLoan.remainingBalance || 0,
            loanTermYears: housingLoan.loanTermYears,
          },
          create: {
            lenderName: housingLoan.lenderName || '',
            lenderId: housingLoan.lenderId || '',
            loanNumber: housingLoan.loanNumber || '',
            propertyAddress: housingLoan.propertyAddress || '',
            loanDate: housingLoan.loanDate || new Date(),
            annualPayments: housingLoan.annualPayments || 0,
            principalRepayment: housingLoan.principalRepayment || 0,
            interestExpenses: housingLoan.interestExpenses || 0,
            remainingBalance: housingLoan.remainingBalance || 0,
            loanTermYears: housingLoan.loanTermYears,
            debtId: debt.id,
          },
        });
      }
    } else if (debtType === DebtTypeEnum.OTHER_DEBT && otherDebt) {
      if (otherDebt.id) {
        await this.prisma.otherDebt.update({
          where: { id: otherDebt.id },
          data: {
            ...otherDebt,
            debtId: debt.id,
          },
        });
      } else {
        await this.prisma.otherDebt.upsert({
          where: { debtId: debt.id },
          update: {
            debtType: otherDebt.debtType || '',
            debtIdentifier: otherDebt.debtIdentifier,
            creditorName: otherDebt.creditorName || '',
            interestExpenses: otherDebt.interestExpenses || 0,
            remainingBalance: otherDebt.remainingBalance || 0,
          },
          create: {
            debtType: otherDebt.debtType || '',
            debtIdentifier: otherDebt.debtIdentifier,
            creditorName: otherDebt.creditorName || '',
            interestExpenses: otherDebt.interestExpenses || 0,
            remainingBalance: otherDebt.remainingBalance || 0,
            debtId: debt.id,
          },
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    // The cascade delete will automatically remove related housingLoan or otherDebt
    return this.prisma.debt.delete({
      where: { id },
    });
  }
}
