import { Injectable } from '@nestjs/common';
import { DebtsRepository } from './debts.repository';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';

@Injectable()
export class DebtsService {
  constructor(private readonly debtsRepository: DebtsRepository) {}

  create(createDebtInput: CreateDebtInput) {
    return this.debtsRepository.create(createDebtInput);
  }

  findAll(taxpayerId: string, taxYear: number) {
    return this.debtsRepository.findAll({ taxpayerId, taxYear });
  }

  findOne(id: number) {
    return this.debtsRepository.findOne(id);
  }

  update(id: number, updateDebtInput: UpdateDebtInput) {
    return this.debtsRepository.update(id, updateDebtInput);
  }

  remove(id: number) {
    return this.debtsRepository.remove(id);
  }
}
