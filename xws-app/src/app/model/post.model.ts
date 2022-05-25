import { Comment } from "./comment.model"

export class Post {
    Id: string
    Description: string
    Link: string
    Image: string
    User: string
    LikeList: string[]
    DislikeList: string[]
    CommentList: Comment
}
