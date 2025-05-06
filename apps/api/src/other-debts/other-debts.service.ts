import { Injectable } from '@nestjs/common';
import { OtherDebtsRepository } from './other-debts.repository';
import { CreateOtherDebtInput } from './dto/create-other-debt.input';
import { UpdateOtherDebtInput } from './dto/update-other-debt.input';
import { OtherDebt } from './other-debts.type';

@Injectable()
export class OtherDebtsService {
  constructor(private readonly otherDebtsRepository: OtherDebtsRepository) {}

  async create(createOtherDebtInput: CreateOtherDebtInput) {
    return this.otherDebtsRepository.createOtherDebt(createOtherDebtInput);
  }

  async findAll(taxpayerId: string, taxYear: number) {
    return this.otherDebtsRepository.getAll({
      where: { taxpayerId, taxYear },
    });
  }

  async findOne(id: number) {
    return this.otherDebtsRepository.getOne({ where: { id } });
  }

  async update(id: number, updateOtherDebtInput: UpdateOtherDebtInput) {
    return this.otherDebtsRepository.updateOtherDebt(id, updateOtherDebtInput);
  }

  async remove(id: number) {
    return this.otherDebtsRepository.deleteOtherDebt(id);
  }
}
