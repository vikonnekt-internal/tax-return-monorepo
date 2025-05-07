import { Injectable, NotFoundException } from '@nestjs/common';
import { DebtsRepository } from './debts.repository';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import { DatabaseService } from '@tax/database';

@Injectable()
export class DebtsService {
  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly prisma: DatabaseService,
  ) {}

  async create(createDebtInput: CreateDebtInput) {
    return this.debtsRepository.create(createDebtInput);
  }

  async findAll(
    taxpayerId: string,
    taxYear: number,
    paginationInput?: PaginationInput,
  ) {
    return this.debtsRepository.findAll(
      { taxpayerId, taxYear },
      paginationInput,
    );
  }

  async findOne(id: number, taxpayerId: string) {
    const debt = await this.debtsRepository.findOne(id);

    if (!debt || debt.taxpayerId !== taxpayerId) {
      throw new NotFoundException(`Debt with ID ${id} not found for this user`);
    }

    return debt;
  }

  async update(
    id: number,
    updateDebtInput: UpdateDebtInput,
    taxpayerId: string,
  ) {
    // Verify the debt belongs to the user
    await this.findOne(id, taxpayerId);

    return this.debtsRepository.update(id, updateDebtInput);
  }

  async remove(id: number, taxpayerId: string) {
    // Verify the debt belongs to the user
    await this.findOne(id, taxpayerId);

    return this.debtsRepository.remove(id);
  }

  async getHousingLoan(debtId: number) {
    return this.prisma.housingLoan.findUnique({
      where: { debtId },
    });
  }

  async getOtherDebt(debtId: number) {
    return this.prisma.otherDebt.findUnique({
      where: { debtId },
    });
  }
}
