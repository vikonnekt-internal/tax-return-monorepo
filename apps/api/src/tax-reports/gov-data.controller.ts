import {
  Controller,
  Post,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiSecurity,
  ApiBody,
} from '@nestjs/swagger';
import { DatabaseService } from '@tax/database';
import { UpdateGovDataDto } from './dto/update-gov-data.dto';
import { ConfigService } from '@nestjs/config';

/**
 * Custom guard for API key validation
 */
@UseGuards(
  class ApiKeyGuard {
    constructor(private configService: ConfigService) {}

    async canActivate(context) {
      const req = context.switchToHttp().getRequest();
      const apiKey = req.body.apiKey;

      // Get allowed API keys from environment variables
      const allowedApiKeys =
        this.configService.get<string>('GOV_API_KEYS')?.split(',') || [];

      return allowedApiKeys.includes(apiKey);
    }
  },
)
@ApiTags('government-data')
@ApiSecurity('api-key')
@Controller('government-data')
export class GovDataController {
  private readonly logger = new Logger(GovDataController.name);

  constructor(
    private readonly prisma: DatabaseService,
    private configService: ConfigService,
  ) {}

  @Post('taxpayer/:taxpayerId')
  @ApiOperation({ summary: 'Update government data for a taxpayer' })
  @ApiParam({
    name: 'taxpayerId',
    description: 'The ID of the taxpayer to update',
    example: 'TP123456789',
    required: true,
  })
  @ApiBody({ type: UpdateGovDataDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Government data has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data or taxpayer ID.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Taxpayer not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid API key.',
  })
  async updateGovData(
    @Param('taxpayerId') taxpayerId: string,
    @Body() updateGovDataDto: UpdateGovDataDto,
  ) {
    try {
      // Check if taxpayer exists
      const taxpayer = await this.prisma.taxpayer.findUnique({
        where: { id: taxpayerId },
      });

      if (!taxpayer) {
        this.logger.error(`Taxpayer not found: ${taxpayerId}`);
        throw new NotFoundException(`Taxpayer with ID ${taxpayerId} not found`);
      }

      // Process income sources
      if (updateGovDataDto.incomeSources?.length) {
        // Delete existing income sources for the tax year if present in update
        const taxYears = new Set(
          updateGovDataDto.incomeSources.map((source) => source.taxYear),
        );

        if (taxYears.size > 0) {
          await this.prisma.govIncomeSource.deleteMany({
            where: {
              taxpayerId,
              taxYear: { in: Array.from(taxYears) },
            },
          });
        }

        // Create new income sources
        await this.prisma.govIncomeSource.createMany({
          data: updateGovDataDto.incomeSources.map((source) => ({
            taxpayerId,
            sourceName: source.sourceName,
            sourceIdNumber: source.sourceIdNumber,
            incomeType: source.incomeType,
            amount: source.amount,
            isActive: source.isActive,
            taxYear: source.taxYear,
          })),
        });
      }

      // Process assets
      if (updateGovDataDto.assets?.length) {
        // Delete existing assets for the tax year if present in update
        const taxYears = new Set(
          updateGovDataDto.assets.map((asset) => asset.taxYear),
        );

        if (taxYears.size > 0) {
          await this.prisma.govAsset.deleteMany({
            where: {
              taxpayerId,
              taxYear: { in: Array.from(taxYears) },
            },
          });
        }

        // Create new assets
        for (const asset of updateGovDataDto.assets) {
          const createdAsset = await this.prisma.govAsset.create({
            data: {
              taxpayerId,
              assetType: asset.assetType,
              isActive: asset.isActive,
              taxYear: asset.taxYear,
            },
          });

          // Create real estate if present
          if (asset.assetType === 'real_estate' && asset.govRealEstate) {
            await this.prisma.govRealEstate.create({
              data: {
                assetId: createdAsset.id,
                propertyId: asset.govRealEstate.propertyId,
                address: asset.govRealEstate.address,
                propertyValue: asset.govRealEstate.propertyValue,
                purchaseYear: asset.govRealEstate.purchaseYear,
              },
            });
          }

          // Create vehicle if present
          if (asset.assetType === 'vehicle' && asset.govVehicle) {
            await this.prisma.govVehicle.create({
              data: {
                assetId: createdAsset.id,
                registrationNumber: asset.govVehicle.registrationNumber,
                purchaseYear: asset.govVehicle.purchaseYear,
                purchasePrice: asset.govVehicle.purchasePrice,
              },
            });
          }
        }
      }

      // Process debts
      if (updateGovDataDto.debts?.length) {
        // Delete existing debts for the tax year if present in update
        const taxYears = new Set(
          updateGovDataDto.debts.map((debt) => debt.taxYear),
        );

        if (taxYears.size > 0) {
          await this.prisma.govDebt.deleteMany({
            where: {
              taxpayerId,
              taxYear: { in: Array.from(taxYears) },
            },
          });
        }

        // Create new debts
        for (const debt of updateGovDataDto.debts) {
          const createdDebt = await this.prisma.govDebt.create({
            data: {
              taxpayerId,
              debtType: debt.debtType,
              isActive: debt.isActive,
              taxYear: debt.taxYear,
            },
          });

          // Create housing loan if present
          if (debt.debtType === 'housing_loan' && debt.govHousingLoan) {
            await this.prisma.govHousingLoan.create({
              data: {
                debtId: createdDebt.id,
                lenderName: debt.govHousingLoan.lenderName,
                lenderId: debt.govHousingLoan.lenderId,
                loanNumber: debt.govHousingLoan.loanNumber,
                propertyAddress: debt.govHousingLoan.propertyAddress,
                loanTermYears: debt.govHousingLoan.loanTermYears,
                annualPayments: debt.govHousingLoan.annualPayments,
                principalRepayment: debt.govHousingLoan.principalRepayment,
                interestExpenses: debt.govHousingLoan.interestExpenses,
                remainingBalance: debt.govHousingLoan.remainingBalance,
              },
            });
          }

          // Create other debt if present
          if (debt.debtType === 'other_debt' && debt.govOtherDebt) {
            await this.prisma.govOtherDebt.create({
              data: {
                debtId: createdDebt.id,
                debtType: debt.govOtherDebt.debtType,
                debtIdentifier: debt.govOtherDebt.debtIdentifier,
                creditorName: debt.govOtherDebt.creditorName,
                interestExpenses: debt.govOtherDebt.interestExpenses,
                remainingBalance: debt.govOtherDebt.remainingBalance,
              },
            });
          }
        }
      }

      // Process benefits
      if (updateGovDataDto.benefits?.length) {
        // Delete existing benefits for the tax year if present in update
        const taxYears = new Set(
          updateGovDataDto.benefits.map((benefit) => benefit.taxYear),
        );

        if (taxYears.size > 0) {
          await this.prisma.govBenefit.deleteMany({
            where: {
              taxpayerId,
              taxYear: { in: Array.from(taxYears) },
            },
          });
        }

        // Create new benefits
        await this.prisma.govBenefit.createMany({
          data: updateGovDataDto.benefits.map((benefit) => ({
            taxpayerId,
            providerName: benefit.providerName,
            benefitType: benefit.benefitType,
            amount: benefit.amount,
            isActive: benefit.isActive,
            taxYear: benefit.taxYear,
          })),
        });
      }

      // Log the data source and update time
      this.logger.log(
        `Government data updated for taxpayer ${taxpayerId} from source: ${updateGovDataDto.dataSource}`,
      );

      return {
        message: `Government data for taxpayer ${taxpayerId} has been successfully updated`,
        updatedAt: new Date(),
        dataSource: updateGovDataDto.dataSource,
        data: {
          incomeSources: updateGovDataDto.incomeSources?.length || 0,
          assets: updateGovDataDto.assets?.length || 0,
          debts: updateGovDataDto.debts?.length || 0,
          benefits: updateGovDataDto.benefits?.length || 0,
        },
      };
    } catch (error) {
      this.logger.error(
        `Error updating government data: ${error.message}`,
        error.stack,
      );

      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new BadRequestException(
        `Failed to update government data: ${error.message}`,
      );
    }
  }
}
