export interface IJwtSettings {
    secret: string,
    audience?: string,
    issuer?: string,
    requestProperty?: string,
    resultProperty?: string,
    credentialsRequired: boolean,
    isRevoked: any,
    [propName: string]: any;
}


export interface IJwt {
    unless: Array<string>,
    settings: IJwtSettings
    [propName: string]: any;
}

