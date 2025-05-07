import { Test, TestingModule } from '@nestjs/testing';
import { TaxReportsController } from './tax-reports.controller';
import { TaxReportsService } from './tax-reports.service';
import { CreateTaxReportDto } from './dto/create-tax-report.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { UserEntity } from '../auth/entities/user-entities';

// Mock the guards
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

describe('TaxReportsController', () => {
  let controller: TaxReportsController;
  let service: jest.Mocked<TaxReportsService>;

  const mockUser: UserEntity = {
    id: 1,
    taxpayerId: 'taxpayer123',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '1234567890',
  };

  beforeEach(async () => {
    const mockTaxReportsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxReportsController],
      providers: [
        {
          provide: TaxReportsService,
          useValue: mockTaxReportsService,
        },
      ],
    }).compile();

    controller = module.get<TaxReportsController>(TaxReportsController);
    service = module.get(TaxReportsService) as jest.Mocked<TaxReportsService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a tax report', async () => {
      const createDto: CreateTaxReportDto = {
        taxYear: 2023,
        status: 'draft',
      };

      // Create a simplified mock of the tax report object
      const mockTaxReport = {
        id: 1,
        taxYear: createDto.taxYear,
        status: createDto.status,
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      service.create.mockResolvedValue(mockTaxReport as any);

      const result = await controller.create(createDto, mockUser);

      expect(service.create).toHaveBeenCalledWith(
        createDto,
        mockUser.id,
        mockUser.id.toString(),
      );
      expect(result).toEqual(mockTaxReport);
    });
  });

  describe('findAll', () => {
    it('should return all tax reports for the user', async () => {
      const paginationInput: PaginationInput = { limit: 10 };

      // Create a simplified mock of tax reports
      const mockTaxReports = [
        {
          id: 1,
          taxYear: 2023,
          status: 'draft',
          dateCreated: new Date(),
          dateModified: new Date(),
        },
        {
          id: 2,
          taxYear: 2022,
          status: 'submitted',
          dateCreated: new Date(),
          dateModified: new Date(),
        },
      ];

      const mockPaginatedResult = {
        data: mockTaxReports,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
          endCursor: '',
        },
        totalCount: mockTaxReports.length,
      };

      service.findAll.mockResolvedValue(mockPaginatedResult as any);

      const result = await controller.findAll(paginationInput, mockUser);

      expect(service.findAll).toHaveBeenCalledWith(
        paginationInput,
        mockUser.taxpayerId,
      );
      expect(result.data).toEqual(mockTaxReports);
      expect(result.totalCount).toEqual(mockTaxReports.length);
    });
  });

  describe('findOne', () => {
    it('should return a single tax report', async () => {
      const reportId = '1';
      const mockTaxReport = {
        id: 1,
        taxYear: 2023,
        status: 'draft',
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      service.findOne.mockResolvedValue(mockTaxReport as any);

      const result = await controller.findOne(reportId, mockUser);

      expect(service.findOne).toHaveBeenCalledWith(
        +reportId,
        mockUser.taxpayerId,
      );
      expect(result).toEqual(mockTaxReport);
    });
  });

  describe('update', () => {
    it('should update a tax report', async () => {
      const reportId = '1';
      const updateDto: UpdateTaxReportDto = {
        id: 1,
        status: 'submitted',
      };

      const mockTaxReport = {
        id: 1,
        taxYear: 2023,
        status: 'submitted',
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      service.update.mockResolvedValue(mockTaxReport as any);

      const result = await controller.update(reportId, updateDto, mockUser);

      expect(service.update).toHaveBeenCalledWith(
        +reportId,
        updateDto,
        mockUser.taxpayerId,
      );
      expect(result).toEqual(mockTaxReport);
    });
  });

  describe('remove', () => {
    it('should remove a tax report', async () => {
      const reportId = '1';
      const mockDeletedTaxReport = {
        id: 1,
        taxYear: 2023,
        status: 'deleted',
        dateModified: new Date(),
        dateCreated: new Date(),
        deleted: true,
      };

      service.remove.mockResolvedValue(mockDeletedTaxReport as any);

      const result = await controller.remove(reportId, mockUser);

      expect(service.remove).toHaveBeenCalledWith(
        +reportId,
        mockUser.taxpayerId,
      );
      expect(result).toEqual(mockDeletedTaxReport);
    });
  });
});
