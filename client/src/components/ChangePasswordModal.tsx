import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUserService from "../hooks/useUserService";

interface ChangePasswordModalProps {
    show: boolean;
    onClose: () => void;
}

function ChangePasswordModal(props: ChangePasswordModalProps) {
    const { show, onClose } = props;
    const { useChangePassword } = useUserService();
    const { mutateAsync } = useChangePassword;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        }
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleChangePassword = (data: { currentPassword: string, newPassword: string }) => {
        toast.promise(mutateAsync(data), {
            pending: 'Changing password...',
            success: "Password changed successfully",
            error: "Something went wrong",
        });
    };

    return (
        <Modal show={show} onClose={handleClose} size={'md'}>
            <Modal.Header>Change Password</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(handleChangePassword)} className="flex flex-col gap-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <TextInput
                        type="password"
                        placeholder="Current Password"
                        {...register('currentPassword', { required: true, minLength: 8 })}
                    />
                    {errors.currentPassword && (
                        <p className="text-red-500">{errors.currentPassword?.message}</p>
                    )}
                    <Label htmlFor="newPassword">New password</Label>
                    <TextInput
                        type="password"
                        placeholder="New Password"
                        {...register('newPassword', { required: true, minLength: 8 })}
                    />
                    {errors.newPassword && (
                        <p className="text-red-500">{errors.newPassword?.message}</p>
                    )}
                    <Button type="submit" className="mt-4">Save</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ChangePasswordModal