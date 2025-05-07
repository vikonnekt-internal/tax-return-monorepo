import { Test, TestingModule } from '@nestjs/testing';
import { TaxReportsService } from './tax-reports.service';
import { TaxReportsRepository } from './tax-reports.repository';
import { DatabaseService } from '@tax/database';
import PaginationService from '../common/pagination/pagination.service';
import { PaginationInput } from '../common/pagination/pagination.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';

describe('TaxReportsService', () => {
  let service: TaxReportsService;
  let repository: TaxReportsRepository;
  let paginationService: PaginationService;
  let databaseService: DatabaseService;

  const mockTaxReportsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllByTaxpayerId: jest.fn(),
    findOne: jest.fn(),
    findOneWithRelations: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPaginationService = {
    paginate: jest.fn(),
    generateCursor: jest.fn(),
    createPaginationObject: jest.fn(),
  };

  const mockDatabaseService = {
    taxReturn: {
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxReportsService,
        {
          provide: TaxReportsRepository,
          useValue: mockTaxReportsRepository,
        },
        {
          provide: PaginationService,
          useValue: mockPaginationService,
        },
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<TaxReportsService>(TaxReportsService);
    repository = module.get<TaxReportsRepository>(TaxReportsRepository);
    paginationService = module.get<PaginationService>(PaginationService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository create with correct parameters', async () => {
      const createTaxReportDto = { taxYear: 2023, status: 'draft' };
      const userId = 1;
      const taxpayerId = 'TP123';
      const expectedResult = {
        id: 1,
        ...createTaxReportDto,
        userId,
        taxpayerId,
      };

      mockTaxReportsRepository.create.mockResolvedValue(expectedResult);

      const result = await service.create(
        createTaxReportDto,
        userId,
        taxpayerId,
      );

      expect(repository.create).toHaveBeenCalledWith({
        ...createTaxReportDto,
        userId,
        taxpayerId,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call repository findAll with correct parameters', async () => {
      const paginationInput: PaginationInput = { limit: 10 };
      const taxpayerId = 'TP123';
      const filter = { taxpayerId };
      const pageInfoBase = { hasNextPage: true, hasPreviousPage: false };
      const data = [{ id: 1 }, { id: 2 }];
      const totalCount = 2;
      const paginationResult = { data, pageInfo: {}, totalCount };

      mockPaginationService.paginate.mockResolvedValue(pageInfoBase);
      mockTaxReportsRepository.findAll.mockResolvedValue(data);
      mockDatabaseService.taxReturn.count.mockResolvedValue(totalCount);
      mockPaginationService.generateCursor.mockImplementation(
        (id) => `cursor-${id}`,
      );
      mockPaginationService.createPaginationObject.mockReturnValue(
        paginationResult,
      );

      const result = await service.findAll(paginationInput, taxpayerId);

      expect(paginationService.paginate).toHaveBeenCalledWith('taxReturn', {
        filter,
        paging: paginationInput,
      });
      expect(repository.findAll).toHaveBeenCalledWith(paginationInput, filter);
      expect(databaseService.taxReturn.count).toHaveBeenCalledWith({
        where: filter,
      });
      expect(paginationService.generateCursor).toHaveBeenCalledWith(1);
      expect(paginationService.generateCursor).toHaveBeenCalledWith(2);
      expect(paginationService.createPaginationObject).toHaveBeenCalledWith({
        data,
        pageInfo: {
          ...pageInfoBase,
          startCursor: 'cursor-1',
          endCursor: 'cursor-2',
        },
        totalCount,
      });
      expect(result).toEqual(paginationResult);
    });

    it('should handle empty data result', async () => {
      const paginationInput: PaginationInput = { limit: 10 };
      const filter = {};
      const pageInfoBase = { hasNextPage: false, hasPreviousPage: false };
      const data = [];
      const totalCount = 0;
      const paginationResult = { data, pageInfo: {}, totalCount };

      mockPaginationService.paginate.mockResolvedValue(pageInfoBase);
      mockTaxReportsRepository.findAll.mockResolvedValue(data);
      mockDatabaseService.taxReturn.count.mockResolvedValue(totalCount);
      mockPaginationService.createPaginationObject.mockReturnValue(
        paginationResult,
      );

      const result = await service.findAll(paginationInput);

      expect(paginationService.paginate).toHaveBeenCalledWith('taxReturn', {
        filter: {},
        paging: paginationInput,
      });
      expect(repository.findAll).toHaveBeenCalledWith(paginationInput, {});
      expect(paginationService.createPaginationObject).toHaveBeenCalledWith({
        data,
        pageInfo: {
          ...pageInfoBase,
          startCursor: undefined,
          endCursor: '',
        },
        totalCount,
      });
      expect(result).toEqual(paginationResult);
    });
  });

  describe('findOne', () => {
    it('should call repository findOne with correct parameters', async () => {
      const id = 1;
      const taxpayerId = 'TP123';
      const expectedResult = { id, taxpayerId };

      mockTaxReportsRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(id, taxpayerId);

      expect(repository.findOne).toHaveBeenCalledWith(id, taxpayerId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOneWithRelations', () => {
    it('should call repository findOneWithRelations with correct parameters', async () => {
      const id = 1;
      const taxpayerId = 'TP123';
      const expectedResult = {
        id,
        taxpayerId,
        incomeSources: [],
        assets: [],
        debts: [],
        benefits: [],
      };

      mockTaxReportsRepository.findOneWithRelations.mockResolvedValue(
        expectedResult,
      );

      const result = await service.findOneWithRelations(id, taxpayerId);

      expect(repository.findOneWithRelations).toHaveBeenCalledWith(
        id,
        taxpayerId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call repository update with correct parameters', async () => {
      const id = 1;
      const updateTaxReportDto: UpdateTaxReportDto = {
        id: 1,
        status: 'submitted',
      };
      const taxpayerId = 'TP123';
      const expectedResult = { id, taxpayerId, status: 'submitted' };

      mockTaxReportsRepository.update.mockResolvedValue(expectedResult);

      const result = await service.update(id, updateTaxReportDto, taxpayerId);

      expect(repository.update).toHaveBeenCalledWith(
        id,
        updateTaxReportDto,
        taxpayerId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call repository remove with correct parameters', async () => {
      const id = 1;
      const taxpayerId = 'TP123';
      const expectedResult = { id, taxpayerId, deleted: true };

      mockTaxReportsRepository.remove.mockResolvedValue(expectedResult);

      const result = await service.remove(id, taxpayerId);

      expect(repository.remove).toHaveBeenCalledWith(id, taxpayerId);
      expect(result).toEqual(expectedResult);
    });
  });
});
