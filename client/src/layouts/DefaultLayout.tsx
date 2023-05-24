import type { FC, PropsWithChildren } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



const DefaultLayout: FC<PropsWithChildren> = function ({
  children,
}) {
  return (
    <>
      <Navbar />
      <div className="flex items-stretch overflow-hidden max-h-full flex-1 pt-1">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </>
  );
};

const MainContent: FC<PropsWithChildren> = function ({
  children,
}) {
  return (
    <main className="relative flex-1 flex flex-col overflow-hidden max-h-full bg-gray-50 dark:bg-gray-900 dark:border-black border-gray-200 border shadow-xl rounded-md">
      {children}
    </main>
  );
};

export default DefaultLayout;
