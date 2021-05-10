export interface User {
  name: string;
  id: string;
  image?: string;
  email: string;
}

export interface CreatedUser {
  createUser: User & { token: string };
}

export interface UserLogin {
  login: User & { token: string };
}
