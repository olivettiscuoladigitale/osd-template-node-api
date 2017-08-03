export interface IStudent{

    courseId?: string,
    userId?: string,
    profile?: {
        object(UserProfile)
    },
    studentWorkFolder?: {
        object(DriveFolder)
    }

}