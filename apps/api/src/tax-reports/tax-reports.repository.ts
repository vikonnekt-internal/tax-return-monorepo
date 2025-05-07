import { Injectable } from '@nestjs/common';
import { DatabaseService, Prisma, TaxReturn, Taxpayer } from '@tax/database';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import PaginationService from '../common/pagination/pagination.service';
import { AssetTypeEnum } from '../assets/dto/asset-type.enum';
import { DebtTypeEnum } from '../debts/dto/debt-type.enum';

@Injectable()
export class TaxReportsRepository {
  constructor(
    private prisma: DatabaseService,
    private paginationService: PaginationService,
  ) {}

  async create(data: Prisma.TaxReturnUncheckedCreateInput) {
    // Create the tax return first
    const taxReturn = await this.prisma.taxReturn.create({
      data,
      include: {
        taxpayer: true,
      },
    });

    // Get government data for the taxpayer
    const govData = await this.prisma.taxpayer.findUnique({
      where: { id: taxReturn.taxpayerId },
      include: {
        govIncomeSources: true,
        govAssets: true,
        govDebts: true,
        govBenefits: true,
      },
    });

    // Add data from government sources to the tax return if available
    if (govData) {
      await this.addDataFromGovernment(taxReturn, govData);
    }

    // Return the tax return with relations
    return this.findOneWithRelations(taxReturn.id);
  }

