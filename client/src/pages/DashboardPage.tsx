import { Spinner } from "flowbite-react";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import usePostService from "../hooks/usePostService";
import DefaultLayout from "../layouts/DefaultLayout";

function HomePage() {
  const { useGetPosts } = usePostService();
  const { data: posts, isLoading } = useGetPosts;
  return (
    <DefaultLayout>
      <div className="px-4 pt-6 flex-1 overflow-y-auto max-h-full">
        <AddPost />
        {
          isLoading ? (
            <div className="flex justify-center items-center m-10">
              <Spinner />
            </div>
          ) : (
            <div>
              {posts?.map((post) => (
                <Post key={post._id} content={post.content} userId={post.userId} _id={post._id} createdAt={post.createdAt} updatedAt={post.updatedAt} />
              ))}
            </div>
          )
        }
      </div>
    </DefaultLayout>
  );
}

export default HomePage;
