import { memo } from "react";
import PostCardBody from "./PostCardBody";
import PostCardHeader from "./PostCardHeader";
import Gallery from "./Gallery";
import React from "react";

// Define the props for the FeedPostCard component
interface FeedPostCardProps {
  post: {
    content: string;
    imageURLs: string[];
    user: {
      fname: string;
      sname: string;
      email: string;
    };
    createdAt: string;
  };
}

// Memoized FeedPostCard component to prevent unnecessary re-renders
const FeedPostCard: React.FC<FeedPostCardProps> = ({ post }) => {
  // Destructure the post object to access its properties
  const { content, imageURLs, user, createdAt } = post;

  // Function to format the createdAt timestamp (e.g., "5 minutes ago")
  const formatDate = (date: string) => {
    const timeDiff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(timeDiff / 60000); // Time difference in minutes
    if (minutes < 1) {
      return "Just now"; // For posts made in the last minute
    }
    if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* Pass formatted date to PostCardHeader */}
      <PostCardHeader user={user} createdAt={formatDate(createdAt)} />
      <PostCardBody>
        <p>{content}</p>

        {/* Render gallery if more than 1 image, otherwise just display the first image */}
        {imageURLs.length > 1 ? (
          <Gallery images={imageURLs} />
        ) : (
          imageURLs.length === 1 && (
            <img
              src={imageURLs[0]}
              alt="Post image"
              className="w-full rounded-md"
            />
          )
        )}

        {/* Like, Comment, and Share Buttons */}
        <div className="flex items-center mt-4">
          <button className="mr-4 text-blue-600">👍 Like</button>
          <button
            className="mr-4 text-gray-600"
            onClick={() => alert("Open comment section or modal")}
          >
            💬 Comment
          </button>
        </div>
      </PostCardBody>
    </div>
  );
};

export default memo(FeedPostCard);
