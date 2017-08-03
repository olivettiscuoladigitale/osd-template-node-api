export interface IStoreCredentials {
    access_token: string,
    expiry_date: string,
    id_token: string,
    refresh_token?: string,
    token_type: string,
    userId: string
}
