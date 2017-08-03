export interface IGuardianInvitation
{
    studentId?: string,
        invitationId?: string,
        invitedEmailAddress?: string,
        state?: string, // enum(GuardianInvitationState), PENDING | COMPLETE
        creationTime?: string,
}