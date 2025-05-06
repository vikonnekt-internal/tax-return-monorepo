import { Injectable } from '@nestjs/common';
import { AssetsRepository } from './assets.repository';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';

@Injectable()
export class AssetsService {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  create(createAssetInput: CreateAssetInput) {
    return this.assetsRepository.create(createAssetInput);
  }

  findAll(taxpayerId: string, taxYear: number) {
    return this.assetsRepository.findAll({ taxpayerId, taxYear });
  }

  findOne(id: number) {
    return this.assetsRepository.findOne(id);
  }

  update(id: number, updateAssetInput: UpdateAssetInput) {
    return this.assetsRepository.update(id, updateAssetInput);
  }

  remove(id: number) {
    return this.assetsRepository.remove(id);
  }
}
