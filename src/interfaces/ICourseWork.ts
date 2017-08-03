

export interface ICourseWork {
    courseId?: string,
    id?: string,
    title?: string,
    description?: string,
    materials?: [
        {
            object(IMaterial)
        }
        ],
    state?: string, // enum
    alternateLink?: string,
    creationTime?: string,
    updateTime?: string,
    dueDate?: {
        object(Date)
    },
    dueTime?: {
        object(TimeOfDay)
    },
    maxPoints?: number,
    workType?: string, // enum
    associatedWithDeveloper?: boolean,
    submissionModificationMode?: string,

    // Union field details can be only one of the following?:
    assignment?: {
        object(Assignment)
    },
    multipleChoiceQuestion?: {
        object(MultipleChoiceQuestion)
    },
    // End of list of possible types for union field details.
}