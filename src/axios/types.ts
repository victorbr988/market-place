export interface IUserLogin {
  email: string,
  password: string
}

export interface IBaseGroupItems {
  produtos: IProdutos;
  servicos: IProdutos;
  condominios: ICondos;
}
export interface IProdutos {
  categories: string[];
  values: Record<string, IItem[]>;
}

export interface IItem {
  id: string;
  name: string;
  description: string;
  price: number;
  situation: number;
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
