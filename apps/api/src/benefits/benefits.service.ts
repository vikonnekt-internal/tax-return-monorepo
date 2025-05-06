import { Injectable } from '@nestjs/common';
import { BenefitsRepository } from './benefits.repository';
import { CreateBenefitInput } from './dto/create-benefit.input';
import { UpdateBenefitInput } from './dto/update-benefit.input';

@Injectable()
export class BenefitsService {
  constructor(private readonly benefitsRepository: BenefitsRepository) {}

  async create(createBenefitInput: CreateBenefitInput) {
    return this.benefitsRepository.create(createBenefitInput);
  }

  async findAll(taxpayerId: string, taxYear: number) {
    return this.benefitsRepository.findAll({ taxpayerId, taxYear });
  }

  async findOne(id: number) {
    return this.benefitsRepository.findOne(id);
  }

  async update(id: number, updateBenefitInput: UpdateBenefitInput) {
    return this.benefitsRepository.update(id, updateBenefitInput);
  }

  async remove(id: number) {
    return this.benefitsRepository.remove(id);
  }
}
