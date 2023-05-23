import type { FC, PropsWithChildren } from "react";
import MainContentFooter from "../components/MainContentFooter";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface DefaultLayoutProps {
  isFooter?: boolean;
}

const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = function ({
  children,
  isFooter = true,
}) {
  return (
    <>
      <Navbar />
      <div className="flex items-stretch flex-1 ">
        <Sidebar />
        <MainContent isFooter={isFooter}>{children}</MainContent>
      </div>
    </>
  );
};

const MainContent: FC<PropsWithChildren<DefaultLayoutProps>> = function ({
  children,
  isFooter,
}) {
  return (
    <main className="relative flex-1 flex flex-col overflow-y-auto bg-gray-50 dark:bg-gray-900 border-gray-200 border shadow-xl rounded-md">
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <MainContentFooter />
        </div>
      )}
    </main>
  );
};

export default DefaultLayout;
