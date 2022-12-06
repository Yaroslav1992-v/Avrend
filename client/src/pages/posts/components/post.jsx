import React from "react";
import { getFullName } from "../../../utils/helpers";
import PostBottom from "./postBottom";
import PostHeader from "./postHeader";
import PostContent from "./postMiddle";
const Post = ({ post, user }) => {
  const { firstName, lastName } = user;
  const fullName = getFullName(firstName, lastName);
  return (
    <div className="post">
      <PostHeader
        link={user._id}
        img={user.picturePath}
        name={fullName ? fullName : user.accountName}
        date={post.createdAt}
      />
      <PostContent img={post.picturePath} text={post.content} />
      <PostBottom postId={post._id} />
    </div>
  );
};

export default Post;
