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

export interface saleItemsTypes {
  itemsCode: number;
  salePrice: number;
  salePercentage: number;
  items?: itemTypes;
}

export interface stockClearItemsTypes {
  itemsCode: number;
  stockClearingPrice: number;
  items?: itemTypes;
}

export interface itemTypes {
  code: number;
  sellerName: string;
  materialName: string;
  itemTitle: string;
  itemColor: string;
  itemSize: string;
  description: string;
  itemType: string;
  status: string;
  numberOfItems: number;
  buyingPrice?: number;
  startingPrice: number;
  profitPercentage?: number;
  saleItems: saleItemsTypes | null;
  stockClearItems: stockClearItemsTypes | null; // 15 variables
}

// export interface NormalStoreTypes extends itemTypes {
//   id?: number;
// }

// export interface allDataTypes extends itemTypes {
//   id: number;
// }

// export interface composeDataObjects {
//   itemsData: NormalStoreTypes[];
//   saleItemsData: allDataTypes[];
//   stockClearItemsData: allDataTypes[];
// }
