import { Button, Card, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { FaComments, FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { HiThumbUp } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { Post as P } from '../api/models/Post';
import { GenericResponse } from '../api/services/AuthService';
import usePostService from '../hooks/usePostService';
import useAuthStore from '../store';
import CommentModal from './CommentModal';
import LikesModal from './LikesModal';

export interface PostProps extends Omit<P, '__v'> { }

function Post(props: PostProps) {
    const { content, userId, _id, createdAt } = props;
    const ourUserId = useAuthStore(state => state.details?._id);
    const isOurPost = ourUserId === userId._id;
    const [show, setShow] = useState(false);
    const [showLikes, setShowLikes] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const [originalContent, setOriginalContent] = useState(content);
    const { useUpdatePost, useDeletePost } = usePostService();
    const { mutateAsync: updatePost, isLoading: isUpdatingPost } = useUpdatePost;
    const { mutateAsync: deletePost } = useDeletePost;

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedContent(originalContent);
    };

    const handleDelete = () => {
        toast.promise(deletePost({ id: _id }), {
            pending: 'Deleting post...',
            success: "Post deleted successfully",
            error: {
                render({ data }) {
                    return (data as GenericResponse)?.message || 'Something went wrong';
                }
            }
        });
    };

    const handleSave = () => {
        toast.promise(updatePost({ id: _id, content: editedContent }), {
            pending: 'Updating post...',
            success: "Post updated successfully",
            error: {
                render({ data }) {
                    return (data as GenericResponse)?.message || 'Something went wrong';
                }
            }
        }).then(() => {
            setIsEditing(false);
            setOriginalContent(editedContent);
        });
    };

    return (
        <Card className="max-w-lg mx-auto mt-4">
            <div className="flex items-center justify-between max-h-96 overflow-auto">
                <h5 className="text-md text-gray-600 font-italic tracking-tight truncate dark:text-white">
                    {userId.name} posted
                </h5>
                {isOurPost && <div className='flex'>
                    {!isEditing ? (
                        <>
                            <FaEdit onClick={handleEdit} className="text-blue-500 cursor-pointer" />
                            <FaTrash onClick={handleDelete} className="text-red-500 ml-2 cursor-pointer" />
                        </>
                    ) : (
                        <>
                            <FaSave onClick={handleSave} className="text-blue-500 cursor-pointer" />
                            <FaTimes onClick={handleCancel} className="text-red-500 ml-2 cursor-pointer" />
                        </>
                    )}
                </div>}
            </div>
            {!isEditing ? (
                <p className="font-normal text-gray-700 dark:text-gray-400 text-lg line-clamp-4">
                    {content}
                </p>
            ) : (
                <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="border rounded-md p-2 w-full h-full"
                    disabled={isUpdatingPost}
                />
            )}
            <div className="flex items-center justify-end">
                <span className="text-sm text-gray-600 font-italic tracking-tight dark:text-white">
                    {new Date(createdAt).toLocaleDateString()}
                </span>
            </div>
            <div className="flex items-center justify-between gap-3">
                <Button outline={true} gradientDuoTone="greenToBlue" fullSized={true} onClick={() => setShowLikes(true)}>
                    <div className="flex items-center gap-4 justify-center">
                        <HiThumbUp /> <span>Likes</span>
                    </div>
                </Button>
                <LikesModal show={showLikes} onClose={() => setShowLikes(false)} postId={_id} userId={userId} />
                <Button
                    outline={true}
                    gradientDuoTone="tealToLime"
                    fullSized={true}
                    onClick={() => setShow(true)}
                >
                    <div className="flex items-center gap-4 justify-center">
                        <FaComments /> <span>Comments</span>
                    </div>
                </Button>
                <CommentModal show={show} onClose={() => setShow(false)} postId={_id} />
            </div>
        </Card>
    );
}

export default Post;
