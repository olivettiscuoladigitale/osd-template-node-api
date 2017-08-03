export interface ITeacher{

    courseId?: string,
    userId?: string,
    profile?: {
        object(UserProfile)
    },

}