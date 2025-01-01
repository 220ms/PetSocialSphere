import person from "../../assets/person-headshot.jpg";
import React from "react";
interface PostCardHeaderProps {
  user: {
    fname: string;
    sname: string;
  };
  createdAt: string;
}
const PostCardHeader: React.FC<PostCardHeaderProps> = ({ user, createdAt }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={person}
        alt="lady head shot"
        className="rounded-full w-10 h-10 object-cover"
      />
      <div className="flex flex-col">
        <p>{`${user.fname} ${user.sname}`}</p>
        <p>{createdAt}</p>
      </div>
    </div>
  );
};
export default PostCardHeader;
