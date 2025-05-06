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
import { OtherDebtsService } from './other-debts.service';
import { CreateOtherDebtInput } from './dto/create-other-debt.input';
import { UpdateOtherDebtInput } from './dto/update-other-debt.input';

@Controller('other-debts')
export class OtherDebtsController {
  constructor(private readonly otherDebtsService: OtherDebtsService) {}

  @Post()
  create(@Body() createOtherDebtInput: CreateOtherDebtInput) {
    return this.otherDebtsService.create(createOtherDebtInput);
  }

  @Get()
  findAll(
    @Query('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear: number,
  ) {
    return this.otherDebtsService.findAll(taxpayerId, +taxYear);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherDebtsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOtherDebtInput: UpdateOtherDebtInput,
  ) {
    return this.otherDebtsService.update(+id, updateOtherDebtInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherDebtsService.remove(+id);
  }
}
