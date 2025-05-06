import { Injectable } from '@nestjs/common';
import { DatabaseService, Prisma, HousingLoan, Debt } from '@tax/database';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class HousingLoansRepository {
  constructor(private prisma: DatabaseService) {}

  async getOne(params: {
    where: Prisma.HousingLoanWhereInput;
    select?: Prisma.HousingLoanSelect;
  }): Promise<HousingLoan> {
    const housingLoan = await this.prisma.housingLoan.findFirst({
      where: params.where,
      select: params.select,
    });

    if (!housingLoan) throw new Error('Housing loan not found');
    return housingLoan;
  }

  async getAll(params: {
    where?: Prisma.HousingLoanWhereInput;
    orderBy?: Prisma.HousingLoanOrderByWithRelationInput;
    take?: number;
    skip?: number;
  }): Promise<HousingLoan[]> {
    return await this.prisma.housingLoan.findMany({
      ...params,
    });
  }

  async createHousingLoan(data: {
    taxpayerId: string;
    lenderName: string;
    lenderId?: string;
    loanNumber: string;
    propertyAddress: string;
    loanDate: Date | string;
    loanTermYears?: number;
    annualPayments: number;
    principalRepayment: number;
    interestExpenses: number;
    remainingBalance: number;
    taxYear: number;
    taxReturnId?: number;
  }): Promise<HousingLoan> {
    // First create a Debt entry
    const debt = await this.prisma.debt.create({
      data: {
        taxpayerId: data.taxpayerId,
        debtType: 'housing_loan',
        taxYear: data.taxYear,
        taxReturnId: data.taxReturnId,
      },
    });

    // Then create the HousingLoan with the debtId
    return await this.prisma.housingLoan.create({
      data: {
        debtId: debt.id,
        lenderName: data.lenderName,
        lenderId: data.lenderId,
        loanNumber: data.loanNumber,
        propertyAddress: data.propertyAddress,
        loanDate: new Date(data.loanDate),
        loanTermYears: data.loanTermYears,
        annualPayments: new Decimal(data.annualPayments.toString()),
        principalRepayment: new Decimal(data.principalRepayment.toString()),
        interestExpenses: new Decimal(data.interestExpenses.toString()),
        remainingBalance: new Decimal(data.remainingBalance.toString()),
      },
    });
  }

  async updateHousingLoan(
    id: number,
    data: Partial<{
      lenderName: string;
      lenderId: string;
      loanNumber: string;
      propertyAddress: string;
      loanDate: Date | string;
      loanTermYears: number;
      annualPayments: number;
      principalRepayment: number;
      interestExpenses: number;
      remainingBalance: number;
      taxYear: number;
      taxReturnId?: number;
    }>,
  ): Promise<HousingLoan> {
    // Prepare the update data
    const updateData: Prisma.HousingLoanUpdateInput = {};

    // Map string values directly
    if (data.lenderName) updateData.lenderName = data.lenderName;
    if (data.lenderId) updateData.lenderId = data.lenderId;
    if (data.loanNumber) updateData.loanNumber = data.loanNumber;
    if (data.propertyAddress) updateData.propertyAddress = data.propertyAddress;

    // Convert date string to Date object
    if (data.loanDate) {
      updateData.loanDate = new Date(data.loanDate);
    }

    // Convert numeric values to Decimal where needed
    if (data.loanTermYears !== undefined)
      updateData.loanTermYears = data.loanTermYears;
    if (data.annualPayments !== undefined)
      updateData.annualPayments = new Decimal(data.annualPayments.toString());
    if (data.principalRepayment !== undefined)
      updateData.principalRepayment = new Decimal(
        data.principalRepayment.toString(),
      );
    if (data.interestExpenses !== undefined)
      updateData.interestExpenses = new Decimal(
        data.interestExpenses.toString(),
      );
    if (data.remainingBalance !== undefined)
      updateData.remainingBalance = new Decimal(
        data.remainingBalance.toString(),
      );

    // Handle tax year updates for the debt record if needed
    if (data.taxYear !== undefined || data.taxReturnId !== undefined) {
      const housingLoan = await this.prisma.housingLoan.findUnique({
        where: { id },
        select: { debtId: true },
      });

      if (housingLoan) {
        const debtUpdate: Prisma.DebtUpdateInput = {};
        if (data.taxYear !== undefined) debtUpdate.taxYear = data.taxYear;
        if (data.taxReturnId !== undefined) {
          debtUpdate.taxReturn = data.taxReturnId
            ? { connect: { id: data.taxReturnId } }
            : { disconnect: true };
        }

        await this.prisma.debt.update({
          where: { id: housingLoan.debtId },
          data: debtUpdate,
        });
      }
    }

    return await this.prisma.housingLoan.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteHousingLoan(id: number): Promise<Debt> {
    // Find the housing loan to get the associated debt ID
    const housingLoan = await this.prisma.housingLoan.findUnique({
      where: { id },
      select: { debtId: true },
    });

    if (!housingLoan) {
      throw new Error('Housing loan not found');
    }

    // Delete the housing loan record
    await this.prisma.housingLoan.delete({
      where: { id },
    });

    // Also delete the associated debt record
    return await this.prisma.debt.delete({
      where: { id: housingLoan.debtId },
    });
  }
}
