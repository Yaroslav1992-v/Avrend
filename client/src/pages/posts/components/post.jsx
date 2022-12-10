import React from "react";
import { getFullName } from "../../../utils/helpers";
import PostBottom from "./postBottom";
import PostHeader from "./postHeader";
import PostContent from "./postMiddle";
const Post = ({ post, user, likes }) => {
  const { firstName, lastName } = user;
  const fullName = getFullName(firstName, lastName);
  const postLikes = likes.filter((l) => l.postId === post._id);
  return (
    <div className="post">
      <PostHeader
        link={user._id}
        img={user.picturePath}
        name={fullName ? fullName : user.accountName}
        date={post.createdAt}
      />
      <PostContent img={post.picturePath} text={post.content} />
      <PostBottom likes={postLikes} post={post} />
    </div>
  );
};

export default React.memo(Post);
