import { Sidebar } from "flowbite-react";
import {
  HiInbox,
  HiNewspaper,
  HiUser
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthService from "../hooks/useAuthService";

export default function SidebarPart() {
  const { useLogout } = useAuthService()
  const { mutateAsync } = useLogout

  const handleLogout = async () => {
    toast.promise(mutateAsync(), {
      pending: 'Logging out...',
      success: 'Logged out successfully',
      error: 'Something went wrong'
    })
  }


  return (
    <div className="w-fit">
      <Sidebar className="border-right-1">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={NavLink}
              to="/"
              icon={HiNewspaper}
            >
              Feed
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              to="/profile"
              icon={HiUser}
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              as='button'
              onClick={handleLogout}
              icon={HiInbox}
            >
              Logout
            </Sidebar.Item>

          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
