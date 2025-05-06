import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';

@Injectable()
export class DebtsRepository {
  constructor(private readonly prisma: DatabaseService) {}

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
    if (debtType === 'housing_loan' && housingLoan) {
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
    } else if (debtType === 'other_debt' && otherDebt) {
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

  async findAll(params: { taxpayerId: string; taxYear: number }) {
    const { taxpayerId, taxYear } = params;
    return this.prisma.debt.findMany({
      where: {
        taxpayerId,
        taxYear,
      },
      include: {
        housingLoan: true,
        otherDebt: true,
      },
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
    if (debtType === 'housing_loan' && housingLoan) {
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
    } else if (debtType === 'other_debt' && otherDebt) {
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
