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
import { BenefitsService } from './benefits.service';
import { CreateBenefitInput } from './dto/create-benefit.input';
import { UpdateBenefitInput } from './dto/update-benefit.input';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Post()
  create(@Body() createBenefitInput: CreateBenefitInput) {
    return this.benefitsService.create(createBenefitInput);
  }

  @Get()
  findAll(
    @Query('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear: number,
  ) {
    return this.benefitsService.findAll(taxpayerId, +taxYear);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.benefitsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBenefitInput: UpdateBenefitInput,
  ) {
    updateBenefitInput.id = +id;
    return this.benefitsService.update(+id, updateBenefitInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.benefitsService.remove(+id);
  }
}
