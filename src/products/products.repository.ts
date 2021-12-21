import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProductDto } from './product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  createProduct = async (productDto: ProductDto) => {
    const { title, price, image, description, category } = productDto;

    const product = this.create({
      title,
      description,
      price,
      image,
      category,
    });

    await this.save(product);
    return product;
  };
}
