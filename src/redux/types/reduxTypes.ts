export interface allProductsTypes {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [];
}
export interface getDatatypes {
  products: allProductsTypes[];
  limite: number;
  skip: number;
  total: number;
}
