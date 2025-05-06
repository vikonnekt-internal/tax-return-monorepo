import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetInput: CreateAssetInput) {
    return this.assetsService.create(createAssetInput);
  }

  @Get()
  findAll(
    @Query('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear: number,
  ) {
    return this.assetsService.findAll(taxpayerId, taxYear);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetInput: UpdateAssetInput) {
    return this.assetsService.update(+id, updateAssetInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}
