import { Button, Modal } from 'flowbite-react';
import { toast } from 'react-toastify';
import { UserID } from '../api/models/Like';
import { GenericResponse } from '../api/services/AuthService';
import usePostService from '../hooks/usePostService';

export interface LikesModalProps {
    show: boolean;
    onClose: () => void;
    postId: string;
    userId: UserID;
}

function LikesModal(props: LikesModalProps) {
    const { show, onClose, postId, userId } = props;
    const { useLikePost, useUnlikePost, useGetPostLikes } = usePostService();
    const { mutateAsync: likePost } = useLikePost;
    const { mutateAsync: unlikePost } = useUnlikePost;
    const { data: likes, isLoading } = useGetPostLikes(postId);

    const isLiked = likes?.some((like) => like.userId._id === userId._id);
    const ourLikeId = likes?.find(like => like.userId._id === userId._id)?._id

    const handleLike = () => {
        if (isLiked) {
            toast.promise(unlikePost({ id: postId, likeId: ourLikeId ?? '' }), {
                pending: 'Unliking post...',
                success: "Post unliked successfully",
                error: {
                    render({ data }) {

                        return (data as GenericResponse)?.message || 'Something went wrong';
                    }
                }
            });

        } else {
            toast.promise(likePost({ id: postId }), {
                pending: 'Liking post...',
                success: "Post liked successfully",
                error: {
                    render({ data }) {
                        return (data as GenericResponse)?.message || 'Something went wrong'
                    }
                }
            });
        }
    };

    return (
        <Modal show={show} dismissible={true} size="md" onClose={onClose}>
            <Modal.Header>Likes</Modal.Header>
            <Modal.Body>
                {isLoading ? (

                    <p className="text-gray-700">Loading...</p>
                ) : likes && likes?.length > 0 ? (
                    <ul className="list-disc list-inside ml-4">
                        {likes.map((like, index) => (
                            <li key={index} className="text-gray-700">
                                {like.userId.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No likes yet.</p>
                )}
            </Modal.Body>
            <Modal.Footer className='flex justify-end'>

                <Button size="sm" onClick={handleLike}>
                    {isLiked ? 'Unlike' : 'Like'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LikesModal;
