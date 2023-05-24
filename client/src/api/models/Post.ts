export interface Post {
    content:   string;
    userId:    UserID;
    _id:       string;
    createdAt: string;
    updatedAt: string;
    __v:       number;
}

export interface UserID {
    _id:  string;
    name: string;
}
