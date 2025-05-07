import { Test, TestingModule } from '@nestjs/testing';
import { AssetsResolver } from './assets.resolver';
import { AssetsService } from './assets.service';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { AssetTypeEnum } from './dto/asset-type.enum';
import { PaginationInput } from '../common/pagination/pagination.input';
import { UserEntity } from '../auth/entities/user-entities';
import { Asset } from './assets.type';

// Mock JwtAuthGuard
jest.mock('../auth/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

// Mock RolesGuard
jest.mock('../auth/role.guard', () => ({
  RolesGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
}));

// Mock Roles decorator
jest.mock('../auth/role.decorator', () => ({
  Roles: jest.fn().mockReturnValue(jest.fn()),
}));

describe('AssetsResolver', () => {
  let resolver: AssetsResolver;

  const mockAssetsService = {
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
        AssetsResolver,
        {
          provide: AssetsService,
          useValue: mockAssetsService,
        },
      ],
    }).compile();

    resolver = module.get<AssetsResolver>(AssetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createAsset', () => {
    it('should call assetsService.create with the correct parameters', async () => {
      const createAssetInput: CreateAssetInput = {
        taxpayerId: 'original-taxpayer-id', // Will be overwritten
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

      const user: UserEntity = {
        id: 1,
        taxpayerId: 'user-taxpayer-123',
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };

      const expectedResult = {
        id: 1,
        taxpayerId: 'user-taxpayer-123', // Should be overwritten with user's taxpayerId
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

      mockAssetsService.create.mockResolvedValue(expectedResult);

      const result = await resolver.createAsset(createAssetInput, user);

      // Check that taxpayerId was set to user's taxpayerId before passing to service
      expect(createAssetInput.taxpayerId).toBe(user.taxpayerId);
      expect(mockAssetsService.create).toHaveBeenCalledWith(createAssetInput);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call assetsService.findAll with the correct parameters', async () => {
      const taxYear = 2023;
      const user: UserEntity = {
        id: 1,
        taxpayerId: 'taxpayer-123',
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };
      const paginationInput: PaginationInput = { limit: 10 };

      const expectedResult = {
        data: [
          {
            id: 1,
            taxpayerId: user.taxpayerId,
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

      mockAssetsService.findAll.mockResolvedValue(expectedResult);

      const result = await resolver.findAll(taxYear, user, paginationInput);

      expect(mockAssetsService.findAll).toHaveBeenCalledWith(
        user.taxpayerId,
        taxYear,
        paginationInput,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call assetsService.findOne with the correct parameters', async () => {
      const id = 1;
      const user: UserEntity = {
        id: 1,
        taxpayerId: 'taxpayer-123',
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };

      const expectedResult = {
        id,
        taxpayerId: user.taxpayerId,
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

      mockAssetsService.findOne.mockResolvedValue(expectedResult);

      const result = await resolver.findOne(id, user);

      expect(mockAssetsService.findOne).toHaveBeenCalledWith(
        id,
        user.taxpayerId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateAsset', () => {
    it('should call assetsService.update with the correct parameters', async () => {
      const updateAssetInput: UpdateAssetInput = {
        id: 1,
        realEstate: {
          id: 'real-estate-1',
          propertyValue: 120000,
          address: 'Updated Property Address',
        },
      };

      const user: UserEntity = {
        id: 1,
        taxpayerId: 'taxpayer-123',
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };

      const expectedResult = {
        id: 1,
        taxpayerId: user.taxpayerId,
        taxYear: 2023,
        assetType: AssetTypeEnum.REAL_ESTATE,
        realEstate: {
          propertyId: 'property-123',
          taxpayerId: 'taxpayer-123',
          address: 'Updated Property Address',
          propertyValue: 120000,
          taxYear: 2023,
        },
      };

      mockAssetsService.update.mockResolvedValue(expectedResult);

      const result = await resolver.updateAsset(updateAssetInput, user);

      expect(mockAssetsService.update).toHaveBeenCalledWith(
        updateAssetInput.id,
        updateAssetInput,
        user.taxpayerId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('removeAsset', () => {
    it('should call assetsService.remove with the correct parameters', async () => {
      const id = 1;
      const user: UserEntity = {
        id: 1,
        taxpayerId: 'taxpayer-123',
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };

      const expectedResult = { affected: 1 };

      mockAssetsService.remove.mockResolvedValue(expectedResult);

      const result = await resolver.removeAsset(id, user);

      expect(mockAssetsService.remove).toHaveBeenCalledWith(
        id,
        user.taxpayerId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('field resolvers', () => {
    it('should resolve realEstateId correctly', () => {
      const asset: Partial<Asset> = {
        id: 1,
        assetType: 'real_estate',
        dateCreated: new Date(),
        dateModified: new Date(),
        realEstate: { id: 123 } as any,
      };

      expect(resolver.getRealEstateId(asset as Asset)).toBe(123);
    });

    it('should return null for realEstateId when realEstate is not defined', () => {
      const asset: Partial<Asset> = {
        id: 1,
        assetType: 'real_estate',
        dateCreated: new Date(),
        dateModified: new Date(),
        realEstate: undefined,
      };

      expect(resolver.getRealEstateId(asset as Asset)).toBeNull();
    });

    it('should resolve vehicleId correctly', () => {
      const asset: Partial<Asset> = {
        id: 1,
        assetType: 'vehicle',
        dateCreated: new Date(),
        dateModified: new Date(),
        vehicle: { id: 456 } as any,
      };

      expect(resolver.getVehicleId(asset as Asset)).toBe(456);
    });

    it('should return null for vehicleId when vehicle is not defined', () => {
      const asset: Partial<Asset> = {
        id: 1,
        assetType: 'vehicle',
        dateCreated: new Date(),
        dateModified: new Date(),
        vehicle: undefined,
      };

      expect(resolver.getVehicleId(asset as Asset)).toBeNull();
    });

    it('should convert assetType to uppercase', () => {
      const asset: Partial<Asset> = {
        id: 1,
        assetType: 'real_estate',
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      expect(resolver.getAssetType(asset as Asset)).toBe('REAL_ESTATE');
    });
  });
});
