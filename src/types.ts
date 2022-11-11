
export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  isPublic: string;
  user: string
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string,
  confirmPassword: string
};

export type BookInput = {
  title: string;
  author: string;
  description: string;
};

export type User = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  access_token?: string
  status?: string
  message?: string | string[]
  statusCode?: string
};

export type Signup = {
  status?: string;
  name?: string;
};


export type UserError = {
  message: string | string []
  status?: string
  statusCode?: string
};

export type BookResponse = {
  message: string 
  status?: string
};


