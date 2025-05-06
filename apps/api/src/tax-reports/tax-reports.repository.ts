import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { CreateTaxReportDto } from './dto/create-tax-report.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';

@Injectable()
export class TaxReportsRepository {
  constructor(private prisma: DatabaseService) {}

  async create(createTaxReportDto: CreateTaxReportDto) {
    return this.prisma.taxReturn.create({
      data: {
        ...createTaxReportDto,
      },
      include: {
        taxpayer: true,
      },
    });
  }

  async findAll() {
    return this.prisma.taxReturn.findMany({
      include: {
        taxpayer: true,
      },
    });
  }

  async findAllByTaxpayerId(taxpayerId: string) {
    return this.prisma.taxReturn.findMany({
      where: {
        taxpayerId,
      },
      include: {
        taxpayer: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.taxReturn.findUnique({
      where: {
        id,
      },
      include: {
        taxpayer: true,
      },
    });
  }

  async findOneWithRelations(id: number) {
    return this.prisma.taxReturn.findUnique({
      where: {
        id,
      },
      include: {
        taxpayer: true,
        incomeSources: true,
        assets: {
          include: {
            realEstate: true,
            vehicle: true,
          },
        },
        debts: {
          include: {
            housingLoan: true,
            otherDebt: true,
          },
        },
        benefits: true,
      },
    });
  }

  async update(id: number, updateTaxReportDto: UpdateTaxReportDto) {
    return this.prisma.taxReturn.update({
      where: {
        id,
      },
      data: {
        ...updateTaxReportDto,
      },
      include: {
        taxpayer: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.taxReturn.delete({
      where: {
        id,
      },
    });
  }
}
