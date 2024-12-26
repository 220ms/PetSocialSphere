import { memo } from "react";
import PostCardBody from "./PostCardBody";
import PostCardHeader from "./PostCardHeader";
import Gallery from "./Gallery";
import React from "react";

// Define the props for the FeedPostCard component
interface FeedPostCardProps {
  text: string[];
  images: string[];
}

// Memoized FeedPostCard component to prevent unnecessary re-renders
const FeedPostCard: React.FC<FeedPostCardProps> = ({ text, images }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <PostCardHeader />
      <PostCardBody>
        {text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {/* Render gallery if more than 1 image, otherwise just display the first image */}
        {images.length > 1 ? (
          <Gallery images={images} />
        ) : (
          images.length === 1 && (
            <img
              src={images[0]}
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
