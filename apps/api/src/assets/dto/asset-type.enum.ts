import { registerEnumType } from '@nestjs/graphql';

export enum AssetTypeEnum {
  REAL_ESTATE = 'real_estate',
  VEHICLE = 'vehicle',
}

registerEnumType(AssetTypeEnum, {
  name: 'AssetTypeEnum',
  description: 'The type of asset',
});
