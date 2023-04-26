import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Admin } from './entitis/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto, UpdateAdminDto } from './dto/create-admin.dto';
import { hashPassword } from 'src/common/utils/password.util';
import { CompanyService } from '../companys/company.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { email, password, ...dto } = createAdminDto;
    const adminData = await this.adminRepository.findOne({
      where: { email },
    });
    if (adminData) {
      throw new ConflictException('Admin has already existed!');
    }
    const company = await this.companyService.findOne(dto.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const passwordhash = await hashPassword(password);
    const createAdmin = {
      email,
      password: passwordhash,
      ...dto,
    };
    const data = this.adminRepository.create(createAdmin);
    return this.adminRepository.save(data);
  }

  async findAllAdmin(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOneAdmin(id: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCompanyDto: UpdateAdminDto): Promise<Admin> {
    const company = await this.companyService.findOne(
      updateCompanyDto.companyId,
    );

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    await this.adminRepository.update(id, updateCompanyDto);
    return await this.adminRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
