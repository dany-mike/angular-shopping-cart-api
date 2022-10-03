import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagesService } from 'src/pages/pages.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlock } from './text-block.entity';
import { TextBlockRepository } from './text-block.repository';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(TextBlock)
    private textBlockRepository: TextBlockRepository,
    private pagesService: PagesService,
  ) {}

  async getPageTextBlocks(pageId: number): Promise<TextBlock[]> {
    const page = await this.pagesService.getPageById(pageId);
    return this.textBlockRepository.find({
      where: {
        page,
      },
    });
  }

  async getTextBlockById(id: number): Promise<TextBlock> {
    const textBlock = await this.textBlockRepository.findOne(id);

    if (!textBlock) {
      throw new BadRequestException(`Text with id: ${id} not found`);
    }

    return textBlock;
  }

  async createTextBlock(
    createTextBlockDto: CreateTextBlockDto,
  ): Promise<TextBlock> {
    const { pageId, blockName } = createTextBlockDto;
    if (await this.isBlockNameExist(blockName)) {
      throw new BadRequestException(`Block name "${blockName}" must be unique`);
    }
    const page = await this.pagesService.getPageById(pageId);
    return await this.textBlockRepository.createTextBlock(
      createTextBlockDto,
      page,
    );
  }

  async deleteTextBlock(id: number): Promise<void> {
    await this.getTextBlockById(id);
    await this.textBlockRepository.delete(id);
  }

  async updateTextBlock(
    id: number,
    createTextBlockDto: CreateTextBlockDto,
  ): Promise<TextBlock> {
    const textBlock = await this.getTextBlockById(id);

    return this.textBlockRepository.updateTextBlock(
      createTextBlockDto,
      textBlock,
    );
  }

  async isBlockNameExist(blockName: string): Promise<boolean> {
    const blocks = await this.textBlockRepository.find();

    if (
      blocks
        .map((block) => block.blockName.toLowerCase())
        .includes(blockName.toLowerCase())
    ) {
      return true;
    }

    return false;
  }
}
