import FeedPostCard from "../components/Post/FeedPostCard";
import Header from "../components/Header";
import React from "react";
import CreatePostForm from "../components/Post/CreatePostForm";
import { useQuery } from "@tanstack/react-query"; // Import useQuery from TanStack Query

// Define the type for the post data
interface Post {
  content: string;
  imageURLs: string[];
  user: {
    fname: string;
    sname: string;
    email: string;
  };
  createdAt: string;
}

const Feed = () => {
  // Use TanStack Query's useQuery directly inside the Feed component
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"], // Unique key for the query
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/v1/posts");
      if (!response.ok) {
        throw new Error("Error fetching posts");
      }
      return response.json();
    },
    staleTime: 60000, // Cache the data for 1 minute
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    ); // Error state
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 p-4 bg-gray-200">Left Column</div>

        <div className="col-span-4 bg-gray-200 p-4 flex flex-col gap-4">
          {/* Display loading skeleton or spinner if posts are loading */}
          {isLoading ? (
            <div>Loading posts...</div> // Replace with a spinner or skeleton if preferred
          ) : (
            // Render Feed Posts once they are loaded
            posts?.map((post, index) => (
              <FeedPostCard key={index} post={post} />
            ))
          )}
        </div>

        <div className="col-span-4 bg-gray-200 p-4">
          <CreatePostForm />
        </div>
      </div>
    </>
  );
};

export default Feed;
