export interface IUserLogin {
  email: string,
  password: string
}

export interface IUserData {
  id: string
  name: string;
  email: string;
  phone: string;
}

export interface IUser {
  id: string
  username: string;
  email: string;
  phone: string;
  condo_id: string;
  role: number;
  session: {
    expiresIn: number
  }
}

export interface IUserCreate extends IUserData {
  password: string;
  condo_id: string;
}

export interface IGetItemsQuery {
  search: string;
  category: string;
}

export interface IGetUsersQuery {
  role: number;
  condo_id: string;
  search: string;
}

export interface IBaseGroupItems {
  products: IProdutos;
  services: IProdutos;
  condominios: ICondos;
}

export interface ICategories {
  id: string;
  name: string;
  name_clean: string;
  description: string
}

export interface IProdutos {
  length?: number
  categories: ICategories[];
  values: Record<string, IItem[]>;
}

export interface IItem {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  situation: number;
  seler_id: string;
  seler_phone: string;
  category_id: string;
  images: string[];
}

export interface ICondos {
  id: string;
  name: string;
  name_clean: string;
  description: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at?: null;
  deleted_at?: null;
  images?: (string)[];
}

export interface ISeller {
  id: string;
  name: string;
  email: string;
  role: number;
  phone: string;
  created_at: string;
}
