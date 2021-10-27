interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export { ICreateUserDTO };
