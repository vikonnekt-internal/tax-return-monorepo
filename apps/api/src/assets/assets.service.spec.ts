import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { AssetsRepository } from './assets.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import { AssetTypeEnum } from './dto/asset-type.enum';

describe('AssetsService', () => {
  let service: AssetsService;

  const mockAssetsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        {
          provide: AssetsRepository,
          useValue: mockAssetsRepository,
        },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an asset', async () => {
      const createAssetInput: CreateAssetInput = {
        taxpayerId: 'taxpayer-123',
        taxYear: 2023,
        assetType: AssetTypeEnum.REAL_ESTATE,
        realEstate: {
          propertyId: 'property-123',
          taxpayerId: 'taxpayer-123',
          address: '123 Main St',
          propertyValue: 100000,
          taxYear: 2023,
        },
      };

      const expectedResult = {
        id: 1,
        ...createAssetInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAssetsRepository.create.mockResolvedValue(expectedResult);

      const result = await service.create(createAssetInput);

      expect(mockAssetsRepository.create).toHaveBeenCalledWith(
        createAssetInput,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all assets for a taxpayer and tax year', async () => {
      const taxpayerId = 'taxpayer-123';
      const taxYear = 2023;
      const paginationInput: PaginationInput = { limit: 10 };
      const expectedResult = {
        data: [
          {
            id: 1,
            taxpayerId,
            taxYear,
            assetType: AssetTypeEnum.REAL_ESTATE,
            realEstate: {
              propertyId: 'property-123',
              taxpayerId: 'taxpayer-123',
              address: '123 Main St',
              propertyValue: 100000,
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

      mockAssetsRepository.findAll.mockResolvedValue(expectedResult);

      const result = await service.findAll(
        taxpayerId,
        taxYear,
        paginationInput,
      );

      expect(mockAssetsRepository.findAll).toHaveBeenCalledWith(
        { taxpayerId, taxYear },
        paginationInput,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return an asset if it belongs to the taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const expectedResult = {
        id,
        taxpayerId,
        taxYear: 2023,
        assetType: AssetTypeEnum.REAL_ESTATE,
        realEstate: {
          propertyId: 'property-123',
          taxpayerId: 'taxpayer-123',
          address: '123 Main St',
          propertyValue: 100000,
          taxYear: 2023,
        },
      };

      mockAssetsRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(id, taxpayerId);

      expect(mockAssetsRepository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException if asset is not found', async () => {
      const id = 999;
      const taxpayerId = 'taxpayer-123';

      mockAssetsRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id, taxpayerId)).rejects.toThrow(
        new NotFoundException(`Asset with ID ${id} not found for this user`),
      );
    });

    it('should throw NotFoundException if asset does not belong to taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const differentTaxpayerId = 'different-taxpayer';
      const asset = {
        id,
        taxpayerId: differentTaxpayerId,
        taxYear: 2023,
        assetType: AssetTypeEnum.REAL_ESTATE,
        realEstate: {
          propertyId: 'property-123',
          taxpayerId: differentTaxpayerId,
          address: '123 Main St',
          propertyValue: 100000,
          taxYear: 2023,
        },
      };

      mockAssetsRepository.findOne.mockResolvedValue(asset);

      await expect(service.findOne(id, taxpayerId)).rejects.toThrow(
        new NotFoundException(`Asset with ID ${id} not found for this user`),
      );
    });
  });

  describe('update', () => {
    it('should update an asset if it belongs to the taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const updateAssetInput: UpdateAssetInput = {
        id,
        realEstate: {
          id: 'real-estate-1',
          propertyValue: 120000,
          address: 'Updated Property Address',
        },
      };

      const asset = {
        id,
        taxpayerId,
        taxYear: 2023,
        assetType: AssetTypeEnum.REAL_ESTATE,
        realEstate: {
          propertyId: 'property-123',
          taxpayerId: 'taxpayer-123',
          address: '123 Main St',
          propertyValue: 100000,
          taxYear: 2023,
        },
      };

      const updatedAsset = {
        ...asset,
        realEstate: {
          ...asset.realEstate,
          propertyValue: 120000,
          address: 'Updated Property Address',
        },
      };

      mockAssetsRepository.findOne.mockResolvedValue(asset);
      mockAssetsRepository.update.mockResolvedValue(updatedAsset);

      const result = await service.update(id, updateAssetInput, taxpayerId);

      expect(mockAssetsRepository.findOne).toHaveBeenCalledWith(id);
      expect(mockAssetsRepository.update).toHaveBeenCalledWith(
        id,
        updateAssetInput,
      );
      expect(result).toEqual(updatedAsset);
    });
  });

  describe('remove', () => {
    it('should remove an asset if it belongs to the taxpayer', async () => {
      const id = 1;
      const taxpayerId = 'taxpayer-123';
      const asset = {
        id,
        taxpayerId,
        taxYear: 2023,
        assetType: AssetTypeEnum.REAL_ESTATE,
        realEstate: {
          propertyId: 'property-123',
          taxpayerId: 'taxpayer-123',
          address: '123 Main St',
          propertyValue: 100000,
          taxYear: 2023,
        },
      };

      mockAssetsRepository.findOne.mockResolvedValue(asset);
      mockAssetsRepository.remove.mockResolvedValue({ affected: 1 });

      const result = await service.remove(id, taxpayerId);

      expect(mockAssetsRepository.findOne).toHaveBeenCalledWith(id);
      expect(mockAssetsRepository.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
