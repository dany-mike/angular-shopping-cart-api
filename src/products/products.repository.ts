import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategoryDto } from './dto/product-category.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  createProduct = async (
    productDto: CreateProductDto,
    productCategoryDto: ProductCategoryDto,
  ): Promise<Product> => {
    const { title, price, image, description } = productDto;
    const { category } = productCategoryDto;

    const product = this.create({
      title,
      description: description ? description : '',
      price,
      image: image ? image : '',
      category,
    });

    await this.save(product);
    return product;
  };

  findOneProduct = async (id: number): Promise<Product> => {
    return this.findOneOrFail(id);
  };

  findProducts = async (): Promise<Product[]> => {
    return this.find();
  };

  updateProduct = async (
    id: number,
    createProductDto: CreateProductDto,
    productCategoryDto: ProductCategoryDto,
  ): Promise<Product> => {
    return this.save({
      ...createProductDto,
      ...productCategoryDto,
      id: Number(id),
    });
  };

  deleteProduct = async (id: number): Promise<Product> => {
    this.delete(id);
    return await this.findOneOrFail(id);
  };
}
