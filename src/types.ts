import { ReactElement } from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  isPublic: string;
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

