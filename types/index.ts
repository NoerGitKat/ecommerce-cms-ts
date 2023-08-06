export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Billboard {
  id: string;
  storeId: string;
  store: Store;
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
