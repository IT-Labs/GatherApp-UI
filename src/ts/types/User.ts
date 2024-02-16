export type UserDetails = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  countryId: string | null;
  countryName: string | null;
  profilePicture: string;
  createdAt: Date;
  editedAt: Date | null;
  roleName: string;
};

export type UserSignUp = {
  password: string;
  confirmPassword: string;
} & UserDetails;

export type UserLogin = {
  email: string;
  password: string;
};

export type UserLoginSSO = {
  idToken: string;
};

export type LoginResponse = {
  user: UserDetails;
  token: string;
  expirationDate: any;
};

export type RefreshTokenResponse = {
  status: number;
  data: {
    token: string;
    expires: Date;
  };
};

export type UserAdminPanel = {
  totalPageCount: number;
  totalItemCount: number;
  users: UserDetails[];
};

export type InviteeOption = {
  value: string;
  label: string;
  profilePicture: string;
  email: string;
};

export type CountryOption = {
  countryId: string;
  countryName: string;
};

export type Countries = {
  countries: CountryOption[];
};

export type UserByName = {
  name: string;
  countries: string[];
};
