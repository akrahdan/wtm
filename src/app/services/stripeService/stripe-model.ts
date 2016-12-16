export interface AuthData {
    accessToken: string;
    client: string;
    expiry: string;
    tokenType: string;
    uid: string;
}

export interface UserData {
    id: number;
    provider: string;
    uid: string;
    name: string;
    nickname: string;
    image: any;
    email: string;
}

// Configuration Options

export interface UserType {
    name: string;
    path: string;
}

export interface StripeData {
    amount: number;
    token: string;
}


export interface GlobalOptions {
    headers?: { [key: string]: string; }
}

export interface StripeTokenOptions {
    apiPath?: string;

    signInPath?: string;
    stripeChargePath?: string;
    signInRedirect?: string;
    signInStoredUrlStorageKey?: string;
    signOutFailedValidate?:     boolean;

    signOutPath?: string;
    validateTokenPath?: string;

    globalOptions?: GlobalOptions;
}