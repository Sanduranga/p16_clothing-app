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
  id: number;
  salePrice: number;
  salePercentage: number;
  itemId?: itemTypes;
}

export interface stockClearItemsTypes {
  id: number;
  stockClearingPrice: number;
  itemId?: itemTypes;
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
  profitPercentage?: number;
  saleItems: saleItemsTypes | null;
  stockClearItems: stockClearItemsTypes | null; // 15 variables
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
