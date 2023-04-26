import { CompanyService } from './company.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/create-company.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Company } from './entities/company.entity';

@ApiTags('COMPANY')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create Company By Hero' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Company By Hero' })
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Company By Hero' })
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Company By Hero' })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Company By Hero' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.companyService.delete(id);
  }
}
