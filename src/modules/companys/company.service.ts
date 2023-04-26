import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { code } = createCompanyDto;
    const companyData = await this.companyRepository.findOne({
      where: { code },
    });
    if (companyData) {
      throw new ConflictException('Company has already existed!');
    }
    return this.companyRepository.save(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const companyData = await this.companyRepository.findOne({
      where: { code: updateCompanyDto?.code },
    });
    if (!companyData) {
      throw new NotFoundException('Company not found');
    }
    await this.companyRepository.update(id, updateCompanyDto);
    return await this.companyRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
