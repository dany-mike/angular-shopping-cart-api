import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';
import { PagesRepository } from './pages.repository';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PagesRepository)
    private pagesRepository: PagesRepository,
  ) {}

  async createPage(createPageDto: CreatePageDto): Promise<Page> {
    const { name } = createPageDto;
    const pagesList = await (
      await this.getPages()
    ).map((page) => page.name.toLowerCase());

    console.log(pagesList);

    if (pagesList.includes(name.toLowerCase())) {
      throw new BadRequestException(
        `Page ${name.toLowerCase()} already exists`,
      );
    }

    return await this.pagesRepository.createPage(createPageDto);
  }

  async getPages(): Promise<Page[]> {
    return await this.pagesRepository.find();
  }

  async updatePage(id: number, createPageDto: CreatePageDto): Promise<Page> {
    const page = await this.getPageById(id);

    return this.pagesRepository.updatePage(createPageDto, page);
  }

  async deletePage(id: number): Promise<void> {
    await this.getPageById(id);
    await this.pagesRepository.delete(id);
  }

  async getPageById(id: number): Promise<Page> {
    const page = await this.pagesRepository.findOne(id);

    if (!page) {
      throw new BadRequestException(`Page with id: ${id} not found`);
    }

    return page;
  }
}
