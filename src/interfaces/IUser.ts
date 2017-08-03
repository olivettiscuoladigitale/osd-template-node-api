export interface IUser {
    email?: string,
    name?: string,
    given_name?: string,
    family_name?: string,
    picture?: string,
    link?: string,
    gender?: string,
    locale?: string,
    hd?: string,
    [propName: string]: any;
}
