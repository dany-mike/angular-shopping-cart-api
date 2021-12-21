export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export enum Category {
  ELECTRONICS = 'electronics',
  JEWELRY = 'jewelry',
  MENS_CLOTHING = "men's clothing",
  WOMENS_CLOTHING = "women's clothing",
}
