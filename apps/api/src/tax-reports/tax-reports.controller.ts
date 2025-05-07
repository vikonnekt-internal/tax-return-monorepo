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
  HttpStatus,
} from '@nestjs/common';
import { TaxReportsService } from './tax-reports.service';
import { CreateTaxReportDto } from './dto/create-tax-report.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInputDto } from '../common/pagination/pagination.input';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('tax-reports')
@ApiBearerAuth('JWT-auth')
@Controller('tax-reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class TaxReportsController {
  constructor(private readonly taxReportsService: TaxReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tax report' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The tax report has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have permission to create tax reports.',
  })
  async create(
    @Body() createTaxReportDto: CreateTaxReportDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.create(
      createTaxReportDto,
      user.id,
      user.taxpayerId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all tax reports with pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of tax reports.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have permission to view tax reports.',
  })
  async findAll(
    @Query() paginationInput: PaginationInputDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.findAll(
      paginationInput,
      user.taxpayerId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific tax report by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the tax report to retrieve',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the tax report details.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tax report with the given ID was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have permission to view this tax report.',
  })
  async findOne(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return await this.taxReportsService.findOne(+id, user.taxpayerId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tax report' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the tax report to update',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The tax report has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tax report with the given ID was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have permission to update this tax report.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTaxReportDto: UpdateTaxReportDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.update(
      +id,
      updateTaxReportDto,
      user.taxpayerId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tax report' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the tax report to delete',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The tax report has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tax report with the given ID was not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authenticated.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have permission to delete this tax report.',
  })
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return await this.taxReportsService.remove(+id, user.taxpayerId);
  }
}
