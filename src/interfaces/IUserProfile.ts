export interface IUserProfile {
    id?: string,
    name?: {

        givenName: string,
        familyName: string,
        fullName: string,

    },
    emailAddress?: string,
    photoUrl?: string,
    permissions?: [
        {
           string // enum: PERMISSION_UNSPECIFIED |  CREATE_COURSE
        }
        ]
}