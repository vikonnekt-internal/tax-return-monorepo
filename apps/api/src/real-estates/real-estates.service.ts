import { Injectable } from '@nestjs/common';
import { RealEstatesRepository } from './real-estates.repository';
import { CreateRealEstateInput } from './dto/create-real-estate.input';
import { UpdateRealEstateInput } from './dto/update-real-estate.input';

@Injectable()
export class RealEstatesService {
  constructor(private readonly realEstatesRepository: RealEstatesRepository) {}

  async create(createRealEstateInput: CreateRealEstateInput) {
    return this.realEstatesRepository.create(createRealEstateInput);
  }

  async findAll(taxpayerId: string, taxYear: number) {
    return this.realEstatesRepository.findAll({ taxpayerId, taxYear });
  }

  async findOne(id: string) {
    return this.realEstatesRepository.findOne(id);
  }

  async update(id: string, updateRealEstateInput: UpdateRealEstateInput) {
    return this.realEstatesRepository.update(id, updateRealEstateInput);
  }

  async remove(id: string) {
    return this.realEstatesRepository.remove(id);
  }
}
