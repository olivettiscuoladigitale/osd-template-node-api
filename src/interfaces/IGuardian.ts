export interface IGuardian {

    studentId: string,
    guardianId: string,
    guardianProfile: {
        object(UserProfile)
    },
    invitedEmailAddress?: string,

}