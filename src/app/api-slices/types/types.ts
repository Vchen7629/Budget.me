export type email = {
    auth: {
        email: string
    }
}

export type username = {
    auth: {
        username: string | null;
    }
}

export type userId = {
    auth: {
        userId: string
    }
}

export type Refresh = {
    accessToken: string;
    userId: string;
    username: string
}

export type LoginCredentials = {
    username: string;   
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    userId: string;
    username: string;
    email: string;
}
