export interface IStudentSubmission {
    courseId?: string,
    courseWorkId?: string,
    id?: string,
    userId?: string,
    creationTime?: string,
    updateTime?: string,
    state?: string, // enum(SubmissionState),
    late?: boolean,
    draftGrade?: number,
    assignedGrade?: number,
    alternateLink?: string,
    courseWorkType?: string; // enum(CourseWorkType),
    associatedWithDeveloper?: boolean,

    // Union field content can be only one of the following?:
    assignmentSubmission?: {
        object(AssignmentSubmission)
    },
    shortAnswerSubmission?: {
        object(ShortAnswerSubmission)
    },
    multipleChoiceSubmission?: {
        object(MultipleChoiceSubmission)
    }

}