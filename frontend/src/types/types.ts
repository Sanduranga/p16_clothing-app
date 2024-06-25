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
  numberOfItems: number;
  status: string;
  buyingPrice?: number;
}

export interface NormalStoreTypes extends itemTypes {
  id?: number;
  sellingPrice: number;
  profitPercentage: number;
}

export interface saleStoreTypes extends itemTypes {
  id: number;
  sellingPrice: number;
  salePrice: number;
  sellingType: string;
  salePercentage: number;
}

export interface stockClearingTypes extends itemTypes {
  id: number;
  sellingPrice: number;
  stockClearingPrice: number;
}

export interface allDataTypes
  extends itemTypes,
    saleStoreTypes,
    stockClearingTypes {
  sellingPrice: number;
  profitPercentage: number;
}

export interface composeDataObjects {
  itemsData: NormalStoreTypes[];
  saleItemsData: saleStoreTypes[];
  stockClearItemsData: stockClearingTypes[];
}
