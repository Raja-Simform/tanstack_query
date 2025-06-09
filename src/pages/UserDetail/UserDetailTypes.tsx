export interface Product {
  id: number;
  username: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  isBlock: boolean;
  isAdmin: boolean;
  image: string | null;
}

export interface UsersData {
  status: boolean;
  message: string;
  data: Product;
}

// export interface UserDetailApiResponse {
//   data: UsersData;
//   status: number;
//   statusText: string;
// }
