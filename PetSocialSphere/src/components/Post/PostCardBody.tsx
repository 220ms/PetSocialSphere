import React from "react";
const PostCardBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="mt-4 flex flex-col gap-2">{children}</div>;
};
export default PostCardBody;
