// export interface allProductsTypes {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: [];
// }

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
  sellerName: string;
  materialName: string;
  itemTitle: string;
  itemColor: string;
  itemSize: string;
  description: string;
  itemType: string;
  code: string;
  status: string;
  numberOfItems: number;
  buyingPrice?: number;
  startingPrice: number;
  profitPercentage?: number | null;
  salePrice?: number | null;
  salePercentage?: number | null;
  stockClearingPrice?: number | null; // 12 variables
}

export interface NormalStoreTypes extends itemTypes {
  id?: number;
}

export interface allDataTypes extends itemTypes {
  id: number;
}

export interface composeDataObjects {
  itemsData: NormalStoreTypes[];
  saleItemsData: allDataTypes[];
  stockClearItemsData: allDataTypes[];
}
