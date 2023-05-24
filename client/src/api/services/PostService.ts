
import axiosInstance from "../axiosInstance";
import { Comment } from "../models/Comment";
import { Like } from "../models/Like";
import { Post } from "../models/Post";
import { GenericResponse } from "./AuthService";

export const PostService = {
    getPosts: () => {
        return axiosInstance.get<Post[]>("/posts");
    },
    getPost: (id: string) => {
        return axiosInstance.get<Post>(`/posts/${id}`);
    },
    createPost: (content: string) => {
        return axiosInstance.post<Post>("/posts", { content });
    },
    updatePost: (id: string, content: string) => {
        return axiosInstance.put<Post>(`/posts/${id}`, { content });
    },
    deletePost: (id: string) => {
        return axiosInstance.delete<void>(`/posts/${id}`);
    },
    getPostLikes: (id: string) => {
        return axiosInstance.get<Like[]>(`/posts/${id}/likes`);
    },
    likePost: (id: string) => {
        return axiosInstance.post<Like>(`/posts/${id}/likes`);
    },
    unlikePost: (id: string) => {
        return axiosInstance.delete<GenericResponse>(`/posts/${id}/likes`);
    },
    getPostComments: (id: string) => {
        return axiosInstance.get<Comment[]>(`/posts/${id}/comments`);
    },
    addPostComment: (id: string, content: string) => {
        return axiosInstance.post<Comment>(`/posts/${id}/comments`, { content });
    },
    updatePostComment: (id: string, commentId: string, content: string) => {
        return axiosInstance.put<Comment>(`/posts/${id}/comments/${commentId}`, { content });
    },
    deletePostComment: (id: string, commentId: string) => {
        return axiosInstance.delete<void>(`/posts/${id}/comments/${commentId}`);
    }
};

