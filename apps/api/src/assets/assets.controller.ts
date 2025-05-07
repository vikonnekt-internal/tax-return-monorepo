import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';

import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(
    @Body() createAssetInput: CreateAssetInput,
    @CurrentUser() user: UserEntity,
  ) {
    createAssetInput.taxpayerId = user.taxpayerId;
    return this.assetsService.create(createAssetInput);
  }

  @Get()
  findAll(
    @Query('taxYear') taxYear: number,
    @CurrentUser() user: UserEntity,
    @Query() paginationInput?: PaginationInput,
  ) {
    return this.assetsService.findAll(
      user.taxpayerId,
      +taxYear,
      paginationInput,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.assetsService.findOne(+id, user.taxpayerId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssetInput: UpdateAssetInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.assetsService.update(+id, updateAssetInput, user.taxpayerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.assetsService.remove(+id, user.taxpayerId);
  }
}
