

export interface User {
  // User is the person/business logged in
  id: string;
  userNames: string;
  businessName: string;
  phone: string;
  email: string;
  role: string;
  token: string;
}

/*export interface CredentialsBusiness {
  taxId: string,
  businessTaxId: string,
}*/

export interface CredentialsUser {
  id: string,
  password: string
}

export interface PasswordChange {
  currentPassword: string,
  newPassword: string
}


