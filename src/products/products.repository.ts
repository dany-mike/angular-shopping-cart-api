import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../category/category.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  createProduct = async (
    productDto: CreateProductDto,
    category?: Category,
  ): Promise<Product> => {
    const { name, price, image, description, quantity } = productDto;

    const product = this.create({
      name,
      description: description ? description : '',
      price,
      image: image ? image : '',
      category: category ? category : undefined,
      quantity,
    });

    await this.save(product);
    return product;
  };

  updateProductQuantity = async (
    updatedQuantity,
    product,
  ): Promise<Product> => {
    return this.save({
      ...product,
      quantity: updatedQuantity,
    });
  };

  updateProductQuantities = async (products: Product[]): Promise<void> => {
    for await (const product of products) {
      this.save({
        ...product,
        quantity: product.quantity,
      });
    }
  };

  findOneProduct = async (id: number): Promise<Product> => {
    return this.findOne(id);
  };

  findProducts = async (): Promise<Product[]> => {
    return this.find();
  };

  updateProduct = async (
    id: number,
    createProductDto: CreateProductDto,
  ): Promise<Product> => {
    const result = await this.findOne(id);

    if (!result) {
      throw new BadRequestException(`product with id: ${id} not found`);
    }
    return this.save({
      ...createProductDto,
      id: result.id,
    });
  };

  deleteProduct = async (id: number): Promise<Product> => {
    this.delete(id);
    return await this.findOne(id);
  };
}
