import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaxpayersRepository } from './taxpayers.repository';
import { CreateTaxpayerInput } from './dto/create-taxpayer.input';
import { UpdateTaxpayerInput } from './dto/update-taxpayer.input';

@Injectable()
export class TaxpayersService {
  constructor(private readonly taxpayersRepository: TaxpayersRepository) {}

  async createTaxpayer(createTaxpayerInput: CreateTaxpayerInput) {
    try {
      try {
        await this.taxpayersRepository.getOne({
          where: { id: createTaxpayerInput.id },
        });
        throw new HttpException(
          'Taxpayer with this ID already exists',
          HttpStatus.CONFLICT,
        );
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        // Taxpayer doesn't exist, continue with creation
      }

      return this.taxpayersRepository.createTaxpayer({
        ...createTaxpayerInput,
        email: createTaxpayerInput.email || null,
        phoneNumber: createTaxpayerInput.phoneNumber || null,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create taxpayer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTaxpayer(id: string) {
    try {
      return await this.taxpayersRepository.getOne({
        where: { id },
      });
    } catch {
      throw new HttpException('Taxpayer not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllTaxpayers(params?: {
    taxYear?: number;
    skip?: number;
    take?: number;
  }) {
    const { taxYear, skip = 0, take = 10 } = params || {};

    const where = taxYear ? { taxYear } : {};

    try {
      return await this.taxpayersRepository.getAll({
        where,
        skip,
        take,
        orderBy: { dateModified: 'desc' },
      });
    } catch {
      throw new HttpException(
        'Failed to retrieve taxpayers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTaxpayer(updateTaxpayerInput: UpdateTaxpayerInput) {
    try {
      // Check if taxpayer exists
      await this.getTaxpayer(updateTaxpayerInput.id);

      const { id, ...updateData } = updateTaxpayerInput;

      return await this.taxpayersRepository.updateTaxpayer(id, updateData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update taxpayer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTaxpayer(id: string) {
    try {
      // Check if taxpayer exists
      await this.getTaxpayer(id);

      return await this.taxpayersRepository.deleteTaxpayer(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete taxpayer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
