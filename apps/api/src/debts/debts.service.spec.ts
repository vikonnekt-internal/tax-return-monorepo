import { Test, TestingModule } from '@nestjs/testing';
import { DebtsService } from './debts.service';
import { DebtsRepository } from './debts.repository';
import { DatabaseService } from '@tax/database';
import { NotFoundException } from '@nestjs/common';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import { DebtTypeEnum } from './dto/debt-type.enum';

describe('DebtsService', () => {
  let service: DebtsService;

  const mockDebtsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockDatabaseService = {
    housingLoan: {
      findUnique: jest.fn(),
    },
    otherDebt: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebtsService,
        {
          provide: DebtsRepository,
          useValue: mockDebtsRepository,
        },
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<DebtsService>(DebtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a debt', async () => {
      const createDebtInput: CreateDebtInput = {
        taxpayerId: 'taxpayer-123',
        taxYear: 2023,
        debtType: DebtTypeEnum.HOUSING_LOAN,
        housingLoan: {
          taxpayerId: 'taxpayer-123',
          lenderName: 'Example Bank',
          loanNumber: 'LOAN12345',
          propertyAddress: '123 Main St',
          loanDate: '2020-01-01',
          annualPayments: 15000,
          principalRepayment: 10000,
          interestExpenses: 5000,
          remainingBalance: 200000,
          taxYear: 2023,
        },
      };

      const expectedResult = {
        id: 1,
        ...createDebtInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDebtsRepository.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDebtInput);

      expect(mockDebtsRepository.create).toHaveBeenCalledWith(createDebtInput);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all debts for a taxpayer and tax year', async () => {
      const taxpayerId = 'taxpayer-123';
      const taxYear = 2023;
      const paginationInput: PaginationInput = { limit: 10 };
      const expectedResult = {
        data: [
          {
            id: 1,
            taxpayerId,
            taxYear,
            debtType: DebtTypeEnum.HOUSING_LOAN,
            housingLoan: {
              taxpayerId: 'taxpayer-123',
              lenderName: 'Example Bank',
              loanNumber: 'LOAN12345',
              propertyAddress: '123 Main St',
              loanDate: '2020-01-01',
              annualPayments: 15000,
              principalRepayment: 10000,
              interestExpenses: 5000,
              remainingBalance: 200000,
              taxYear: 2023,
            },
          },
        ],
        pageInfo: {
          totalCount: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockDebtsRepository.findAll.mockResolvedValue(expectedResult);

      const result = await service.findAll(
        taxpayerId,
        taxYear,
        paginationInput,
      );

      expect(mockDebtsRepository.findAll).toHaveBeenCalledWith(
        { taxpayerId, taxYear },
        paginationInput,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a debt if it belongs to the taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const expectedResult = {
        id,
        taxpayerId,
        taxYear: 2023,
        debtType: DebtTypeEnum.HOUSING_LOAN,
        housingLoan: {
          taxpayerId: 'taxpayer-123',
          lenderName: 'Example Bank',
          loanNumber: 'LOAN12345',
          propertyAddress: '123 Main St',
          loanDate: '2020-01-01',
          annualPayments: 15000,
          principalRepayment: 10000,
          interestExpenses: 5000,
          remainingBalance: 200000,
          taxYear: 2023,
        },
      };

      mockDebtsRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(id, taxpayerId);

      expect(mockDebtsRepository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException if debt is not found', async () => {
      const id = 999;
      const taxpayerId = 'taxpayer-123';

      mockDebtsRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id, taxpayerId)).rejects.toThrow(
        new NotFoundException(`Debt with ID ${id} not found for this user`),
      );
    });

    it('should throw NotFoundException if debt does not belong to taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const differentTaxpayerId = 'different-taxpayer';
      const debt = {
        id,
        taxpayerId: differentTaxpayerId,
        taxYear: 2023,
        debtType: DebtTypeEnum.HOUSING_LOAN,
        housingLoan: {
          taxpayerId: differentTaxpayerId,
          lenderName: 'Example Bank',
          loanNumber: 'LOAN12345',
          propertyAddress: '123 Main St',
          loanDate: '2020-01-01',
          annualPayments: 15000,
          principalRepayment: 10000,
          interestExpenses: 5000,
          remainingBalance: 200000,
          taxYear: 2023,
        },
      };

      mockDebtsRepository.findOne.mockResolvedValue(debt);

      await expect(service.findOne(id, taxpayerId)).rejects.toThrow(
        new NotFoundException(`Debt with ID ${id} not found for this user`),
      );
    });
  });

  describe('update', () => {
    it('should update a debt if it belongs to the taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const updateDebtInput: UpdateDebtInput = {
        id,
        housingLoan: {
          id: 1,
          lenderName: 'Updated Bank',
          interestExpenses: 5500,
        },
      };

      const debt = {
        id,
        taxpayerId,
        taxYear: 2023,
        debtType: DebtTypeEnum.HOUSING_LOAN,
        housingLoan: {
          taxpayerId: 'taxpayer-123',
          lenderName: 'Example Bank',
          loanNumber: 'LOAN12345',
          propertyAddress: '123 Main St',
          loanDate: '2020-01-01',
          annualPayments: 15000,
          principalRepayment: 10000,
          interestExpenses: 5000,
          remainingBalance: 200000,
          taxYear: 2023,
        },
      };

      const updatedDebt = {
        ...debt,
        housingLoan: {
          ...debt.housingLoan,
          lenderName: 'Updated Bank',
          interestExpenses: 5500,
        },
      };

      mockDebtsRepository.findOne.mockResolvedValue(debt);
      mockDebtsRepository.update.mockResolvedValue(updatedDebt);

      const result = await service.update(id, updateDebtInput, taxpayerId);

      expect(mockDebtsRepository.findOne).toHaveBeenCalledWith(id);
      expect(mockDebtsRepository.update).toHaveBeenCalledWith(
        id,
        updateDebtInput,
      );
      expect(result).toEqual(updatedDebt);
    });
  });

  describe('remove', () => {
    it('should remove a debt if it belongs to the taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const debt = {
        id,
        taxpayerId,
        taxYear: 2023,
        debtType: DebtTypeEnum.HOUSING_LOAN,
        housingLoan: {
          taxpayerId: 'taxpayer-123',
          lenderName: 'Example Bank',
          loanNumber: 'LOAN12345',
          propertyAddress: '123 Main St',
          loanDate: '2020-01-01',
          annualPayments: 15000,
          principalRepayment: 10000,
          interestExpenses: 5000,
          remainingBalance: 200000,
          taxYear: 2023,
        },
      };

      mockDebtsRepository.findOne.mockResolvedValue(debt);
      mockDebtsRepository.remove.mockResolvedValue({ affected: 1 });

      const result = await service.remove(id, taxpayerId);

      expect(mockDebtsRepository.findOne).toHaveBeenCalledWith(id);
      expect(mockDebtsRepository.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('getHousingLoan', () => {
    it('should return a housing loan', async () => {
      const debtId = 1;
      const housingLoan = {
        id: 1,
        debtId,
        taxpayerId: 'taxpayer-123',
        lenderName: 'Example Bank',
        loanNumber: 'LOAN12345',
        propertyAddress: '123 Main St',
        loanDate: '2020-01-01',
        annualPayments: 15000,
        principalRepayment: 10000,
        interestExpenses: 5000,
        remainingBalance: 200000,
        taxYear: 2023,
      };

      mockDatabaseService.housingLoan.findUnique.mockResolvedValue(housingLoan);

      const result = await service.getHousingLoan(debtId);

      expect(mockDatabaseService.housingLoan.findUnique).toHaveBeenCalledWith({
        where: { debtId },
      });
      expect(result).toEqual(housingLoan);
    });
  });

  describe('getOtherDebt', () => {
    it('should return an other debt', async () => {
      const debtId = 2;
      const otherDebt = {
        id: 'other-debt-1',
        debtId,
        amount: 25000,
        description: 'Personal loan',
        debtType: 'personal_loan',
        bank: 'Example Bank',
        bankAccountNumber: '87654321',
        bankAccountIban: 'TN987654321',
      };

      mockDatabaseService.otherDebt.findUnique.mockResolvedValue(otherDebt);

      const result = await service.getOtherDebt(debtId);

      expect(mockDatabaseService.otherDebt.findUnique).toHaveBeenCalledWith({
        where: { debtId },
      });
      expect(result).toEqual(otherDebt);
    });
  });
});
