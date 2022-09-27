import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Page } from 'src/pages/page.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TextBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  blockName: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @ManyToOne(() => Page, (page) => page.id)
  page: Page;
}
