import FeedPostCard from "../components/Post/FeedPostCard";
import Header from "../components/Header";

const Feed = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-4 p-4 bg-gray-200"> Left Column</div>
        <div className="col-span-4  bg-gray-200 p-4">
          <FeedPostCard />
        </div>
        <div className="col-span-4 bg-gray-200 p-4">Right Column</div>
      </div>
    </>
  );
};
export default Feed;
