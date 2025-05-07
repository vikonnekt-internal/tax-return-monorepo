import { Injectable, NotFoundException } from '@nestjs/common';
import { BenefitsRepository } from './benefits.repository';
import { CreateBenefitInput } from './dto/create-benefit.input';
import { UpdateBenefitInput } from './dto/update-benefit.input';
import { PaginationInput } from '../common/pagination/pagination.input';

@Injectable()
export class BenefitsService {
  constructor(private readonly benefitsRepository: BenefitsRepository) {}

  async create(createBenefitInput: CreateBenefitInput) {
    return this.benefitsRepository.create(createBenefitInput);
  }

  async findAll(
    taxpayerId: string,
    taxYear: number,
    paginationInput?: PaginationInput,
  ) {
    return this.benefitsRepository.findAll(
      { taxpayerId, taxYear },
      paginationInput,
    );
  }

  async findOne(id: number, taxpayerId: string) {
    const benefit = await this.benefitsRepository.findOne(id);

    if (!benefit || benefit.taxpayerId !== taxpayerId) {
      throw new NotFoundException(
        `Benefit with ID ${id} not found for this user`,
      );
    }

    return benefit;
  }

  async update(
    id: number,
    updateBenefitInput: UpdateBenefitInput,
    taxpayerId: string,
  ) {
    // Verify the benefit belongs to the user
    await this.findOne(id, taxpayerId);

    return this.benefitsRepository.update(id, updateBenefitInput);
  }

  async remove(id: number, taxpayerId: string) {
    // Verify the benefit belongs to the user
    await this.findOne(id, taxpayerId);

    return this.benefitsRepository.remove(id);
  }
}
