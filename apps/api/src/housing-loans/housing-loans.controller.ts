import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { HousingLoansService } from './housing-loans.service';
import { CreateHousingLoanInput } from './dto/create-housing-loan.input';
import { UpdateHousingLoanInput } from './dto/update-housing-loan.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@Controller('housing-loans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HousingLoansController {
  constructor(private readonly housingLoansService: HousingLoansService) {}

  @Get()
  @Roles('admin')
  async getAllHousingLoans(
    @Query('taxYear') taxYear?: number,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.housingLoansService.getAllHousingLoans({
      taxYear: taxYear ? +taxYear : undefined,
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
    });
  }

  @Get(':id')
  @Roles('admin')
  async getHousingLoan(@Param('id', ParseIntPipe) id: number) {
    return this.housingLoansService.getHousingLoan(id);
  }

  @Get('taxpayer/:taxpayerId')
  @Roles('admin')
  async getHousingLoansByTaxpayer(
    @Param('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear?: number,
  ) {
    return this.housingLoansService.getHousingLoansByTaxpayer(
      taxpayerId,
      taxYear ? +taxYear : undefined,
    );
  }

  @Post()
  @Roles('admin')
  async createHousingLoan(
    @Body() createHousingLoanDto: CreateHousingLoanInput,
  ) {
    return this.housingLoansService.createHousingLoan(createHousingLoanDto);
  }

  @Put(':id')
  @Roles('admin')
  async updateHousingLoan(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Omit<UpdateHousingLoanInput, 'id'>,
  ) {
    return this.housingLoansService.updateHousingLoan({
      id,
      ...updateData,
    });
  }

  @Delete(':id')
  @Roles('admin')
  async deleteHousingLoan(@Param('id', ParseIntPipe) id: number) {
    return this.housingLoansService.deleteHousingLoan(id);
  }
}
