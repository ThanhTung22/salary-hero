import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Admin } from './entitis/admin.entity';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto, UpdateAdminDto } from './dto/create-admin.dto';
// import { UseAppGuard } from '../auth/decorators/use-app-guard.decorator';
// import { AccountRole } from '../auth/auth.constant';
// import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('ADMIN')
// @ApiBearerAuth()
// @UseAppGuard()
// @Roles(AccountRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create Admin By Hero' })
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Admin By Hero' })
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Admin By Hero' })
  async findOne(@Param('id') id: string): Promise<Admin> {
    return this.adminService.findOneAdmin(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Admin By Hero' })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateAdminDto,
  ): Promise<Admin> {
    return await this.adminService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Admin By Hero' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.adminService.delete(id);
  }
}
