export interface Product {
  id: number;
  username: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
}

export interface CardProps {
  products: Product[];
}
export enum View {
  Grid = "grid",
  List = "list",
}
export interface GridViewProps {
  products: Product[];
}
export interface ListViewProps {
  products: Product[];
}
