import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HousingLoansRepository } from './housing-loans.repository';
import { CreateHousingLoanInput } from './dto/create-housing-loan.input';
import { UpdateHousingLoanInput } from './dto/update-housing-loan.input';
import { Prisma, HousingLoan, Debt } from '@tax/database';

@Injectable()
export class HousingLoansService {
  constructor(
    private readonly housingLoansRepository: HousingLoansRepository,
  ) {}

  async createHousingLoan(
    createHousingLoanInput: CreateHousingLoanInput,
  ): Promise<HousingLoan> {
    try {
      return await this.housingLoansRepository.createHousingLoan(
        createHousingLoanInput,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to create housing loan: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHousingLoan(id: number): Promise<HousingLoan> {
    try {
      return await this.housingLoansRepository.getOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Housing loan not found: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getHousingLoansByTaxpayer(
    taxpayerId: string,
    taxYear?: number,
  ): Promise<HousingLoan[]> {
    try {
      let where: Prisma.HousingLoanWhereInput = {
        debt: {
          taxpayerId,
        },
      };

      if (taxYear !== undefined) {
        where = {
          debt: {
            taxpayerId,
            taxYear,
          },
        };
      }

      return await this.housingLoansRepository.getAll({
        where,
        orderBy: { id: 'desc' },
      });
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve housing loans: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllHousingLoans(params?: {
    taxYear?: number;
    skip?: number;
    take?: number;
  }): Promise<HousingLoan[]> {
    const { taxYear, skip = 0, take = 10 } = params || {};

    let where: Prisma.HousingLoanWhereInput = {};
    if (taxYear !== undefined) {
      where = {
        debt: {
          taxYear,
        },
      };
    }

    try {
      return await this.housingLoansRepository.getAll({
        where,
        skip,
        take,
        orderBy: { id: 'desc' },
      });
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve housing loans: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateHousingLoan(
    updateHousingLoanInput: UpdateHousingLoanInput,
  ): Promise<HousingLoan> {
    try {
      // Check if housing loan exists
      await this.getHousingLoan(updateHousingLoanInput.id);

      const { id, ...updateData } = updateHousingLoanInput;

      return await this.housingLoansRepository.updateHousingLoan(
        id,
        updateData,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to update housing loan: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteHousingLoan(id: number): Promise<Debt> {
    try {
      // Check if housing loan exists
      await this.getHousingLoan(id);

      return await this.housingLoansRepository.deleteHousingLoan(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to delete housing loan: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
