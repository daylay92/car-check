export interface LoginDetails {
    email : string;
    password: string;
}

export interface TokenData {
    token: string;
}

export interface DecodedResponse {
    _id : string;
    email: string;
    isAdmin: boolean;
}

export interface LoginResponse {
    _id : string;
    email: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    token:  string;
}

export interface IsValid {
    isValid: boolean;
}

export interface SignupDetails {
    email:  string;
    password:  string;
    firstName:  string;
    lastName: string;
}

export interface AuthService {
    login (data: LoginDetails): Promise<LoginResponse>;
    verifyCredentials(data: LoginDetails): Promise<IsValid>;
    signup(data: SignupDetails): Promise<LoginResponse>;
    verifyLogin(data: TokenData): IsValid;
    getDecoded(data: TokenData): DecodedResponse;
    verifyAdmin(data: TokenData): IsValid;
}