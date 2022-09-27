import { ApiProperty } from '@nestjs/swagger';
import { TextBlock } from 'src/cms/text-block.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @OneToMany(() => TextBlock, (textBlock) => textBlock.id)
  textBlock: TextBlock;
}
