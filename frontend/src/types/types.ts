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
  id: number;
  sellerName: string;
  materialName: string;
  itemTitle: string;
  itemIs?: string;
  itemColor: string;
  itemSize: string;
  description: string;
  itemType: string;
  code: string;
  buyingPrice: number;
  sellingPrice: number;
  salePrice?: number;
  profitPercentage?: number;
  numberOfItems: number;
  status: string;
  sellingType?: string;
  salePercentage?: number;
}

export interface postItemTypes {
  id?: number;
  sellerName: string;
  materialName: string;
  itemTitle: string;
  itemIs?: string;
  itemColor: string;
  itemSize: string;
  description: string;
  itemType: string;
  code: string;
  buyingPrice: number;
  sellingPrice: number;
  salePrice?: number;
  profitPercentage?: number;
  numberOfItems: number;
  status: string;
  sellingType?: string;
  salePercentage?: number;
}

export interface itemTypes2 {
  id: number;
  sellerName: string;
  materialName: string;
  itemTitle: string;
  itemIs?: string;
  itemColor: string;
  itemSize: string;
  description: string;
  itemType: string;
  code: string;
  buyingPrice: number;
  sellingPrice: number;
  salePrice?: number;
  profitPercentage?: number;
  numberOfItems: number;
  status: string;
  sellingType?: string;
  salePercentage?: number;
}

export interface discountItemsTypes {
  id?: number;
  sellerName: string;
  materialName: string;
  itemTitle: string;
  itemIs?: string;
  itemColor: string;
  itemSize: string;
  description: string;
  itemType: string;
  code: string;
  buyingPrice: number;
  sellingPrice?: number;
  salePrice?: number;
  numberOfItems: number;
  status: string;
  salePercentage?: number;
  stockClearingPrice?: number;
}

export interface allDataObject {
  itemsData: itemTypes2[];
  saleItemsData: itemTypes2[];
  stockClearItemsData: itemTypes2[];
}
