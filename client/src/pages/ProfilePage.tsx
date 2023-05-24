import { Button, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ChangePasswordModal from '../components/ChangePasswordModal';
import useUserService from '../hooks/useUserService';
import DefaultLayout from '../layouts/DefaultLayout';
import useAuthStore from '../store';


function ProfilePage() {
    const { email, name } = useAuthStore((state) => state.details) || {};
    const { useChangeName } = useUserService();
    const { mutateAsync } = useChangeName;

    const [isEditingName, setIsEditingName] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: name ?? '',
        }
    });

    const handleNameEdit = () => {
        setIsEditingName(true);
    };

    const handleNameSave = (data: { name: string }) => {
        if (email === undefined) return;
        toast.promise(mutateAsync({ name: data.name, email }), {
            pending: 'Saving...',
            success: "Name changed successfully",
            error: "Something went wrong",
        });
        setIsEditingName(false);
    };

    const handleNameCancel = () => {
        setIsEditingName(false);
        reset();
    };

    const handleOpenChangePasswordModal = () => {
        setShowChangePasswordModal(true);
    };

    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
        reset();
    };

    return (
        <DefaultLayout>
            <div className="px-4 pt-6 flex-1 dark:text-white">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Profile</h2>
                <p className='my-4'>Email: {email}</p>
                {isEditingName ? (
                    <form onSubmit={handleSubmit(handleNameSave)}>
                        <div className="flex items-center gap-3 dark:text-white">
                            <p className='my-4'>Name:</p>
                            <TextInput
                                {...register('name', { required: true })}
                                defaultValue={name}
                                width={'100%'}
                                sizing={'xs'}
                            />
                            <Button type="submit" size={'xs'}>Save</Button>
                            <Button onClick={handleNameCancel} size={'xs'}>Cancel</Button>
                        </div>
                        {errors.name && <p className="text-red-500">Name is required</p>}
                    </form>
                ) : (
                    <div className="flex max-w-md items-center justify-between">
                        <p className='my-4'>Name: {name}</p>
                        <Button onClick={handleNameEdit} size={'xs'}>Edit</Button>
                    </div>
                )}
                <Button onClick={handleOpenChangePasswordModal} className="mt-4" size={'xs'}>Change Password</Button>
                <ChangePasswordModal
                    show={showChangePasswordModal}
                    onClose={handleCloseChangePasswordModal}
                />
            </div>
        </DefaultLayout>
    );
}

export default ProfilePage;
