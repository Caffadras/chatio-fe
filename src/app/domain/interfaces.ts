export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto{
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface Token{
  token: string;
}
