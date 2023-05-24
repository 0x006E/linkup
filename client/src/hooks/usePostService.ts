import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Comment } from "../api/models/Comment";
import { Like } from "../api/models/Like";
import { Post } from "../api/models/Post";
import { GenericResponse } from "../api/services/AuthService";
import { PostService } from "../api/services/PostService";


export default function usePostService() {
    const queryClient = useQueryClient()
    const useAddPost = useMutation<Post, AxiosError<GenericResponse>, { content: string }>({
        mutationFn: async (post) => {
            const { content } = post;
            const { data } = await PostService.createPost(content);
            return data;
        },
        onSuccess: data => {
            queryClient.setQueryData<Post[]>(['posts'], (old) => [data, ...(old ?? [])])
        }
    }
    );

    const useUpdatePost = useMutation<Post, AxiosError<GenericResponse>, { id: string, content: string }>({
        mutationFn: async (post) => {
            const { id, content } = post;
            const { data } = await PostService.updatePost(id, content);
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData<Post[]>(['posts'], (old) => {
                const items = old?.map((post) => {
                    if (post._id === variables.id) {
                        return data;
                    }
                    return post;
                });
                console.log(data)
                return items;
            })
        },
    });

    const useDeletePost = useMutation<void, AxiosError<GenericResponse>, { id: string }>({
        mutationFn: async (post) => {
            const { id } = post;
            await PostService.deletePost(id);
            return;
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData<Post[]>(['posts'], (old) => {
                return old?.filter((post) => post._id !== variables.id);
            }
            )
        }
    }
    );

    const useGetPostLikes = (id: string) => useQuery<Like[], AxiosError<GenericResponse>>({
        queryKey: ["postLikes", id],
        queryFn: async () => {
            const { data } = await PostService.getPostLikes(id);
            return data;
        }
    }
    );
    const useLikePost = useMutation<Like, AxiosError<GenericResponse>, { id: string }>({
        mutationFn: async (post) => {
            const { id } = post;
            const { data } = await PostService.likePost(id);
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData<Like[]>(['postLikes', variables.id], (old) => [...(old ?? []), data])
        }
    });
    const useUnlikePost = useMutation<GenericResponse, AxiosError<GenericResponse>, { id: string, likeId: string }>({
        mutationFn: async (post) => {
            const { id } = post;
            const { data } = await PostService.unlikePost(id);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData<Like[]>(['postLikes', variables.id], (old) => {
                return old?.filter((like) => like._id !== variables.likeId);
            })
        }
    });
    const useGetPostComments = (id: string) => useQuery<Comment[], AxiosError<GenericResponse>>({
        queryKey: ["postComments", id],
        queryFn: async () => {
            const { data } = await PostService.getPostComments(id);
            return data;
        }
    }
    );
    const useAddPostComment = useMutation<Comment, AxiosError<GenericResponse>, { id: string, content: string }>({
        mutationFn: async (post) => {
            const { id, content } = post;
            const { data } = await PostService.addPostComment(id, content);
            return data;
        },
        onSuccess: data => {
            queryClient.setQueryData<Comment[]>(['postComments', data.postId], (old) => [...(old ?? []), data])
        }

    });
    const useUpdatePostComment = useMutation<Comment, AxiosError<GenericResponse>, { id: string, commentId: string, content: string }>({
        mutationFn: async (post) => {
            const { id, commentId, content } = post;
            const { data } = await PostService.updatePostComment(id, commentId, content);
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData<Comment[]>(['postComments', variables.id], (old) => {
                const items = old?.map((comment) => {
                    if (comment._id === variables.commentId) {
                        return data;
                    }
                    return comment;
                });
                return items;
            }
            )
        }
    }
    );
    const useDeletePostComment = useMutation<void, AxiosError<GenericResponse>, { id: string, commentId: string }>({
        mutationFn: async (post) => {
            const { id, commentId } = post;
            await PostService.deletePostComment(id, commentId);
            return;
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData<Comment[]>(['postComments', variables.id], (old) => {
                return old?.filter((comment) => comment._id !== variables.commentId);
            })
        }
    }
    );
    const useGetPosts = useQuery<Post[], AxiosError<GenericResponse>>({
        queryKey: ["posts"],
        queryFn: async () => {
            const { data } = await PostService.getPosts();
            return data;
        }
    }
    );



    return { useAddPost, useUpdatePost, useDeletePost, useGetPostLikes, useLikePost, useUnlikePost, useGetPostComments, useAddPostComment, useUpdatePostComment, useDeletePostComment, useGetPosts };
};