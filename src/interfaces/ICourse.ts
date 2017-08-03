export interface ICourse {
    id?: string,
    name?: string,
    section?: string,
    descriptionHeading?: string,
    description?: string,
    room?: string,
    ownerId?: string,
    creationTime?: string,
    updateTime?: string,
    enrollmentCode?: string,
    courseState?: string,
    alternateLink?: string,
    teacherGroupEmail?: string,
    courseGroupEmail?: string,
    teacherFolder?: {
        object(DriveFolder)
    },
    courseMaterialSets?: [
        {
            object(CourseMaterialSet)
        }
        ],
    guardiansEnabled?: boolean,
    user?: {
        id?: string,
        name?: {
            givenName?: string,
            familyName?: string,
            fullName?: string
        }
        emailAddress?: string,
        photoUrl?: string

    }
    _studentNumber?: number
    _students?: [
        {
            object(Student)
        }
        ],
    _courseProperties?: [{theme?: string}]
}
