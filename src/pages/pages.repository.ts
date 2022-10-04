import { EntityRepository, Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';

@EntityRepository(Page)
export class PagesRepository extends Repository<Page> {
  createPage = async (createPageDto: CreatePageDto): Promise<Page> => {
    const { name } = createPageDto;

    const page = this.create({
      name: name.toLowerCase(),
    });

    await this.save(page);
    return page;
  };

  updatePage = async (
    createPageDto: CreatePageDto,
    page: Page,
  ): Promise<Page> => {
    return this.save({
      ...createPageDto,
      id: page.id,
    });
  };
}
