import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from 'src/category/category.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  createProduct = async (
    productDto: CreateProductDto,
    category?: Category,
  ): Promise<Product> => {
    const { name, price, image, description } = productDto;

    const product = this.create({
      name,
      description: description ? description : '',
      price,
      image: image ? image : '',
      category: category ? category : undefined,
    });

    await this.save(product);
    return product;
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
      return null;
    }
    return this.save({
      ...createProductDto,
      id,
    });
  };

  deleteProduct = async (id: number): Promise<Product> => {
    this.delete(id);
    return await this.findOne(id);
  };
}
