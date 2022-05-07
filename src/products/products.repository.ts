import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  createProduct = async (productDto: CreateProductDto): Promise<Product> => {
    const { title, price, image, description } = productDto;

    const product = this.create({
      title,
      description: description ? description : '',
      price,
      image: image ? image : '',
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
    return this.save({
      ...createProductDto,
      id: Number(id),
    });
  };

  deleteProduct = async (id: number): Promise<Product> => {
    this.delete(id);
    return await this.findOne(id);
  };
}
