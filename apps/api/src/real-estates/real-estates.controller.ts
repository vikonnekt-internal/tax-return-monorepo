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
import { RealEstatesService } from './real-estates.service';
import { CreateRealEstateInput } from './dto/create-real-estate.input';
import { UpdateRealEstateInput } from './dto/update-real-estate.input';

@Controller('real-estates')
export class RealEstatesController {
  constructor(private readonly realEstatesService: RealEstatesService) {}

  @Post()
  create(@Body() createRealEstateInput: CreateRealEstateInput) {
    return this.realEstatesService.create(createRealEstateInput);
  }

  @Get()
  findAll(
    @Query('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear: number,
  ) {
    return this.realEstatesService.findAll(taxpayerId, +taxYear);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realEstatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealEstateInput: UpdateRealEstateInput,
  ) {
    updateRealEstateInput.id = id;
    return this.realEstatesService.update(id, updateRealEstateInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realEstatesService.remove(id);
  }
}
