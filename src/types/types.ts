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
  products: allProductsTypes[];
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
  name: string;
  materialName: string;
  itemTitle: string;
  buyingPrice: number;
  sellingType: string;
  sellingPrice: number;
  itemType: string;
  normalPercentage: number;
  salePercentage?: number;
  stockClearingPrice?: number;
  itemIs: string;
  itemColor: string;
  itemSize: string;
  description: string;
}
