export interface Comment {
    _id:       string;
    content:   string;
    userId:    UserID;
    postId:    string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface UserID {
    _id:  string;
    name: string;
}
