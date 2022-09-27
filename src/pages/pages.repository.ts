import { EntityRepository, Repository } from 'typeorm';
import { Page } from './page.entity';

@EntityRepository(Page)
export class PagesRepository extends Repository<Page> {}
