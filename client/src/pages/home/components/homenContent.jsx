import React from "react";
import { useSelector } from "react-redux";
import { getPostsByUserId } from "../../../store/post";
import { getLikes } from "../../../store/postLike";
import { getUsersByIds } from "../../../store/user";
import _ from "lodash";
import Post from "../../posts/components/post";
const HomeContent = ({ following }) => {
  const posts = useSelector(getPostsByUserId(following));
  const sortedPost = _.orderBy(posts, ["createdAt"], ["asc"]);
  const users = useSelector(getUsersByIds(following));
  const likes = useSelector(getLikes());
  return (
    <ul className="home__content">
      {sortedPost.map((post) => (
        <li key={post._id} className="home__item">
          <Post
            likes={likes}
            post={post}
            user={users[users.findIndex((user) => user._id === post.userId)]}
          />
        </li>
      ))}
    </ul>
  );
};

export default HomeContent;
