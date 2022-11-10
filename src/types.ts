import { ReactElement } from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  isPublic: string;
};

export type LoginInput = {
  email?: string;
  password?: string;
};

export type RegisterInput = {
  email: string;
  password: string;
};

