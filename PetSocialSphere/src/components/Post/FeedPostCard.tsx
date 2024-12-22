import { useState, memo } from "react";
import PostCardBody from "./PostCardBody";
import PostCardHeader from "./PostCardHeader";
import walkingDog from "../../assets/walking dog.png";
import dogOnBeach from "../../assets/dog-on-beach.png";
import sunsetDogWalk from "../../assets/sunset-dog-walk.png";
import dogInForest from "../../assets/dogInForest.png";
import Gallery from "./Gallery";

// Memoized MasonryGallery component to prevent unnecessary re-renders
const images = [walkingDog, sunsetDogWalk, dogOnBeach, dogInForest];
const FeedPostCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <PostCardHeader />
      <PostCardBody>
        <p>
          There’s nothing quite like starting the day with fresh air, wagging
          tails, and endless curiosity. Every sniff is an adventure, every step
          a reminder to enjoy the little things.
        </p>
        <p>Who else loves these moments with their furry friend? 🐕❤️</p>

        <Gallery images={images} />

        {/* Like, Comment, and Share Buttons */}
        <div className="flex items-center mt-4">
          {/* Like Button */}
          <button className="mr-4 text-blue-600">👍 Like</button>

          {/* Comment Button */}
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

export default FeedPostCard;
