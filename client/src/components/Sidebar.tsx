import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiInbox,
  HiNewspaper,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards
} from "react-icons/hi";

export default function SidebarPart() {

  return (
    <div className="w-fit">
      <Sidebar className="border-right-1" collapase>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={HiNewspaper}
            >
              Feed
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiInbox}
            >
              Inbox
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiUser}
            >
              Users
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiShoppingBag}
            >
              Products
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
            >
              Sign In
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiTable}
            >
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
