import { EntityRepository, Repository } from 'typeorm';
import { TextBlock } from './text-block.entity';

@EntityRepository(TextBlock)
export class TextBlockRepository extends Repository<TextBlock> {}
