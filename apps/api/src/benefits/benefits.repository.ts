import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { CreateBenefitInput } from './dto/create-benefit.input';
import { UpdateBenefitInput } from './dto/update-benefit.input';

@Injectable()
export class BenefitsRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createBenefitInput: CreateBenefitInput) {
    return this.prisma.benefit.create({
      data: createBenefitInput,
    });
  }

  async findAll(params: { taxpayerId: string; taxYear: number }) {
    const { taxpayerId, taxYear } = params;
    return this.prisma.benefit.findMany({
      where: {
        taxpayerId,
        taxYear,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.benefit.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBenefitInput: UpdateBenefitInput) {
    const { id: _, ...data } = updateBenefitInput;
    return this.prisma.benefit.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.benefit.delete({
      where: { id },
    });
  }
}
