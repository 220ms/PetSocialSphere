import walkingDog from "../assets/walking-dog.png";
import dogOnBeach from "../assets/dog-on-beach.png";
import sunsetDogWalk from "../assets/sunset-dog-walk.png";
import dogInForest from "../assets/dogInForest.png";
import dogPark from "../assets/pets-in-park.png";
import FeedPostCard from "../components/Post/FeedPostCard";
import Header from "../components/Header";

// Define the type for the post data
interface Post {
  text: string[];
  images: string[];
}

const posts: Post[] = [
  {
    text: [
      "Nothing beats the joy of seeing your dog run freely at the park. That pure excitement in their eyes just makes everything better!",
      "Do you have a favorite place to take your dog for walks?",
    ],
    images: [dogPark], // Single image, no gallery
  },
  {
    text: [
      "Early morning walks are my favorite. The air is crisp, and the world feels peaceful.",
      "It's the perfect start to the day, especially when you have your furry friend by your side.",
    ],
    images: [walkingDog, sunsetDogWalk], // Gallery of images
  },
  {
    text: [
      "Dogs are more than pets; they are family. I couldn't imagine my life without their companionship.",
      "It's amazing how they always know how to make you smile, no matter the mood.",
    ],
    images: [], // No images
  },
  {
    text: [
      "There’s nothing quite like a walk on the beach, with the wind in your hair and your dog running ahead on the sand.",
      "Do you take your dog to the beach? Share your best beach adventure stories!",
    ],
    images: [dogOnBeach], // Single image, no gallery
  },
  {
    text: [
      "Took my dog on a hike through the forest today. The trails were beautiful, and he loved every moment of it!",
      "Nature and a dog make the best combo for a perfect day out.",
    ],
    images: [dogInForest], // Single image, no gallery
  },
  {
    text: [
      "Is there a better way to end the day than watching the sunset with your furry friend? 🐾🌅",
      "I swear, dogs can sense when you're in need of a good break and always know how to relax with you.",
    ],
    images: [sunsetDogWalk], // Single image, no gallery
  },
  {
    text: [
      "The bond between a dog and its owner is truly special. I’m so grateful for the unconditional love they give.",
      "Every day with them feels like a blessing.",
    ],
    images: [walkingDog, dogInForest], // Gallery of images
  },
];

const Feed = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-4 p-4 bg-gray-200">Left Column</div>
        <div className="col-span-4 bg-gray-200 p-4 flex flex-col gap-4">
          {posts.map((post, index) => (
            <FeedPostCard key={index} text={post.text} images={post.images} />
          ))}
        </div>
        <div className="col-span-4 bg-gray-200 p-4">Right Column</div>
      </div>
    </>
  );
};

export default Feed;
