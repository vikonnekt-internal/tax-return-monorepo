import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetsRepository } from './assets.repository';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { PaginationInput } from '../common/pagination/pagination.input';

@Injectable()
export class AssetsService {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async create(createAssetInput: CreateAssetInput) {
    return this.assetsRepository.create(createAssetInput);
  }

  async findAll(
    taxpayerId: string,
    taxYear: number,
    paginationInput?: PaginationInput,
  ) {
    return this.assetsRepository.findAll(
      { taxpayerId, taxYear },
      paginationInput,
    );
  }

  async findOne(id: number, taxpayerId: string) {
    const asset = await this.assetsRepository.findOne(id);

    if (!asset || asset.taxpayerId !== taxpayerId) {
      throw new NotFoundException(
        `Asset with ID ${id} not found for this user`,
      );
    }

    return asset;
  }

  async update(
    id: number,
    updateAssetInput: UpdateAssetInput,
    taxpayerId: string,
  ) {
    // Verify the asset belongs to the user
    await this.findOne(id, taxpayerId);

    return this.assetsRepository.update(id, updateAssetInput);
  }

  async remove(id: number, taxpayerId: string) {
    // Verify the asset belongs to the user
    await this.findOne(id, taxpayerId);

    return this.assetsRepository.remove(id);
  }
}
