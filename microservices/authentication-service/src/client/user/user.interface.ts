export interface UserId {
    id : string;
}

export interface UserEmail {
    email : string;
}

export interface UserResponse {
    _id : string;
    firstName: string;
    lastName: string;
    hash: string;
    email: string;
    // createdAt: string;
    // updatedAt: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    hash: string;
    email: string;
}
export interface UserId {
    id : string;
}

export interface UserEmail {
    email : string;
}

export interface UserResponse {
    _id : string;
    firstName: string;
    lastName: string;
    hash: string;
    email: string;
    isAdmin: boolean;
    // createdAt: string;
    // updatedAt: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    hash: string;
    email: string;
}

export interface NewUser {
    _id : string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
}

export interface UserService{
    create(data: UserData): Promise<NewUser>;
    findUser(data: UserId): Promise<UserResponse>;
    findUserByEmail(data: UserEmail): Promise<UserResponse>;
}

export interface NewUser {
    _id : string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserService{
    create(data: UserData): Promise<NewUser>;
    findUser(data: UserId): Promise<UserResponse>;
    findUserByEmail(data: UserEmail): Promise<UserResponse>;
}