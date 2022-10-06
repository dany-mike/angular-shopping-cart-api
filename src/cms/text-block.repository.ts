import { Page } from '../pages/page.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlock } from './text-block.entity';

@EntityRepository(TextBlock)
export class TextBlockRepository extends Repository<TextBlock> {
  createTextBlock = async (
    createTextBlockDto: CreateTextBlockDto,
    page: Page,
  ): Promise<TextBlock> => {
    const { blockName, content } = createTextBlockDto;

    const textBlock = this.create({
      blockName,
      content,
      page,
    });

    await this.save(textBlock);
    return textBlock;
  };

  updateTextBlock = async (
    createTextBlockDto: CreateTextBlockDto,
    textBlock: TextBlock,
  ): Promise<TextBlock> => {
    return this.save({
      ...createTextBlockDto,
      id: textBlock.id,
    });
  };
}
