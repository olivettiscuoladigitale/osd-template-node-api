import {IDriveFile} from "./idrivefile";
import {IYoutubeVideo} from "./iyoutubevideo";
import {ILink} from "./ilink";
import {IForm} from "./iform";

export interface ICourseMaterial {
    driveFile?: IDriveFile;
    youTubeVideo?: IYoutubeVideo;
    link?: ILink;
    form?: IForm;
}
