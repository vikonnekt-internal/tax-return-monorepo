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
import { DebtsService } from './debts.service';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('debts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  create(
    @Body() createDebtInput: CreateDebtInput,
    @CurrentUser() user: UserEntity,
  ) {
    createDebtInput.taxpayerId = user.id.toString();
    return this.debtsService.create(createDebtInput);
  }

  @Get()
  findAll(
    @Query('taxYear') taxYear: number,
    @CurrentUser() user: UserEntity,
    @Query() paginationInput?: PaginationInput,
  ) {
    return this.debtsService.findAll(
      user.id.toString(),
      +taxYear,
      paginationInput,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.debtsService.findOne(+id, user.id.toString());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDebtInput: UpdateDebtInput,
    @CurrentUser() user: UserEntity,
  ) {
    updateDebtInput.id = +id;
    return this.debtsService.update(+id, updateDebtInput, user.id.toString());
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.debtsService.remove(+id, user.id.toString());
  }
}
