export interface Like {
    userId:    UserID;
    postId:    string;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface UserID {
    _id:  string;
    name: string;
}
