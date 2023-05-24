import { Button, Modal, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GenericResponse } from '../api/services/AuthService'
import usePostService from '../hooks/usePostService'
import Comment from './Comment'

export interface CommentModalProps {
    show: boolean,
    onClose: () => void,
    postId: string,
}

function CommentModal(props: CommentModalProps) {
    const { show, onClose, postId } = props
    const { useGetPostComments, useDeletePostComment, useAddPostComment, useUpdatePostComment } = usePostService()
    const { mutateAsync: deleteComment } = useDeletePostComment
    const { mutateAsync: updateComment } = useUpdatePostComment
    const { isLoading: isCommentLoading, mutateAsync: addComment } = useAddPostComment

    const { formState: { errors }, reset, register, handleSubmit } = useForm({
        defaultValues: {
            content: '',
        }
    })

    const { data: comments, isLoading } = useGetPostComments(postId)

    const handleEditComment = ({ id, content }: { id: string, content: string }) => {
        toast.promise(updateComment({ id: postId, commentId: id, content }), {
            pending: 'Updating comment...',
            success: "Comment updated successfully",
            error: {
                render({ data }) {
                    return (data as GenericResponse)?.message || 'Something went wrong';
                }
            }
        });
    }

    const handleDeleteComment = ({ id }: { id: string }) => {
        toast.promise(deleteComment({ id: postId, commentId: id }), {
            pending: 'Deleting comment...',
            success: "Comment deleted successfully",
            error: {
                render({ data }) {
                    return (data as GenericResponse)?.message || 'Something went wrong';
                }
            }
        });
    }

    const handleAddComment = (data: { content: string }) => {
        toast.promise(addComment({ id: postId, content: data.content }), {
            pending: 'Adding comment...',
            success: "Comment added successfully",
            error: {
                render({ data }) {
                    return (data as GenericResponse)?.message || 'Something went wrong';
                }
            }
        });
    }

    useEffect(() => {
        reset();
    }, [show]);



    return (
        <Modal
            show={show}
            dismissible={true}
            size="md"
            onClose={onClose}
        >
            <Modal.Header>
                Comments
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <p className="text-gray-700">Loading...</p>

                ) : comments && comments?.length > 0 ? (
                    comments?.map((comment) => (
                        <Comment
                            key={comment._id}
                            {...comment}
                            onEdit={(editedComment) => handleEditComment({ id: comment._id, content: editedComment })}
                            onDelete={() => handleDeleteComment({ id: comment._id })}
                        />
                    ))
                ) : (
                    <p className="text-gray-700">No comments yet.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <form onSubmit={handleSubmit(handleAddComment)} className="flex w-full gap-2">
                    <TextInput className='w-full text-sm' disabled={isCommentLoading} {...register('content', { required: true })} color={errors.content?.message ? 'failure' : 'gray'} />
                    <Button
                        size="sm"
                        type="submit"
                    >
                        Comment
                    </Button>
                </form>
            </Modal.Footer>
        </Modal>
    )
}

export default CommentModal