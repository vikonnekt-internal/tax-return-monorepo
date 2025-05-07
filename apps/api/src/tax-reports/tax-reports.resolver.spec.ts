import { Test, TestingModule } from '@nestjs/testing';
import { TaxReportsResolver } from './tax-reports.resolver';
import { TaxReportsService } from './tax-reports.service';
import { PaginationInput } from '../common/pagination/pagination.input';
import { CreateTaxReportInput } from './dto/create-tax-report.input';
import { UpdateTaxReportInput } from './dto/update-tax-report.input';
import { TaxReportType } from './tax-reports.type';

// Mock imports
jest.mock('../auth/current-user.decorator', () => ({
  CurrentUser: () => jest.fn(),
}));

jest.mock('../auth/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

jest.mock('../auth/role.guard', () => ({
  RolesGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

jest.mock('../auth/role.decorator', () => ({
  Roles: (...roles: string[]) => jest.fn(),
}));

// Mock any imported types needed by TaxReportsResolver
jest.mock('../income-sources/income-sources.type', () => ({
  IncomeSource: class MockIncomeSource {},
}));

jest.mock('../assets/assets.type', () => ({
  Asset: class MockAsset {},
}));

jest.mock('../debts/debts.type', () => ({
  Debt: class MockDebt {},
}));

jest.mock('../benefits/benefits.type', () => ({
  Benefit: class MockBenefit {},
}));

describe('TaxReportsResolver', () => {
  let resolver: TaxReportsResolver;

  const mockTaxReportsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneWithRelations: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser = {
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    taxpayerId: 'TP123',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxReportsResolver,
        {
          provide: TaxReportsService,
          useValue: mockTaxReportsService,
        },
      ],
    }).compile();

    resolver = module.get<TaxReportsResolver>(TaxReportsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createTaxReport', () => {
    it('should call service create with correct parameters', async () => {
      const createTaxReportInput: CreateTaxReportInput = {
        taxYear: 2023,
        status: 'draft',
      };

      const expectedResult = {
        id: 1,
        taxYear: 2023,
        status: 'draft',
        userId: mockUser.id,
        taxpayerId: mockUser.taxpayerId,
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      mockTaxReportsService.create.mockResolvedValue(expectedResult);

      const result = await resolver.createTaxReport(
        createTaxReportInput,
        mockUser,
      );

      expect(mockTaxReportsService.create).toHaveBeenCalledWith(
        {
          ...createTaxReportInput,
          status: 'draft',
        },
        mockUser.id,
        mockUser.taxpayerId,
      );

      expect(result).toEqual(expectedResult);
    });

    it('should preserve status if provided in input', async () => {
      const createTaxReportInput: CreateTaxReportInput = {
        taxYear: 2023,
        status: 'submitted',
      };

      const expectedResult = {
        id: 1,
        taxYear: 2023,
        status: 'submitted',
        userId: mockUser.id,
        taxpayerId: mockUser.taxpayerId,
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      mockTaxReportsService.create.mockResolvedValue(expectedResult);

      const result = await resolver.createTaxReport(
        createTaxReportInput,
        mockUser,
      );

      expect(mockTaxReportsService.create).toHaveBeenCalledWith(
        createTaxReportInput,
        mockUser.id,
        mockUser.taxpayerId,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call service findAll with correct parameters', async () => {
      const paginationInput: PaginationInput = { limit: 10 };
      const expectedResult = {
        data: [
          {
            id: 1,
            taxYear: 2023,
            taxpayerId: mockUser.taxpayerId,
            status: 'draft',
            dateCreated: new Date(),
            dateModified: new Date(),
          },
        ],
        pageInfo: {},
        totalCount: 1,
      };

      mockTaxReportsService.findAll.mockResolvedValue(expectedResult);

      const result = await resolver.findAll(paginationInput, mockUser);

      expect(mockTaxReportsService.findAll).toHaveBeenCalledWith(
        paginationInput,
        mockUser.taxpayerId,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call service findOne with correct parameters', async () => {
      const id = 1;
      const expectedResult = {
        id: 1,
        taxYear: 2023,
        taxpayerId: mockUser.taxpayerId,
        status: 'draft',
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      mockTaxReportsService.findOne.mockResolvedValue(expectedResult);

      const result = await resolver.findOne(id, mockUser);

      expect(mockTaxReportsService.findOne).toHaveBeenCalledWith(
        id,
        mockUser.taxpayerId,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOneDetailed', () => {
    it('should call service findOneWithRelations with correct parameters', async () => {
      const id = 1;
      const expectedResult: Partial<TaxReportType> = {
        id: 1,
        taxYear: 2023,
        taxpayerId: mockUser.taxpayerId,
        status: 'draft',
        dateCreated: new Date(),
        dateModified: new Date(),
        incomeSources: [],
        assets: [],
        debts: [],
        benefits: [],
      };

      mockTaxReportsService.findOneWithRelations.mockResolvedValue(
        expectedResult,
      );

      const result = await resolver.findOneDetailed(id, mockUser);

      expect(mockTaxReportsService.findOneWithRelations).toHaveBeenCalledWith(
        id,
        mockUser.taxpayerId,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateTaxReport', () => {
    it('should call service update with correct parameters', async () => {
      const updateTaxReportInput: UpdateTaxReportInput = {
        id: 1,
        status: 'submitted',
      };

      const expectedResult = {
        id: 1,
        status: 'submitted',
        taxpayerId: mockUser.taxpayerId,
        taxYear: 2023,
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      mockTaxReportsService.update.mockResolvedValue(expectedResult);

      const result = await resolver.updateTaxReport(
        updateTaxReportInput,
        mockUser,
      );

      expect(mockTaxReportsService.update).toHaveBeenCalledWith(
        updateTaxReportInput.id,
        updateTaxReportInput,
        mockUser.taxpayerId,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('removeTaxReport', () => {
    it('should call service remove with correct parameters', async () => {
      const id = 1;
      const expectedResult = {
        id: 1,
        deleted: true,
        taxpayerId: mockUser.taxpayerId,
        taxYear: 2023,
        status: 'deleted',
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      mockTaxReportsService.remove.mockResolvedValue(expectedResult);

      const result = await resolver.removeTaxReport(id, mockUser);

      expect(mockTaxReportsService.remove).toHaveBeenCalledWith(
        id,
        mockUser.taxpayerId,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('resolver fields', () => {
    describe('incomeSources', () => {
      it('should return incomeSources directly if already loaded', async () => {
        const taxReport: Partial<TaxReportType> = {
          id: 1,
          taxpayerId: mockUser.taxpayerId,
          taxYear: 2023,
          status: 'draft',
          dateCreated: new Date(),
          dateModified: new Date(),
          incomeSources: [{ id: 101, amount: 50000 } as any],
        };

        const result = await resolver.incomeSources(
          taxReport as TaxReportType,
          mockUser,
        );

        expect(result).toEqual(taxReport.incomeSources);
        expect(
          mockTaxReportsService.findOneWithRelations,
        ).not.toHaveBeenCalled();
      });

      it('should fetch full report if incomeSources not loaded', async () => {
        const taxReport: Partial<TaxReportType> = {
          id: 1,
          taxpayerId: mockUser.taxpayerId,
          taxYear: 2023,
          status: 'draft',
          dateCreated: new Date(),
          dateModified: new Date(),
        };

        const fullReport: Partial<TaxReportType> = {
          id: 1,
          taxpayerId: mockUser.taxpayerId,
          taxYear: 2023,
          status: 'draft',
          dateCreated: new Date(),
          dateModified: new Date(),
          incomeSources: [{ id: 101, amount: 50000 } as any],
        };

        mockTaxReportsService.findOneWithRelations.mockResolvedValue(
          fullReport,
        );

        const result = await resolver.incomeSources(
          taxReport as TaxReportType,
          mockUser,
        );

        expect(mockTaxReportsService.findOneWithRelations).toHaveBeenCalledWith(
          taxReport.id,
          mockUser.taxpayerId,
        );
        expect(result).toEqual(fullReport.incomeSources);
      });

      it('should return empty array if no incomeSources found', async () => {
        const taxReport: Partial<TaxReportType> = {
          id: 1,
          taxpayerId: mockUser.taxpayerId,
          taxYear: 2023,
          status: 'draft',
          dateCreated: new Date(),
          dateModified: new Date(),
        };

        const fullReport: Partial<TaxReportType> = {
          id: 1,
          taxpayerId: mockUser.taxpayerId,
          taxYear: 2023,
          status: 'draft',
          dateCreated: new Date(),
          dateModified: new Date(),
        };

        mockTaxReportsService.findOneWithRelations.mockResolvedValue(
          fullReport,
        );

        const result = await resolver.incomeSources(
          taxReport as TaxReportType,
          mockUser,
        );

        expect(result).toEqual([]);
      });
    });

    // Similar tests can be implemented for assets, debts, and benefits
  });
});
