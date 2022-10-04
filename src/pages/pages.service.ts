import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CmsService } from 'src/cms/cms.service';
import { TextBlock } from 'src/cms/text-block.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';
import { PagesRepository } from './pages.repository';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PagesRepository)
    private pagesRepository: PagesRepository,
    @Inject(forwardRef(() => CmsService))
    private cmsService: CmsService,
  ) {}

  async createPage(createPageDto: CreatePageDto): Promise<Page> {
    const { name } = createPageDto;
    const pagesList = await (
      await this.getPages()
    ).map((page) => page.name.toLowerCase());

    if (pagesList.includes(name.toLowerCase())) {
      throw new BadRequestException(
        `Page ${name.toLowerCase()} already exists`,
      );
    }

    return await this.pagesRepository.createPage(createPageDto);
  }

  async getPageTextBlocks(name: string): Promise<TextBlock[]> {
    const page = await this.getPageByName(name);
    return await this.cmsService.getPageTextBlocks(page);
  }

  async getPageByName(name) {
    return await this.pagesRepository.findOne({
      where: { name },
    });
  }

  async getPages() {
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
