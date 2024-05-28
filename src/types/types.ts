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
export interface appControllerSliceTypes {
  drawer: boolean;
  signInForm: boolean;
  loggedUser: {
    name: string;
    email: string;
    loggedIn: boolean;
  };
}
export interface getDatatypes {
  products: itemTypes[];
  limite: number;
  skip: number;
  total: number;
}
export interface userlogingTypes {
  name: string;
  email: string;
  password: string;
  userType: string;
}

export interface itemTypes {
  id?: number;
  sellerName: string;
  materialName: string;
  itemTitle: string;
  itemIs?: string;
  itemColor: string;
  itemSize: string;
  description: string;
  itemType: string;
  sellingType?: string;
  code: string;
  buyingPrice: number;
  sellingPrice: number;
  salePrice?: number;
  profitPercentage: number;
  salePercentage?: number;
  stockClearingPrice?: number;
  numberOfItems: number;
}
