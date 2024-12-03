import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { baseURL } from "../../constant/url.js";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType }) => {
  // Determine the correct endpoint based on feedType
  const getPostEndPoint = () => {
    switch (feedType) {
      case "forYou":
        return `${baseURL}/api/posts/all`;
      case "following":
        return `${baseURL}/api/posts/following`;
      default:
        return `${baseURL}/api/posts/all`;
    }
  };

  const POST_ENDPOINT = getPostEndPoint();

  // Fetch posts using react-query
  const { data: posts, isLoading, isError, error ,refetch , isRefetching } = useQuery({
    queryKey: ['posts'], // Include feedType to invalidate cache when switching
    queryFn: async () => {
      const res = await fetch(POST_ENDPOINT, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch posts');
      }

      const data= await res.json(); // Return the JSON data directly
      return data.post;
    },
    retry: false, // Disable retry if you prefer not to retry on failure
  });
  if(feedType == "following")
  console.log("Posts follow:", posts);

  useEffect(() => {
	refetch();
  },[feedType,refetch])


  return (
    <>
      {(isRefetching||isLoading) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {!isLoading && isError && (
        <p className="text-center text-red-500 my-4">
          {error.message || 'Something went wrong. Please try again later.'}
        </p>
      )}

      {!isLoading && !isError && posts && posts.length === 0 && (
        <div className="text-center my-4 ">No posts in this tab. Switch 👻</div>
      )}

      {!isLoading && !isError &&  posts.length > 0 && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
          
        </div>
      )}
    </>
  );
};

export default Posts;
