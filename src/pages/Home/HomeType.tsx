interface Product {
  id: number;
  username: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
}

export interface UsersData {
  status: boolean;
  message: string;
  data: Product[];
}

export interface UserApiResponse {
  data: UsersData;
  status: number;
  statusText: string;
}
