import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import { getPostsById } from "../../store/post";
import { findUserById } from "../../store/user";
import PostList from "./components/postLists";
const Posts = () => {
  const { userId } = useParams();
  const posts = useSelector(getPostsById(userId));
  const user = useSelector(findUserById(userId));
  return (
    <section className="posts">
      <div className="container">
        <div className="posts__container">
          <NavBar check={true} title="Publications" children={<GoBack />} />
          <PostList posts={posts} user={user} />
        </div>
      </div>
    </section>
  );
};

export default Posts;
