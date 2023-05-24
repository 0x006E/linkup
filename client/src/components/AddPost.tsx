import { Button, Card, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { GenericResponse } from '../api/services/AuthService';
import usePostService from '../hooks/usePostService';


function AddPost() {
    const [content, setContent] = useState('');
    const { useAddPost } = usePostService();

    const { isLoading, mutateAsync } = useAddPost;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (content.trim() !== '') {
            toast.promise(mutateAsync({ content }), {
                pending: 'Adding post...',
                success: "Post added successfully",
                error: {
                    render({ data }) {
                        return (data as GenericResponse)?.message || 'Something went wrong';
                    }
                }
            });
            setContent('');
        }
    };

    return (
        <Card className="max-w-lg mx-auto">
            <div>
                <h5 className="text-md text-gray-600 font-italic tracking-tight dark:text-white mb-2">
                    Create a post
                </h5>
                <form onSubmit={handleSubmit}>
                    <Textarea
                        placeholder="Enter post content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button disabled={isLoading} type="submit" className='ml-auto mt-4' size={'xs'}>
                        Add
                    </Button>
                </form>
            </div>
        </Card>
    );
}

export default AddPost;
