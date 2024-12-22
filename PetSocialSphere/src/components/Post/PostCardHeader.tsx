import person from "../../assets/person-headshot.jpg";
const PostCardHeader = () => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={person}
        alt="lady head shot"
        className="rounded-full w-10 h-10 object-cover"
      />
      <div className="flex flex-col">
        <p>Matthew Hicks</p>
        <p>17h.</p>
      </div>
    </div>
  );
};
export default PostCardHeader;