  /**
   * Add data from government sources to a tax return
   * Only creates entries when government data is available for the taxpayer
   */
  private async addDataFromGovernment(
    taxReturn: TaxReturn & { taxpayer: Taxpayer },
    govData: Prisma.TaxpayerGetPayload<{
      include: {
        govIncomeSources: true;
        govAssets: true;
        govDebts: true;
        govBenefits: true;
      };
    }>,
  ) {
    // Process income sources
    if (govData?.govIncomeSources?.length > 0) {
      // Use government data if available
      for (const source of govData.govIncomeSources) {
        await this.prisma.incomeSource.create({
          data: {
            taxpayerId: taxReturn.taxpayerId,
            taxReturnId: taxReturn.id,
            sourceName: source.sourceName,
            sourceIdNumber: source.sourceIdNumber,
            incomeType: source.incomeType,
            amount: Number(source.amount),
            taxYear: taxReturn.taxYear,
          },
        });
      }
    }

    // Process assets
    if (govData?.govAssets?.length > 0) {
      // Use government data if available
      for (const govAsset of govData.govAssets as Array<
        Prisma.GovAssetGetPayload<{
          include: { govRealEstate: true; govVehicle: true };
        }>
      >) {
        const asset = await this.prisma.asset.create({
          data: {
            taxpayerId: taxReturn.taxpayerId,
            taxReturnId: taxReturn.id,
            assetType: govAsset.assetType,
            taxYear: taxReturn.taxYear,
          },
        });

        if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          govAsset.assetType === AssetTypeEnum.REAL_ESTATE &&
          govAsset.govRealEstate
        ) {
          await this.prisma.realEstate.create({
            data: {
              assetId: asset.id,
              propertyId: govAsset.govRealEstate.propertyId,
              address: govAsset.govRealEstate.address,
              propertyValue: Number(govAsset.govRealEstate.propertyValue),
              purchaseYear: govAsset.govRealEstate.purchaseYear,
            },
          });
        } else if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          govAsset.assetType === AssetTypeEnum.VEHICLE &&
          govAsset.govVehicle
        ) {
          await this.prisma.vehicle.create({
            data: {
              assetId: asset.id,
              registrationNumber: govAsset.govVehicle.registrationNumber,
              purchaseYear: govAsset.govVehicle.purchaseYear,
              purchasePrice: Number(govAsset.govVehicle.purchasePrice),
            },
          });
        }
      }
    }

    // Process debts
    if (govData?.govDebts?.length > 0) {
      // Use government data if available
      for (const govDebt of govData.govDebts as Array<
        Prisma.GovDebtGetPayload<{
          include: { govHousingLoan: true; govOtherDebt: true };
        }>
      >) {
        const debt = await this.prisma.debt.create({
          data: {
            taxpayerId: taxReturn.taxpayerId,
            taxReturnId: taxReturn.id,
            debtType: govDebt.debtType,
            taxYear: taxReturn.taxYear,
          },
        });

        if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          govDebt.debtType === DebtTypeEnum.HOUSING_LOAN &&
          govDebt.govHousingLoan
        ) {
          await this.prisma.housingLoan.create({
            data: {
              debtId: debt.id,
              lenderName: govDebt.govHousingLoan.lenderName,
              lenderId: govDebt.govHousingLoan.lenderId,
              loanNumber: govDebt.govHousingLoan.loanNumber,
              propertyAddress: govDebt.govHousingLoan.propertyAddress,
              loanTermYears: govDebt.govHousingLoan.loanTermYears,
              loanDate: new Date(),
              annualPayments: Number(govDebt.govHousingLoan.annualPayments),
              principalRepayment: Number(
                govDebt.govHousingLoan.principalRepayment,
              ),
              interestExpenses: Number(govDebt.govHousingLoan.interestExpenses),
              remainingBalance: Number(govDebt.govHousingLoan.remainingBalance),
            },
          });
        } else if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          govDebt.debtType === DebtTypeEnum.OTHER_DEBT &&
          govDebt.govOtherDebt
        ) {
          await this.prisma.otherDebt.create({
            data: {
              debtId: debt.id,
              debtType: govDebt.govOtherDebt.debtType,
              debtIdentifier: govDebt.govOtherDebt.debtIdentifier,
              creditorName: govDebt.govOtherDebt.creditorName,
              interestExpenses: Number(govDebt.govOtherDebt.interestExpenses),
              remainingBalance: Number(govDebt.govOtherDebt.remainingBalance),
            },
          });
        }
      }
    }

    // Process benefits
    if (govData?.govBenefits?.length > 0) {
      // Use government data if available
      for (const benefit of govData.govBenefits) {
        await this.prisma.benefit.create({
          data: {
            taxpayerId: taxReturn.taxpayerId,
            taxReturnId: taxReturn.id,
            providerName: benefit.providerName,
            benefitType: benefit.benefitType,
            amount: Number(benefit.amount),
            taxYear: taxReturn.taxYear,
          },
        });
      }
    }
  }

  async findAll(
    paginationInput?: PaginationInput,
    filter: Prisma.TaxReturnWhereInput = {},
  ) {
    const { limit = 10, after, before } = paginationInput || {};

    // Configure cursor and pagination direction
    let cursor: Prisma.TaxReturnWhereUniqueInput | undefined = undefined;
    let skip = 0;
    let take = limit;

    if (after) {
      cursor = { id: this.paginationService.decodeCursor(after) as number };
      skip = 1; // Skip the cursor item
    } else if (before) {
      cursor = { id: this.paginationService.decodeCursor(before) as number };
      skip = 1;
      take = -limit; // Take negative = take items before cursor
    }

    // Get data with pagination
    const items = await this.prisma.taxReturn.findMany({
      where: filter,
      cursor: cursor || undefined,
      skip: cursor ? skip : 0,
      take,
      include: {
        taxpayer: true,
      },
      orderBy: {
        id: before ? 'desc' : 'asc', // Reverse sort when paginating backwards
      },
    });

    // If we paginated backwards, we need to reverse the items to maintain the correct order
    const orderedItems = before ? [...items].reverse() : items;

    return orderedItems;
  }

  async findAllByTaxpayerId(
    taxpayerId: string,
    paginationInput?: PaginationInput,
    userId?: number,
  ) {
    const { limit = 10, after, before } = paginationInput || {};

    // Add user ID to filter if provided for security
    const filter = { taxpayerId, ...(userId ? { userId } : {}) };

    // Configure cursor and pagination direction
    let cursor: Prisma.TaxReturnWhereUniqueInput | undefined = undefined;
    let skip = 0;
    let take = limit;

    if (after) {
      cursor = { id: this.paginationService.decodeCursor(after) as number };
      skip = 1; // Skip the cursor item
    } else if (before) {
      cursor = { id: this.paginationService.decodeCursor(before) as number };
      skip = 1;
      take = -limit; // Take negative = take items before cursor
    }

    // Get data with pagination
    const items = await this.prisma.taxReturn.findMany({
      where: filter,
      cursor: cursor || undefined,
      skip: cursor ? skip : 0,
      take,
      include: {
        taxpayer: true,
      },
      orderBy: {
        id: before ? 'desc' : 'asc', // Reverse sort when paginating backwards
      },
    });

    // If we paginated backwards, we need to reverse the items to maintain the correct order
    const orderedItems = before ? [...items].reverse() : items;

    return orderedItems;
  }

  async findOne(id: number, taxpayerId?: string) {
    return this.prisma.taxReturn.findUnique({
      where: {
        id,
        ...(taxpayerId ? { taxpayerId } : {}),
      },
      include: {
        taxpayer: true,
      },
    });
  }

  async findOneWithRelations(id: number, taxpayerId?: string) {
    return this.prisma.taxReturn.findUnique({
      where: {
        id,
        ...(taxpayerId ? { taxpayerId } : {}),
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

  async update(
    id: number,
    updateTaxReportDto: UpdateTaxReportDto,
    taxpayerId?: string,
  ) {
    return this.prisma.taxReturn.update({
      where: {
        id,
        ...(taxpayerId ? { taxpayerId } : {}),
      },
      data: {
        ...updateTaxReportDto,
      },
      include: {
        taxpayer: true,
      },
    });
  }

  async remove(id: number, taxpayerId?: string) {
    return this.prisma.taxReturn.delete({
      where: {
        id,
        ...(taxpayerId ? { taxpayerId } : {}),
      },
    });
  }
}
