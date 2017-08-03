export interface IAttachment {


    // Union field material can be only one of the following?:
    driveFile?: {
        object(SharedDriveFile)
    },
    youtubeVideo?: {
        object(YouTubeVideo)
    },
    link?: {
        object(Link)
    },
    form?: {
        object(Form)
    }

}