import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { Comment as C } from '../api/models/Comment';
import useAuthStore from '../store';

interface CommentProps extends C {
    onEdit: (editedComment: string) => void;
    onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({ userId, content, onEdit, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(content);
    const ourUserId = useAuthStore((state) => state.details?._id);

    const isOurComment = userId._id === ourUserId;

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onEdit(editedComment);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditedComment(content);
        setEditing(false);
    };

    return (
        <div className="comment bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <span className="comment-username text-xs font-bold">{userId.name}</span>
                {isOurComment && <div className="comment-actions flex">
                    {editing ? (
                        <>
                            <Button
                                onClick={handleSave}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer mr-2"
                                size={'xs'}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={handleCancel}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                size={'xs'}
                                color={'light'}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <HiPencil
                                onClick={handleEdit}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            />
                            <HiTrash
                                onClick={onDelete}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
                            />
                        </>
                    )}
                </div>}
            </div>
            <div className="comment-body max-h-20 overflow-auto">
                {editing ? (
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                ) : (
                    content
                )}
            </div>
        </div>
    );
};

export default Comment;
