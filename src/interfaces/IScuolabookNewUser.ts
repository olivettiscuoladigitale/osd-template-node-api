export interface IScuolabookNewUser {
    firstname: string,
    lastname: string,
    password: string,
    confirmation?: string,
    region: string,
    city: string,
    street: string,
    postcode: string,
    privacy: boolean | string,
    direct_marketing?: boolean | string,
    user_profiling?: boolean | string,
    third_party_marketing?: boolean | string,
    method?: string,
    json?: boolean | string,
    token?: string
}
