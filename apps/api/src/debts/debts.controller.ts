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
import { DebtsService } from './debts.service';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  create(@Body() createDebtInput: CreateDebtInput) {
    return this.debtsService.create(createDebtInput);
  }

  @Get()
  findAll(
    @Query('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear: number,
  ) {
    return this.debtsService.findAll(taxpayerId, taxYear);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtInput: UpdateDebtInput) {
    return this.debtsService.update(+id, updateDebtInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtsService.remove(+id);
  }
}
