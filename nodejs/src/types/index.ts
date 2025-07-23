export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateUserRequest = {
    name: string;
    email: string;
};

export type UpdateUserRequest = {
    id: string;
    name?: string;
    email?: string;
};

export type UserResponse = {
    user: User;
};

export type ErrorResponse = {
    message: string;
};