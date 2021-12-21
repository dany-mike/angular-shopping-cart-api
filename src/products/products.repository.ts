import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategoryDto } from './dto/product-category.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  createProduct = async (
    productDto: CreateProductDto,
    productCategoryDto: ProductCategoryDto,
  ) => {
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
}
